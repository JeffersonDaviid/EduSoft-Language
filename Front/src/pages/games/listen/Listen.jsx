import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import { API_URL } from '../../../API';
import { HeaderGame } from '../../../components/HeaderGame';

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
		<div className='max-w-2xl mx-auto p-4 sm:p-6 space-y-6 select-none'>
			<HeaderGame
				typeGame='Listen'
				title='Listening Challenge'
				currentStep={questionsAsked + 1}
				totalSteps={TOTAL_QUESTIONS}
				score={score}
			/>

			<div className='my-8 flex flex-col items-center'>
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

	const finalScore = correctAnswers.length * POINTS_PER_QUESTION;

	const renderQuestion = (question, answer) => {
		const parts = question.split('____');
		return (
			<p className='font-semibold text-black'>
				{parts[0]}
				<strong className='font-bold'>{answer}</strong>
				{parts[1]}
			</p>
		);
	};

	return (
		<div className='w-full max-w-4xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-8 sm:p-12 text-left'>
			<h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-2 text-center'>
				Review Your Performance
			</h1>
			<p className='text-gray-600 text-center mb-2'>
				Your final score is: <strong className='text-blue-600'>{finalScore}</strong>
			</p>
			<p className='text-gray-600 text-center mb-10'>
				Let's take a look at how you did. This review will help you understand where you
				excelled and where you might need a bit more practice.
			</p>

			<div className='space-y-8'>
				{correctAnswers.length > 0 && (
					<div>
						<h2 className='text-2xl font-bold text-gray-800 mb-4'>Correct Answers</h2>
						<div className='space-y-4'>
							{correctAnswers.map((result, index) => (
								<div
									key={index}
									className='bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-start gap-4'
								>
									<div className='flex-shrink-0 bg-gray-200 text-green-600 rounded-full h-8 w-8 flex items-center justify-center font-bold'>
										✓
									</div>
									<div>
										{renderQuestion(result.question, result.correctAnswer)}
										<p className='text-sm text-[#57788F]'>
											Your Answer:{' '}
											<span className='font-medium'>{result.userAnswer}</span>
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{incorrectAnswers.length > 0 && (
					<div>
						<h2 className='text-2xl font-bold text-gray-800 mb-4'>Incorrect Answers</h2>
						<div className='space-y-4'>
							{incorrectAnswers.map((result, index) => (
								<div
									key={index}
									className='bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-start gap-4'
								>
									<div className='flex-shrink-0 bg-gray-200 text-red-600 rounded-full h-8 w-8 flex items-center justify-center font-bold'>
										✗
									</div>
									<div>
										{renderQuestion(result.question, result.correctAnswer)}
										<p className='text-sm text-[#57788F]'>
											Correct Answer:{' '}
											<span className='font-medium'>{result.correctAnswer}</span>
										</p>
										<p className='text-sm text-[#57788F]'>
											Your Answer:{' '}
											<span className='font-medium'>{result.userAnswer}</span>
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<div className='mt-12 flex flex-col sm:flex-row gap-4 justify-center'>
				<button
					onClick={onPlayAgain}
					className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg text-lg'
				>
					Play Again
				</button>
				<Link
					to='/games'
					className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg text-center'
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
