// Front/src/pages/games/speak/Speak.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

// --- Global Data (sentences adapted for pronunciation) ---
const pronunciationWords = [
	{ word: "Happy" },
	{ word: "Beautiful" },
	{ word: "Challenge" },
	{ word: "Opportunity" },
	{ word: "Enthusiasm" },
	{ word: "Strawberry" },
	{ word: "Computer" },
	{ word: "Elephant" },
	{ word: "Fantastic" },
	{ word: "Develop" },
	{ word: "Success" },
	{ word: "Believe" },
	{ word: "Family" },
	{ word: "Imagine" },
	{ word: "Connect" },
];

const TOTAL_PRONUNCIATION_ROUNDS = 5;

const shuffleAndPick = (arr, num) => {
	return [...arr].sort(() => 0.5 - Math.random()).slice(0, num);
};

// --- PronunciationGameScreen Component (Core Game Logic) ---
const PronunciationGameScreen = ({ onGameOver, isSupported }) => {
	const [gameWords, setGameWords] = useState([]);
	const [currentWord, setCurrentWord] = useState('');
	const [score, setScore] = useState(0);
	const [roundsPlayed, setRoundsPlayed] = useState(0);
	const [statusMessage, setStatusMessage] = useState('Ready? Press "Speak"!');
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [isListening, setIsListening] = useState(false);

	// Usamos useRef para mantener la instancia de SpeechRecognition
	const recognitionRef = useRef(null);
	const [results, setResults] = useState([]);

	// Initialize words when component mounts
	useEffect(() => {
		const shuffled = shuffleAndPick(pronunciationWords, TOTAL_PRONUNCIATION_ROUNDS);
		setGameWords(shuffled);
	}, []);

	// Set current word for each round
	useEffect(() => {
		if (gameWords.length > 0 && roundsPlayed < gameWords.length) {
			setCurrentWord(gameWords[roundsPlayed].word);
			setStatusMessage('Ready? Press "Speak"!');
			setIsSpeaking(false);
			setIsListening(false);

			// Asegurarse de que cualquier síntesis de voz anterior se detenga
			if (window.speechSynthesis.speaking) {
				window.speechSynthesis.cancel();
			}
		} else if (roundsPlayed >= TOTAL_PRONUNCIATION_ROUNDS) {
			onGameOver(score, results);
		}
	}, [roundsPlayed, gameWords, onGameOver, score, results]);

	// Speech Recognition Setup (se ejecuta solo una vez al montar)
	useEffect(() => {
		if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
			setStatusMessage("Speech Recognition not supported in this browser. Please use Chrome for best experience.");
			return;
		}

		const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
		const newRecognition = new SpeechRecognition();
		newRecognition.continuous = false;
		newRecognition.interimResults = false;
		newRecognition.lang = 'en-US';

		// --- NUEVAS PROPIEDADES PARA MEJORAR LA TOLERANCIA ---
		// speechEndTimeout: tiempo en milisegundos que espera después de que el usuario deja de hablar.
		// maxAlternatives: número máximo de alternativas de reconocimiento a retornar.
		// Estas propiedades no están disponibles en todas las implementaciones de SpeechRecognition
		// pero pueden ayudar en algunos navegadores (especialmente en webkitSpeechRecognition).
		// Se pueden omitir si causan errores o no tienen efecto.
		// newRecognition.speechEndTimeout = 2000; // Por ejemplo, 2 segundos después de que el usuario deja de hablar.
		// newRecognition.maxAlternatives = 1; // Solo necesitamos la mejor alternativa.
		// --- FIN DE NUEVAS PROPIEDADES ---


		newRecognition.onstart = () => {
			setIsListening(true);
			setStatusMessage("Listening... Speak now.");
		};

		newRecognition.onresult = (event) => {
			setIsListening(false); // La escucha finaliza cuando se obtiene un resultado
			const transcript = event.results[0][0].transcript;
			const confidence = event.results[0][0].confidence;
			console.log(`You said: "${transcript}" (Confidence: ${confidence.toFixed(2)})`);

			const isCorrect = transcript.toLowerCase() === currentWord.toLowerCase();
			const confidenceThreshold = 0.7;

			let roundResult = {
				word: currentWord,
				transcript: transcript,
				isCorrect: isCorrect && confidence >= confidenceThreshold,
				confidence: confidence
			};

			setResults(prev => [...prev, roundResult]);

			if (roundResult.isCorrect) {
				setScore(prev => prev + 1);
				setStatusMessage('<span class="text-green-500 font-bold">✅ Great Job!</span>');
			} else {
				let msg = '<span class="text-red-500 font-bold">❌ Not quite!</span>';
				if (!isCorrect) {
					msg += `<br/>You said: "${transcript}"`;
				}
				if (isCorrect && confidence < confidenceThreshold) {
					msg += `<br/>(Pronunciation unclear - Confidence: ${confidence.toFixed(2)})`;
				} else if (!isCorrect) {
					msg += `<br/>Correct: "${currentWord}"`;
				}
				setStatusMessage(msg);
			}
		};

		newRecognition.onerror = (event) => {
			setIsListening(false); // La escucha se detiene en caso de error
			console.error('Speech Recognition Error:', event.error);

			if (event.error === 'not-allowed') {
				setStatusMessage('Microphone access denied. Please allow microphone in browser settings.');
			} else if (event.error === 'no-speech') {
				setStatusMessage('No speech detected. Please press "Speak" and try again.');
			} else if (event.error === 'network') {
				// Mensaje más claro para el error de red
				setStatusMessage('Network error. Could not reach speech recognition services. Check your internet connection and try again.');
			} else if (event.error === 'aborted') {
				console.log('Speech recognition aborted (likely intentional or next round transition).');
			} else {
				setStatusMessage(`Error: ${event.error}. Please try again.`);
			}
		};

		newRecognition.onend = () => {
			console.log('Speech Recognition ended.');
			// En onend, solo actualizamos el estado si no hay un resultado pendiente
			// y si no se ha detenido ya por un error o aborto manual.
			// Es mejor que el onresult o onerror manejen el setIsListening(false).
			// Aquí podemos asegurar que no quede en un estado de "escuchando"
			// si por alguna razón onresult/onerror no lo hicieron.
			if (isListening) {
				setIsListening(false);
				// Si el mensaje de estado no ha sido actualizado por onresult/onerror
				// y no fue un aborto intencional, podemos restablecerlo aquí.
				if (!statusMessage.includes("Error:") && !statusMessage.includes("Great Job!")) {
					setStatusMessage('Ready? Press "Speak"!');
				}
			}
		};

		// Asigna la instancia de reconocimiento al ref
		recognitionRef.current = newRecognition;

		// Limpieza al desmontar el componente
		return () => {
			if (recognitionRef.current) {
				try {
					recognitionRef.current.abort();
					recognitionRef.current = null; // Limpiar la referencia
				} catch (error) {
					console.warn('Error cleaning up recognition on unmount:', error);
				}
			}
		};
	}, []); // Dependencia vacía para que se ejecute una sola vez

	// Function to handle Listen button click (Speech Synthesis)
	const handleListenClick = useCallback(() => {
		if (!currentWord || isListening) return;
		// Si el reconocimiento está activo, abortarlo antes de hablar
		if (recognitionRef.current && isListening) {
			recognitionRef.current.abort();
			setIsListening(false);
		}

		setIsSpeaking(true);
		const utterance = new SpeechSynthesisUtterance(currentWord);
		utterance.lang = 'en-US';

		utterance.onend = () => {
			setIsSpeaking(false);
		};

		utterance.onerror = (event) => {
			console.error('Speech Synthesis Error:', event.error);
			setIsSpeaking(false);
			setStatusMessage('Error speaking the word. Try again.');
		};

		window.speechSynthesis.speak(utterance);
	}, [currentWord, isListening]);

	// Function to handle Speak button click (Speech Recognition)
	const handleSpeakClick = useCallback(() => {
		if (!recognitionRef.current || !isSupported) {
			setStatusMessage("Speech Recognition not available or not supported by your browser.");
			return;
		}

		if (isListening) {
			// Si ya está escuchando, detén la escucha.
			try {
				recognitionRef.current.abort();
				// setIsListening(false) ya se manejará en onend/onerror
				setStatusMessage('Recording stopped. Press "Speak" to try again.');
			} catch (error) {
				console.warn('Error stopping recognition:', error);
			}
		} else {
			// Si no está escuchando, intenta iniciarla.
			if (window.speechSynthesis.speaking) {
				window.speechSynthesis.cancel();
			}

			try {
				recognitionRef.current.start();
				// onstart se encargará de setIsListening(true)
			} catch (error) {
				console.error('Error starting recognition:', error);
				if (error.name === 'AbortError') {
					setStatusMessage('Microphone already in use or previous recognition not fully stopped. Please try again.');
				} else if (error.name === 'NotAllowedError') {
					setStatusMessage('Microphone access denied. Please allow microphone in browser settings.');
				} else {
					setStatusMessage('Error starting speech recognition. Please try again.');
				}
				setIsListening(false);
			}
		}
	}, [isListening, isSupported]);

	// Function to handle Next button click
	const handleNextClick = useCallback(() => {
		// Asegurarse de que la escucha esté detenida antes de pasar a la siguiente ronda
		if (isListening && recognitionRef.current) {
			try {
				recognitionRef.current.abort();
			} catch (error) {
				console.warn('Error aborting recognition before next round:', error);
			}
			setIsListening(false);
		}

		const nextRound = roundsPlayed + 1;
		if (nextRound >= TOTAL_PRONUNCIATION_ROUNDS) {
			onGameOver(score, results);
		} else {
			setRoundsPlayed(nextRound);
		}
	}, [roundsPlayed, onGameOver, score, results, isListening]);

	return (
		<div className="w-full max-w-2xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl sm:text-2xl font-bold text-blue-600">Pronunciation Challenge</h1>
				<div className="text-xl font-bold text-gray-700">Score: {score}</div>
			</div>
			<p className="text-gray-600 mb-8">Round {roundsPlayed + 1} of {TOTAL_PRONUNCIATION_ROUNDS}</p>

			<div className="mb-8 flex flex-col items-center">
				<p className="text-5xl sm:text-6xl font-bold text-gray-800 mb-6 bg-gray-100 p-6 rounded-lg min-w-[200px] inline-block">
					{currentWord}
				</p>
				<div className="flex gap-4">
					<button
						onClick={handleListenClick}
						disabled={isSpeaking || isListening || !isSupported}
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg text-xl shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed"
					>
						Listen
					</button>
					<button
						onClick={handleSpeakClick}
						disabled={isSpeaking || !isSupported}
						className={`font-bold py-3 px-6 rounded-lg text-xl shadow-md ${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
							} disabled:opacity-50 disabled:cursor-not-allowed`}
						title={!isSupported ? "Speech Recognition not supported" : ""}
					>
						{isListening ? 'Stop Listening' : 'Speak'}
					</button>
					<button
						onClick={handleNextClick}
						disabled={isListening || isSpeaking || results.length <= roundsPlayed}
						className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-md disabled:bg-green-300 disabled:cursor-not-allowed"
					>
						Next ➔
					</button>
				</div>
			</div>

			<div className="h-16 flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 text-lg">
				<div dangerouslySetInnerHTML={{ __html: statusMessage }} />
			</div>
		</div>
	);
};

