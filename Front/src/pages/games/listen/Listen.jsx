import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import { API_URL } from '../../../API';

// lista de oraciones.
const sentences = [
	{
		display: 'The committee needs to ____ the new proposal before approval.',
		speak: 'The committee needs to evaluate the new proposal before approval.',
		answer: 'evaluate',
	},
	{
		display: 'Climate change has ____ effects on global ecosystems.',
		speak: 'Climate change has profound effects on global ecosystems.',
		answer: 'profound',
	},
	{
		display: "The study's findings ____ the initial hypothesis.",
		speak: "The study's findings contradict the initial hypothesis.",
		answer: 'contradict',
	},
	{
		display: 'It is ____ that all students attend the mandatory orientation.',
		speak: 'It is imperative that all students attend the mandatory orientation.',
		answer: 'imperative',
	},
	{
		display: 'The author uses vivid imagery to ____ his main points.',
		speak: 'The author uses vivid imagery to illustrate his main points.',
		answer: 'illustrate',
	},
	{
		display: 'Technological ____ have transformed the way we communicate.',
		speak: 'Technological innovations have transformed the way we communicate.',
		answer: 'innovations',
	},
	{
		display: 'The professor provided a ____ explanation of the complex theory.',
		speak: 'The professor provided a comprehensive explanation of the complex theory.',
		answer: 'comprehensive',
	},
	{
		display: 'A key ____ of the research is to identify potential solutions.',
		speak: 'A key objective of the research is to identify potential solutions.',
		answer: 'objective',
	},
	{
		display: 'The government plans to ____ new policies to reduce pollution.',
		speak: 'The government plans to implement new policies to reduce pollution.',
		answer: 'implement',
	},
	{
		display: 'Despite the challenges, they managed to achieve their ____.',
		speak: 'Despite the challenges, they managed to achieve their goals.',
		answer: 'goals',
	},
	{
		display: 'The evidence presented was not ____ to support the claim.',
		speak: 'The evidence presented was not sufficient to support the claim.',
		answer: 'sufficient',
	},
	{
		display: 'Further research is required to ____ these results.',
		speak: 'Further research is required to validate these results.',
		answer: 'validate',
	},
	{
		display: 'The transition to renewable energy is ____.',
		speak: 'The transition to renewable energy is inevitable.',
		answer: 'inevitable',
	},
];

const TOTAL_QUESTIONS = 5;
const POINTS_PER_QUESTION = 100 / TOTAL_QUESTIONS; // Cada pregunta vale 20 puntos

// Función para barajar un arreglo y tomar los primeros N elementos.
const shuffleAndPick = (arr, num) => {
	return [...arr].sort(() => 0.5 - Math.random()).slice(0, num);
};

// Componente para la pantalla de juego
const GameScreen = ({ onGameOver }) => {
	const [gameSentences, setGameSentences] = useState([]);
	const [currentSentence, setCurrentSentence] = useState({
		display: '',
		speak: '',
		answer: '',
	});
	const [userInput, setUserInput] = useState('');
	const [statusMessage, setStatusMessage] = useState('Type the missing word!');
	const [score, setScore] = useState(0);
	const [questionsAsked, setQuestionsAsked] = useState(0);
	const [isRoundComplete, setIsRoundComplete] = useState(false);
	//Estado para guardar los resultados de cada ronda.
	const [results, setResults] = useState([]);

	useEffect(() => {
		setGameSentences(shuffleAndPick(sentences, TOTAL_QUESTIONS));
	}, []);

	useEffect(() => {
		if (gameSentences.length > 0 && questionsAsked < gameSentences.length) {
			setCurrentSentence(gameSentences[questionsAsked]);
			setStatusMessage('Type the missing word!');
			setUserInput('');
			setIsRoundComplete(false);
		}
	}, [questionsAsked, gameSentences]);

	const handleListenClick = () => {
		if (!currentSentence.speak) return;
		const utterance = new SpeechSynthesisUtterance(currentSentence.speak);
		utterance.lang = 'en-US';
		window.speechSynthesis.speak(utterance);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!userInput.trim() || isRoundComplete) return;

		const isCorrect =
			userInput.trim().toLowerCase() === currentSentence.answer.toLowerCase();

		// Guardar el resultado de la ronda
		setResults((prev) => [
			...prev,
			{
				question: currentSentence.display,
				userAnswer: userInput.trim(),
				correctAnswer: currentSentence.answer,
				isCorrect: isCorrect,
			},
		]);

		if (isCorrect) {
			// Se suman los puntos por pregunta
			setScore((prev) => prev + POINTS_PER_QUESTION);
			setStatusMessage('<p class="text-2xl font-bold text-green-500">✅ Correct!</p>');
		} else {
			setStatusMessage(`
                <p class="text-red-500">Not quite!</p>
                <p class="text-gray-700">The correct answer was: <strong class="font-bold text-blue-600">${currentSentence.answer}</strong></p>
            `);
		}
		setIsRoundComplete(true);
	};

	const handleNextClick = () => {
		// Pasa los resultados al terminar.
		if (questionsAsked + 1 >= TOTAL_QUESTIONS) {
			onGameOver(results);
		} else {
			setQuestionsAsked((prev) => prev + 1);
		}
	};

	return (
		<div className='w-full max-w-2xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center'>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-xl sm:text-2xl font-bold text-blue-600'>Fill in the Blank</h1>
				<div className='text-xl font-bold text-gray-700'>Score: {score}</div>
			</div>
			<p className='text-gray-600 mb-8'>
				Round {questionsAsked + 1} of {TOTAL_QUESTIONS}
			</p>
			<div className='mb-8 flex flex-col items-center'>
				<p className='text-2xl sm:text-3xl text-gray-800 mb-4 bg-gray-100 p-4 rounded-lg'>
					{currentSentence.display}
				</p>
				<button
					onClick={handleListenClick}
					className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full text-lg shadow-lg'
				>
					<span className='mr-2'>🔊</span> Listen
				</button>
			</div>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'
			>
				<input
					type='text'
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					disabled={isRoundComplete}
					className='flex-grow p-4 border-2 border-gray-300 rounded-lg text-xl text-center shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200'
					placeholder='Missing word...'
				/>
				<button
					type='submit'
					disabled={isRoundComplete || !userInput.trim()}
					className='bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-md disabled:bg-green-300 disabled:cursor-not-allowed'
				>
					Submit
				</button>
			</form>
			<div className='h-16 flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100'>
				<div dangerouslySetInnerHTML={{ __html: statusMessage }} />
			</div>
			{isRoundComplete && (
				<button
					onClick={handleNextClick}
					className='mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg'
				>
					Next ➔
				</button>
			)}
		</div>
	);
};

