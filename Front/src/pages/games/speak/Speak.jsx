import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import { API_URL } from '../../../API';

// --- Global Data (paragraphs for pronunciation) ---
// Contenido basado en las unidades 7-10 para un nivel de dificultad avanzado.
const pronunciationSentences = [
	// --- UNIT 7: The Information Age ---
	{
		sentence: "In our weird, wired world, new social media features are constantly being added. This trend will be discussed in our next debate, won't it? Information overload is a real issue; therefore, learning to filter content is an essential skill."
	},
	{
		sentence: "It seems our personal data has already been collected by numerous apps. For connecting ideas formally, we can argue that privacy regulations will be needed soon. Isn't it strange how many forms of communication now depend entirely on technology?"
	},
	// --- UNIT 8: Putting the Mind to Work ---
	{
		sentence: "For this job, we need a creative person capable of offering solutions to complex problems. Qualities of creative people include curiosity and resilience, which helps them analyze reasons behind failures without giving up. We seek a candidate skilled in design."
	},
	{
		sentence: "The project was a success, which shows that our team has great problem-solving skills. The final prototype, developed after months of research, works perfectly. We should hire people who have a history of generating ideas that work."
	},
	// --- UNIT 9: Generally Speaking ---
	{
		sentence: "Generally speaking, comparing customs and habits can be insightful. In my home country, people would always greet strangers, whereas the local custom here is more reserved. I used to find it awkward, but now I understand it."
	},
	{
		sentence: "Despite the challenges, making generalizations helps us understand cultural patterns. Except for a few individuals, most people in this community value punctuality. It's a key difference in contrast to my old neighborhood."
	},
	// --- UNIT 10: The Art of Complaining ---
	{
		sentence: "That really bugs me! I'd like to ask a simple indirect question: could you tell me why the service is so slow? My main annoyance is having to wait. I try to keep calm, but sometimes it's hard to stay patient."
	},
	{
		sentence: "Let's do something about it. I wonder if you could give me some advice. To avoid problems, it's best to complain politely. You should keep a record of your complaints and stay focused on the facts. This is the best way to get a resolution."
	},
];

// Ajustamos el número total de rondas al nuevo total de párrafos.
const TOTAL_PRONUNCIATION_ROUNDS = 5;

const shuffleAndPick = (arr, num) => {
	return [...arr].sort(() => 0.5 - Math.random()).slice(0, num);
};

// --- Enhanced Scoring System ---
const calculateSentenceScore = (originalSentence, transcribedSentence, confidence) => {
	// Normalize sentences for comparison
	const normalize = (text) => {
		return text
			.toLowerCase()
			.replace(/[.,!?;:]/g, '') // Remove punctuation
			.replace(/\s+/g, ' ') // Normalize whitespace
			.trim();
	};

	const original = normalize(originalSentence);
	const transcribed = normalize(transcribedSentence);

	// Calculate word-level similarity
	const originalWords = original.split(' ');
	const transcribedWords = transcribed.split(' ');

	let matchingWords = 0;
	const maxLength = Math.max(originalWords.length, transcribedWords.length);

	// Count matching words (position-independent)
	const originalWordCount = {};
	const transcribedWordCount = {};

	originalWords.forEach((word) => {
		originalWordCount[word] = (originalWordCount[word] || 0) + 1;
	});

	transcribedWords.forEach((word) => {
		transcribedWordCount[word] = (transcribedWordCount[word] || 0) + 1;
	});

	// Calculate matches
	Object.keys(originalWordCount).forEach((word) => {
		if (transcribedWordCount[word]) {
			matchingWords += Math.min(originalWordCount[word], transcribedWordCount[word]);
		}
	});

	// Calculate similarity percentage
	const wordSimilarity = maxLength > 0 ? matchingWords / originalWords.length : 0;

	// Combine word similarity with confidence
	const finalScore = wordSimilarity * 0.7 + confidence * 0.3;

	return {
		wordSimilarity: wordSimilarity,
		confidence: confidence,
		finalScore: finalScore,
		isCorrect: finalScore >= 0.7 && confidence >= 0.7,
	};
};