// --- PronunciationGameOverScreen Component ---
const PronunciationGameOverScreen = ({ finalScore, results, onPlayAgain }) => {
	return (
		<div className="w-full max-w-4xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-8 sm:p-12 text-left">
			<h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 text-center">Challenge Complete!</h1>
			<p className="text-gray-600 text-center mb-10">You finished the Pronunciation Challenge. Here's how you did!</p>

			<p className="text-2xl font-bold text-center mb-8">Final Score: <span className="text-blue-600">{finalScore} / {TOTAL_PRONUNCIATION_ROUNDS}</span></p>

			<div className="space-y-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Review Your Pronunciations</h2>
				{results.map((result, index) => (
					<div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-4">
						<div className={`flex-shrink-0 rounded-full h-8 w-8 flex items-center justify-center font-bold text-white ${result.isCorrect ? 'bg-green-600' : 'bg-red-600'
							}`}>
							{result.isCorrect ? '✓' : '✗'}
						</div>
						<div className="flex-grow">
							<p className="font-semibold text-lg text-gray-900">Word: <span className="text-blue-600">{result.word}</span></p>
							<p className="text-sm text-gray-700">You said: <span className="font-medium">"{result.transcript || 'N/A'}"</span></p>
							{!result.isCorrect && (
								<p className="text-sm text-gray-700">Correct pronunciation: <span className="font-medium">"{result.word}"</span></p>
							)}
							<p className="text-xs text-gray-500">Confidence: {result.confidence ? (result.confidence * 100).toFixed(2) : 'N/A'}%</p>
						</div>
					</div>
				))}
			</div>

			<div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
				<button onClick={onPlayAgain} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg text-lg">
					Play Again
				</button>
				<Link to="/games" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg text-center">
					Browse Other Games
				</Link>
			</div>
		</div>
	);
};