// Componente de la pantalla de fin de juego con el nuevo diseño y paleta de colores.
const GameOverScreen = ({ results, onPlayAgain }) => {
	const correctAnswers = results.filter((r) => r.isCorrect);
	const incorrectAnswers = results.filter((r) => !r.isCorrect);
	const accuracy = results.length > 0 ? Math.round((correctAnswers.length / results.length) * 100) : 0;

	const finalScore = correctAnswers.length * POINTS_PER_QUESTION;

	const getPerformanceLevel = (score) => {
		if (score >= 90) return { level: "Excellent", color: "text-green-600", bg: "bg-green-100" };
		if (score >= 75) return { level: "Good", color: "text-blue-600", bg: "bg-blue-100" };
		if (score >= 60) return { level: "Fair", color: "text-yellow-600", bg: "bg-yellow-100" };
		return { level: "Needs Practice", color: "text-gray-600", bg: "bg-gray-100" };
	};

	const performance = getPerformanceLevel(finalScore);

	const renderQuestion = (question, answer) => {
		const parts = question.split('____');
		return (
			<p className='font-semibold text-gray-900 mb-1'>
				{parts[0]}
				<strong className='font-bold text-blue-600'>{answer}</strong>
				{parts[1]}
			</p>
		);
	};

	return (
		<div className='w-full max-w-4xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-4 sm:p-8 md:p-12 text-left'>
			<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center'>
				Challenge Complete!
			</h1>

			{/* Resumen de puntaje principal */}
			<div className='text-center mb-8'>
				{/* Etiqueta para el puntaje */}
				<div className='text-lg font-medium text-gray-600 mb-1'>Score</div>

				{/* Resultado del puntaje */}
				<div className='text-4xl sm:text-5xl font-bold text-blue-600 mb-2'>{finalScore}</div>

				{/* Nivel de rendimiento */}
				<div className={`inline-block px-4 py-2 rounded-full font-semibold ${performance.bg} ${performance.color}`}>
					{performance.level}
				</div>
			</div>

			{/* Estadísticas detalladas */}
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
				<div className='bg-gray-50 p-4 rounded-lg text-center'>
					<div className='text-2xl font-bold text-gray-800'>{correctAnswers.length}/{results.length}</div>
					<div className='text-sm text-gray-600'>Correct Answers</div>
				</div>
				<div className='bg-gray-50 p-4 rounded-lg text-center'>
					<div className='text-2xl font-bold text-gray-800'>{accuracy}%</div>
					<div className='text-sm text-gray-600'>Accuracy Rate</div>
				</div>
				<div className='bg-gray-50 p-4 rounded-lg text-center'>
					<div className='text-2xl font-bold text-gray-800'>{results.length}</div>
					<div className='text-sm text-gray-600'>Total Questions</div>
				</div>
			</div>

			<p className='text-gray-600 text-center mb-8 sm:mb-10'>
				Let's review your listening comprehension performance. Use this feedback to improve your auditory skills.
			</p>

			<div className='space-y-8'>
				{/* Sección de respuestas correctas */}
				{correctAnswers.length > 0 && (
					<section>
						<h2 className='text-xl sm:text-2xl font-bold text-green-700 mb-4 flex items-center'>
							<span className='bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg'>✓</span>
							Correct Answers ({correctAnswers.length})
						</h2>
						<div className='space-y-3'>
							{correctAnswers.map((r, i) => (
								<div key={i} className='p-4 bg-green-50 border border-green-200 rounded-lg'>
									<div className='flex items-start gap-3'>
										<div className='flex-shrink-0 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm'>
											{results.indexOf(r) + 1}
										</div>
										<div>
											{renderQuestion(r.question, r.correctAnswer)}
											<p className='text-sm text-gray-600'>
												Your answer: <span className='font-medium text-green-700'>{r.userAnswer}</span>
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{/* Sección de respuestas incorrectas */}
				{incorrectAnswers.length > 0 && (
					<section>
						<h2 className='text-xl sm:text-2xl font-bold text-blue-700 mb-4 flex items-center'>
							<span className='bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg'>✗</span>
							Areas for Improvement ({incorrectAnswers.length})
						</h2>
						<div className='space-y-3'>
							{incorrectAnswers.map((r, i) => (
								<div key={i} className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
									<div className='flex items-start gap-3'>
										<div className='flex-shrink-0 bg-gray-500 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm'>
											{results.indexOf(r) + 1}
										</div>
										<div>
											{renderQuestion(r.question, r.correctAnswer)}
											<p className='text-sm text-gray-600 mb-2'>
												Correct answer: <span className='font-medium text-blue-700'>{r.correctAnswer}</span>
											</p>
											<p className='text-sm text-gray-600 mb-2'>
												Your answer: <span className='font-medium text-blue-700'>{r.userAnswer}</span>
											</p>
											<p className='text-xs text-blue-700 bg-blue-50 p-2 rounded border-l-2 border-blue-300'>
												💡 Tip: Listen carefully to the pronunciation and context. Try to understand the meaning of the sentence to identify the missing word.
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				)}
			</div>

			{/* Mensaje motivacional basado en el rendimiento */}
			<div className={`mt-8 p-4 rounded-lg ${performance.bg} border border-opacity-30`}>
				<div className={`text-center ${performance.color} font-semibold`}>
					{finalScore >= 90 && "🎉 Outstanding! Your listening skills are excellent. Keep up the great work!"}
					{finalScore >= 75 && finalScore < 90 && "👏 Good job! You're showing strong listening comprehension. A little more practice and you'll be perfect!"}
					{finalScore >= 60 && finalScore < 75 && "💪 You're making progress! Focus on listening carefully to pronunciation and context clues to improve your results."}
					{finalScore < 60 && "🎯 Keep practicing! Listening skills take time to develop. Review the feedback and try again."}
				</div>
			</div>

			<div className='mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center'>
				<button
					onClick={onPlayAgain}
					className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg text-lg cursor-pointer'
				>
					Play Again
				</button>
				<Link
					to='/games'
					className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg text-center cursor-pointer'
				>
					Browse Other Games
				</Link>
			</div>
		</div>
	);
};

// Componente principal 'Listen' que gestiona el estado del juego
export const Listen = () => {
	// El estado del juego ahora comienza en 'playing'
	const [gameState, setGameState] = useState('playing');
	const [gameResults, setGameResults] = useState([]);
	const [isSupported, setIsSupported] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		if (!('speechSynthesis' in window)) {
			setIsSupported(false);
		}
	}, []);

	const handleGameOver = async (results) => {
		const score = results.filter((r) => r.isCorrect).length * 20;
		if (user && user.id) {
			await fetch(`${API_URL}/user/game-history`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: user.id,
					game: 'Listening Challenge',
					score: score,
				}),
			});
		}
		setGameResults(results);
		setGameState('over');
	};

	const handlePlayAgain = () => {
		// Al jugar de nuevo, reiniciamos el estado a 'playing'
		setGameResults([]);
		setGameState('playing');
	};

	if (!isSupported) {
		return <p>Sorry, your browser does not support Speech Synthesis.</p>;
	}

	const renderGameState = () => {
		switch (gameState) {
			case 'playing':
				return <GameScreen onGameOver={handleGameOver} />;
			case 'over':
				return <GameOverScreen results={gameResults} onPlayAgain={handlePlayAgain} />;
			default:
				return <GameScreen onGameOver={handleGameOver} />;
		}
	};

	return (
		<div className='w-full flex-grow flex items-center justify-center p-4'>
			{renderGameState()}
		</div>
	);
};

export default Listen;