// --- PronunciationGameScreen Component (Core Game Logic) ---
const PronunciationGameScreen = ({ onGameOver, isSupported }) => {
	const [gameSentences, setGameSentences] = useState([]);
	const [currentSentence, setCurrentSentence] = useState('');
	const [roundsPlayed, setRoundsPlayed] = useState(0);
	const [statusMessage, setStatusMessage] = useState(
		'Ready? Press "Listen" to hear the sentence!'
	);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [isListening, setIsListening] = useState(false);
	const [hasRecorded, setHasRecorded] = useState(false);
	const [currentTranscript, setCurrentTranscript] = useState('');

	const recognitionRef = useRef(null);
	const [results, setResults] = useState([]);

	// Initialize sentences when component mounts
	useEffect(() => {
		const shuffled = shuffleAndPick(pronunciationSentences, TOTAL_PRONUNCIATION_ROUNDS);
		setGameSentences(shuffled);
	}, []);

	// Set current sentence for each round
	useEffect(() => {
		if (gameSentences.length > 0 && roundsPlayed < gameSentences.length) {
			setCurrentSentence(gameSentences[roundsPlayed].sentence);
			setStatusMessage('Ready? Press "Listen" to hear the sentence!');
			setIsSpeaking(false);
			setIsListening(false);
			setHasRecorded(false);
			setCurrentTranscript('');

			if (window.speechSynthesis.speaking) {
				window.speechSynthesis.cancel();
			}
		}
	}, [roundsPlayed, gameSentences]);

	// Speech Recognition Setup
	useEffect(() => {
		if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
			setStatusMessage(
				'Speech Recognition not supported in this browser. Please use Chrome for best experience.'
			);
			return;
		}

		const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
		const newRecognition = new SpeechRecognition();
		newRecognition.continuous = false;
		newRecognition.interimResults = false;
		newRecognition.lang = 'en-US';

		newRecognition.onstart = () => {
			setIsListening(true);
			setStatusMessage('Listening... Speak the sentence now.');
		};

		newRecognition.onresult = (event) => {
			setIsListening(false);
			const transcript = event.results[0][0].transcript;
			const confidence = event.results[0][0].confidence;

			setCurrentTranscript(transcript);
			setHasRecorded(true);
			setStatusMessage(
				'Recording complete! Press "Next" to continue or "Speak" to try again.'
			);

			console.log(`You said: "${transcript}" (Confidence: ${confidence.toFixed(2)})`);
		};

		newRecognition.onerror = (event) => {
			setIsListening(false);
			console.error('Speech Recognition Error:', event.error);

			if (event.error === 'not-allowed') {
				setStatusMessage(
					'Microphone access denied. Please allow microphone in browser settings.'
				);
			} else if (event.error === 'no-speech') {
				setStatusMessage('No speech detected. Please press "Speak" and try again.');
			} else if (event.error === 'network') {
				setStatusMessage(
					'Network error. Could not reach speech recognition services. Check your internet connection and try again.'
				);
			} else if (event.error === 'aborted') {
				console.log(
					'Speech recognition aborted (likely intentional or next round transition).'
				);
			} else {
				setStatusMessage(`Error: ${event.error}. Please try again.`);
			}
		};

		newRecognition.onend = () => {
			console.log('Speech Recognition ended.');
			if (isListening) {
				setIsListening(false);
			}
		};

		recognitionRef.current = newRecognition;

		return () => {
			if (recognitionRef.current) {
				try {
					recognitionRef.current.abort();
					recognitionRef.current = null;
				} catch (error) {
					console.warn('Error cleaning up recognition on unmount:', error);
				}
			}
		};
	}, []);

	// Function to handle Listen button click (Speech Synthesis)
	const handleListenClick = useCallback(() => {
		if (!currentSentence || isListening) return;

		if (recognitionRef.current && isListening) {
			recognitionRef.current.abort();
			setIsListening(false);
		}

		setIsSpeaking(true);
		const utterance = new SpeechSynthesisUtterance(currentSentence);
		utterance.lang = 'en-US';
		utterance.rate = 0.8; // Slightly slower for better comprehension

		utterance.onend = () => {
			setIsSpeaking(false);
			setStatusMessage('Now press "Speak" to repeat the sentence!');
		};

		utterance.onerror = (event) => {
			console.error('Speech Synthesis Error:', event.error);
			setIsSpeaking(false);
			setStatusMessage('Error speaking the sentence. Try again.');
		};

		window.speechSynthesis.speak(utterance);
	}, [currentSentence, isListening]);

	// Function to handle Speak button click (Speech Recognition)
	const handleSpeakClick = useCallback(() => {
		if (!recognitionRef.current || !isSupported) {
			setStatusMessage(
				'Speech Recognition not available or not supported by your browser.'
			);
			return;
		}

		if (isListening) {
			try {
				recognitionRef.current.abort();
				setStatusMessage('Recording stopped. Press "Speak" to try again.');
			} catch (error) {
				console.warn('Error stopping recognition:', error);
			}
		} else {
			if (window.speechSynthesis.speaking) {
				window.speechSynthesis.cancel();
			}

			try {
				recognitionRef.current.start();
			} catch (error) {
				console.error('Error starting recognition:', error);
				if (error.name === 'AbortError') {
					setStatusMessage(
						'Microphone already in use or previous recognition not fully stopped. Please try again.'
					);
				} else if (error.name === 'NotAllowedError') {
					setStatusMessage(
						'Microphone access denied. Please allow microphone in browser settings.'
					);
				} else {
					setStatusMessage('Error starting speech recognition. Please try again.');
				}
				setIsListening(false);
			}
		}
	}, [isListening, isSupported]);

	const handleNextClick = useCallback(() => {
		if (!hasRecorded || !currentTranscript) {
			setStatusMessage('Please record your pronunciation first!');
			return;
		}

		const scoreResult = calculateSentenceScore(currentSentence, currentTranscript, 0.85);

		let roundResult = {
			sentence: currentSentence,
			transcript: currentTranscript,
			isCorrect: scoreResult.finalScore >= 0.7,
			confidence: scoreResult.confidence,
			wordSimilarity: scoreResult.wordSimilarity,
			finalScore: scoreResult.finalScore,
		};

		if (roundsPlayed + 1 >= TOTAL_PRONUNCIATION_ROUNDS) {
			const updatedResults = [...results, roundResult];
			const totalFinalScore = updatedResults.reduce((acc, r) => acc + ((r.finalScore || 0)), 0);
			const normalizedScore = Math.round((totalFinalScore / TOTAL_PRONUNCIATION_ROUNDS) * 100);
			setResults(updatedResults);
			onGameOver(normalizedScore, updatedResults);
		} else {
			setResults((prev) => [...prev, roundResult]);
			setRoundsPlayed((prev) => prev + 1);
		}

		if (isListening && recognitionRef.current) {
			try {
				recognitionRef.current.abort();
			} catch (error) {
				console.warn('Error aborting recognition before next round:', error);
			}
			setIsListening(false);
		}
	}, [
		roundsPlayed,
		onGameOver,
		isListening,
		hasRecorded,
		currentTranscript,
		currentSentence,
		results,
	]);

	const getAverageScore = () => {
		let tempResults = results;
		if (hasRecorded && currentTranscript && roundsPlayed < TOTAL_PRONUNCIATION_ROUNDS) {
			const scoreResult = calculateSentenceScore(currentSentence, currentTranscript, 0.85);
			tempResults = [
				...results,
				{
					sentence: currentSentence,
					transcript: currentTranscript,
					isCorrect: scoreResult.finalScore >= 0.7,
					confidence: scoreResult.confidence,
					wordSimilarity: scoreResult.wordSimilarity,
					finalScore: scoreResult.finalScore,
				},
			];
		}
		if (tempResults.length === 0) return 0;
		const total = tempResults.reduce((acc, r) => acc + ((r.finalScore || 0) * 100), 0);
		return Math.round(total / tempResults.length);
	};

	return (
		<div className='w-full max-w-4xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center'>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-xl sm:text-2xl font-bold text-blue-600'>
					Pronunciation Challenge
				</h1>
				<div className='text-xl font-bold text-gray-700'>Score: {getAverageScore()}</div>
			</div>
			<p className='text-gray-600 mb-8'>
				Round {roundsPlayed + 1} of {TOTAL_PRONUNCIATION_ROUNDS}
			</p>

			<div className='mb-8 flex flex-col items-center'>
				<div className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6 bg-gray-100 p-6 rounded-lg min-w-[300px] text-center leading-relaxed'>
					{currentSentence}
				</div>

				{hasRecorded && currentTranscript && (
					<div className='mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200'>
						<p className='text-sm text-gray-600 mb-2'>Your pronunciation:</p>
						<p className='text-lg font-medium text-blue-800'>"{currentTranscript}"</p>
					</div>
				)}

				<div className='flex flex-wrap gap-4 justify-center'>
					<button
						onClick={handleListenClick}
						disabled={isSpeaking || isListening || !isSupported}
						className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg text-xl shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed'
					>
						🔊 Listen
					</button>
					<button
						onClick={handleSpeakClick}
						disabled={isSpeaking || !isSupported}
						className={`font-bold py-3 px-6 rounded-lg text-xl shadow-md ${isListening
							? 'bg-red-500 hover:bg-red-600 text-white'
							: 'bg-blue-600 hover:bg-blue-700 text-white'
							} disabled:opacity-50 disabled:cursor-not-allowed`}
						title={!isSupported ? 'Speech Recognition not supported' : ''}
					>
						{isListening ? '🛑 Stop' : '🎤 Speak'}
					</button>
					<button
						onClick={handleNextClick}
						disabled={isListening || isSpeaking || !hasRecorded}
						className='bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-md disabled:bg-green-300 disabled:cursor-not-allowed'
					>
						Next ➔
					</button>
				</div>
			</div>

			<div className='h-16 flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 text-lg'>
				<div dangerouslySetInnerHTML={{ __html: statusMessage }} />
			</div>
		</div>
	);
};

