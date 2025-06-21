import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import { API_URL } from '../../../API';

// Lista de palabras y definiciones para el juego de vocabulario.
const vocabularyWords = [
    {
        definition:
            'A set of rules a computer follows to solve problems or make calculations.',
        answer: 'algorithm', // Technology buzzwords
    },
    {
        definition:
            'A formal word used to add another piece of information to an idea you are developing.',
        answer: 'furthermore', // Expressions for connecting ideas formally
    },
    {
        definition:
            'A digital audio file, like a radio show, that you can download and listen to whenever you want.',
        answer: 'podcast', // Words for forms of communication
    },
    {
        definition:
            'Describes a person who is good at finding clever ways to overcome difficulties.',
        answer: 'resourceful', // Qualities of creative people
    },
    {
        definition:
            'A verb that means to confront or start dealing with a difficult issue.',
        answer: 'tackle', // Collocations for problem solving
    },
    {
        definition:
            'Using a network of remote servers hosted on the Internet to store, manage, and process data, rather than a local server or a personal computer.',
        answer: 'cloud computing', // Technology buzzwords
    },
    {
        definition:
            'A formal word that means "as a result" or "therefore".',
        answer: 'consequently', // Expressions for connecting ideas formally
    },
    {
        definition:
            'Describes a person or a new idea that introduces new methods and is original.',
        answer: 'innovative', // Qualities of creative people
    },
    {
        definition: 'To put a decision, plan, or agreement into effect.',
        answer: 'implement', // Collocations for problem solving
    },
    {
        definition:
            'A brief written message, typically used in a business or professional setting.',
        answer: 'memo', // Words for forms of communication
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
	const [gameWords, setGameWords] = useState([]);
	const [currentWord, setCurrentWord] = useState({ definition: '', answer: '' });
	const [userInput, setUserInput] = useState('');
	const [statusMessage, setStatusMessage] = useState('Type the correct word!');
	const [score, setScore] = useState(0);
	const [questionsAsked, setQuestionsAsked] = useState(0);
	const [isRoundComplete, setIsRoundComplete] = useState(false);
	const [results, setResults] = useState([]);

	useEffect(() => {
		setGameWords(shuffleAndPick(vocabularyWords, TOTAL_QUESTIONS));
	}, []);

	useEffect(() => {
		if (gameWords.length > 0 && questionsAsked < gameWords.length) {
			setCurrentWord(gameWords[questionsAsked]);
			setStatusMessage('Type the correct word!');
			setUserInput('');
			setIsRoundComplete(false);
		}
	}, [questionsAsked, gameWords]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!userInput.trim() || isRoundComplete) return;

		const isCorrect = userInput.trim().toLowerCase() === currentWord.answer.toLowerCase();

		setResults((prev) => [
			...prev,
			{
				question: currentWord.definition,
				userAnswer: userInput.trim(),
				correctAnswer: currentWord.answer,
				isCorrect: isCorrect,
			},
		]);

		if (isCorrect) {
			// CAMBIO AQUÍ: Se suman los puntos por pregunta en lugar de 1
			setScore((prev) => prev + POINTS_PER_QUESTION);
			setStatusMessage('<p class="text-2xl font-bold text-green-500">✅ Correct!</p>');
		} else {
			setStatusMessage(`
                <p class="text-red-500">Not quite!</p>
                <p class="text-gray-700">The correct answer was: <strong class="font-bold text-blue-600">${currentWord.answer}</strong></p>
            `);
		}
		setIsRoundComplete(true);
	};

	const handleNextClick = () => {
		if (questionsAsked + 1 >= TOTAL_QUESTIONS) {
			onGameOver(results);
		} else {
			setQuestionsAsked((prev) => prev + 1);
		}
	};

	return (
		<div className='w-full max-w-2xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center'>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-xl sm:text-2xl font-bold text-blue-600'>
					Vocabulary Challenge
				</h1>
				<div className='text-xl font-bold text-gray-700'>Score: {score}</div>
			</div>
			<p className='text-gray-600 mb-8'>
				Round {questionsAsked + 1} of {TOTAL_QUESTIONS}
			</p>
			<div className='mb-8 flex flex-col items-center'>
				<p className='text-xl sm:text-2xl text-gray-800 mb-4 bg-gray-100 p-6 rounded-lg min-h-[100px] flex items-center justify-center'>
					"{currentWord.definition}"
				</p>
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
					placeholder='Type the word...'
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

// Componente para la pantalla de fin de juego
const GameOverScreen = ({ results, onPlayAgain }) => {
	const correctAnswers = results.filter((r) => r.isCorrect);
	const incorrectAnswers = results.filter((r) => !r.isCorrect);

	// Calcula el puntaje final para mostrarlo en el resumen
	const finalScore = correctAnswers.length * POINTS_PER_QUESTION;

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
										<p className='font-semibold text-black'>"{result.question}"</p>

										<p className='text-sm' style={{ color: '#57788F' }}>
											Correct Answer:{' '}
											<span className='font-medium'>{result.correctAnswer}</span>
										</p>
										<p className='text-sm' style={{ color: '#57788F' }}>
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
										<p className='font-semibold text-black'>"{result.question}"</p>

										<p className='text-sm' style={{ color: '#57788F' }}>
											Correct Answer:{' '}
											<span className='font-medium'>{result.correctAnswer}</span>
										</p>
										<p className='text-sm' style={{ color: '#57788F' }}>
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

//  Componente principal renombrado a 'Vocabulary'
export const Vocabulary = () => {
	// El estado del juego ahora comienza en 'playing'
	const [gameState, setGameState] = useState('playing');
	const [gameResults, setGameResults] = useState([]);
	const { user } = useAuth();

	const handleGameOver = async (results) => {
		setGameResults(results);
		setGameState('over');

		const correct = results.filter((r) => r.isCorrect).length;
		const score = Math.round((correct / TOTAL_QUESTIONS) * 100);

		if (user && user.id) {
			try {
				await fetch(`${API_URL}/user/game-history`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						userId: user.id,
						game: 'Vocabulary Challenge',
						score: score,
					}),
				});
			} catch (e) {
				console.warn('No se pudo guardar el puntaje de vocabulary:', e);
			}
		}
	};

	const handlePlayAgain = () => {
		// Al jugar de nuevo, reiniciamos el estado a 'playing'
		setGameResults([]);
		setGameState('playing');
	};

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

export default Vocabulary;