// --- PronunciationStartScreen Component ---
const PronunciationStartScreen = ({ onPlay }) => (
	<div className="w-full max-w-2xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center">
		<h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">Pronunciation Challenge</h1>
		<p className="text-gray-600 mb-8">Test your pronunciation skills. Listen to the word, then speak it correctly!</p>
		<div className="my-8">
			<img src="/speak.png" alt="Pronunciation game illustration" className="rounded-lg mx-auto max-w-full h-auto" />
		</div>
		<button onClick={onPlay}
			className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg">
			Start Challenge
		</button>
		<Link to="/games" className="inline-block mt-8 text-gray-500 hover:text-blue-600 transition-colors">
			Browse Other Games
		</Link>
	</div>
);

// --- Main Component 'PronunciationChallenge' (Manages Game State) ---
export const PronunciationChallenge = () => {
	const [gameState, setGameState] = useState('start');
	const [finalScore, setFinalScore] = useState(0);
	const [gameResults, setGameResults] = useState([]);
	const [isSupported, setIsSupported] = useState(true);

	useEffect(() => {
		if (!('speechSynthesis' in window) || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
			setIsSupported(false);
		}
	}, []);

	const handleGameOver = (score, results) => {
		setFinalScore(score);
		setGameResults(results);
		setGameState('over');
	};

	const handlePlayAgain = () => {
		setGameState('start');
	};

	if (!isSupported) {
		return (
			<div className="w-full flex-grow flex items-center justify-center p-4">
				<p className="text-red-600 text-lg font-semibold text-center">
					Sorry, your browser does not fully support the required Speech Synthesis and Speech Recognition features for this game.<br />
					Please try using Google Chrome for the best experience.
				</p>
			</div>
		);
	}

	const renderGameState = () => {
		switch (gameState) {
			case 'playing':
				return <PronunciationGameScreen onGameOver={handleGameOver} isSupported={isSupported} />;
			case 'over':
				return <PronunciationGameOverScreen finalScore={finalScore} results={gameResults} onPlayAgain={handlePlayAgain} />;
			case 'start':
			default:
				return <PronunciationStartScreen onPlay={() => setGameState('playing')} />;
		}
	};

	return (
		<div className="w-full flex-grow flex items-center justify-center p-4">
			{renderGameState()}
		</div>
	);
};

export { PronunciationChallenge as Speak };