// --- PronunciationGameOverScreen Component ---
const PronunciationGameOverScreen = ({ finalScore, results, onPlayAgain }) => {
	return (
		<div className='w-full max-w-4xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-8 sm:p-12 text-left'>
			<h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-2 text-center'>
				Challenge Complete!
			</h1>
			<p className='text-gray-600 text-center mb-10'>
				You finished the Pronunciation Challenge. Here's how you did!
			</p>

			<div className='space-y-6'>
				<h2 className='text-2xl font-bold text-gray-800 mb-4 text-center'>
					Review Your Pronunciations
				</h2>
				{results.map((result, index) => (
					<div key={index} className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
						<div className='flex items-start gap-4'>
							<div
								className={`flex-shrink-0 rounded-full h-8 w-8 flex items-center justify-center font-bold text-white ${result.isCorrect ? 'bg-green-600' : 'bg-red-600'
									}`}
							>
								{result.isCorrect ? '✓' : '✗'}
							</div>
							<div className='flex-grow'>
								<p className='font-semibold text-lg text-gray-900 mb-2'>
									Sentence: <span className='text-blue-600'>"{result.sentence}"</span>
								</p>
								<p className='text-base text-gray-700 mb-2'>
									What you said:{' '}
									<span className='font-medium italic'>
										"{result.transcript || 'N/A'}"
									</span>
								</p>

								<div className='flex flex-wrap gap-4 text-sm text-gray-600'>
									<span>
										Confidence:{' '}
										{result.confidence ? (result.confidence * 100).toFixed(1) : 'N/A'}%
									</span>
									<span>
										Word Match:{' '}
										{result.wordSimilarity
											? (result.wordSimilarity * 100).toFixed(1)
											: 'N/A'}
										%
									</span>
									<span>
										Final Score:{' '}
										{result.finalScore ? (result.finalScore * 100).toFixed(1) : 'N/A'}%
									</span>
								</div>

								<div
									className={`mt-2 px-3 py-1 rounded-full text-sm font-medium inline-block ${result.isCorrect
										? 'bg-green-100 text-green-800'
										: 'bg-red-100 text-red-800'
										}`}
								>
									{result.isCorrect ? 'Great pronunciation!' : 'Keep practicing!'}
								</div>
							</div>
						</div>
					</div>
				))}
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

// --- Main Component 'PronunciationChallenge' (Manages Game State) ---
export const PronunciationChallenge = () => {
	// 1. Cambiamos el estado inicial a 'playing' para que el juego comience de inmediato.
	const [gameState, setGameState] = useState('playing');
	const [finalScore, setFinalScore] = useState(0);
	const [gameResults, setGameResults] = useState([]);
	const [isSupported, setIsSupported] = useState(true);
	const { user } = useAuth();


	useEffect(() => {
		if (
			!('speechSynthesis' in window) ||
			!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
		) {
			setIsSupported(false);
		}
	}, []);

	const handleGameOver = async (score, results) => {
		setFinalScore(score);
		setGameResults(results);
		setGameState('over');

		// Registrar el puntaje en el backend si hay usuario
		if (user && user.id) {
			try {
				await fetch(`${API_URL}/user/game-history`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						userId: user.id,
						game: 'Speaking Challenge',
						score: score
					}),
				});
			} catch (e) {
				console.warn('Could not save pronunciation score:', e);
			}
		}
	};

	// 2. Para reiniciar el juego, simplemente recargamos la página.
	// Es una estrategia simple y efectiva, igual a la de tu componente 'Grammar'.
	const handlePlayAgain = () => {
		window.location.reload();
	};

	if (!isSupported) {
		return (
			<div className='w-full flex-grow flex items-center justify-center p-4'>
				<p className='text-red-600 text-lg font-semibold text-center'>
					Sorry, your browser does not fully support the required Speech Synthesis and
					Speech Recognition features for this game.
					<br />
					Please try using Google Chrome for the best experience.
				</p>
			</div>
		);
	}

	// 3. Actualizamos la lógica para renderizar los componentes.
	// Ya no necesitamos el caso 'start'.
	const renderGameState = () => {
		switch (gameState) {
			case 'playing':
				return (
					<PronunciationGameScreen
						onGameOver={handleGameOver}
						isSupported={isSupported}
					/>
				);
			case 'over':
				return (
					<PronunciationGameOverScreen
						finalScore={finalScore}
						results={gameResults}
						onPlayAgain={handlePlayAgain}
					/>
				);
			default:
				// Por defecto, mostramos la pantalla de juego.
				return (
					<PronunciationGameScreen
						onGameOver={handleGameOver}
						isSupported={isSupported}
					/>
				);
		}
	};

	return (
		<div className='w-full flex-grow flex items-center justify-center p-4'>
			{renderGameState()}
		</div>
	);
};

export { PronunciationChallenge as Speak };