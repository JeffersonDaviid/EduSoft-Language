import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// **MODIFICADO**: Se vuelve a una única lista de oraciones.
const sentences = [
    { display: "The cat is on the ____.", speak: "The cat is on the table.", answer: "table" },
    { display: "I like to ____ apples.", speak: "I like to eat apples.", answer: "eat" },
    { display: "The sky is ____.", speak: "The sky is blue.", answer: "blue" },
    { display: "She has two ____.", speak: "She has two dogs.", answer: "dogs" },
    { display: "He is reading a ____.", speak: "He is reading a book.", answer: "book" },
    { display: "They are ____ to the park.", speak: "They are going to the park.", answer: "going" },
    { display: "I ____ my teeth every morning.", speak: "I brush my teeth every morning.", answer: "brush" },
    { display: "The weather is ____ and sunny.", speak: "The weather is warm and sunny.", answer: "warm" },
    { display: "It is ____ to arrive on time.", speak: "It is essential to arrive on time.", answer: "essential" },
    { display: "He received a prestigious ____ for his work.", speak: "He received a prestigious award for his work.", answer: "award" }
];

const TOTAL_QUESTIONS = 5;

// Función para barajar un arreglo y tomar los primeros N elementos.
const shuffleAndPick = (arr, num) => {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, num);
};

// Componente para la pantalla de juego
const GameScreen = ({ onGameOver }) => {
    // **MODIFICADO**: Se obtiene una lista de preguntas aleatorias al inicio.
    const [gameSentences, setGameSentences] = useState([]);
    const [currentSentence, setCurrentSentence] = useState({ display: '', speak: '', answer: '' });
    const [userInput, setUserInput] = useState('');
    const [statusMessage, setStatusMessage] = useState('Type the missing word!');
    const [score, setScore] = useState(0);
    const [questionsAsked, setQuestionsAsked] = useState(0);
    const [isRoundComplete, setIsRoundComplete] = useState(false);

    useEffect(() => {
        setGameSentences(shuffleAndPick(sentences, TOTAL_QUESTIONS));
    }, []);

    // Muestra la siguiente oración de la lista barajada.
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

        if (userInput.trim().toLowerCase() === currentSentence.answer.toLowerCase()) {
            setScore(prev => prev + 1);
            setStatusMessage('<p class="text-2xl font-bold text-green-500">✅ Correct!</p>');
            setIsRoundComplete(true);
        } else {
            setStatusMessage(`
                <p class="text-red-500">Not quite!</p>
                <p class="text-gray-700">The correct answer was: <strong class="font-bold text-blue-600">${currentSentence.answer}</strong></p>
            `);
            setIsRoundComplete(true);
        }
    };

    const handleNextClick = () => {
        if (questionsAsked + 1 >= TOTAL_QUESTIONS) {
            onGameOver(score);
        } else {
            setQuestionsAsked(prev => prev + 1);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-blue-600">Fill in the Blank</h1>
                <div className="text-xl font-bold text-gray-700">Score: {score}</div>
            </div>

            <p className="text-gray-600 mb-8">Round {questionsAsked + 1} of {TOTAL_QUESTIONS}</p>

            <div className="mb-8 flex flex-col items-center">
                <p className="text-2xl sm:text-3xl text-gray-800 mb-4 bg-gray-100 p-4 rounded-lg">
                    {currentSentence.display}
                </p>
                <button onClick={handleListenClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full text-lg shadow-lg">
                    <span className="mr-2">🔊</span> Listen
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} disabled={isRoundComplete}
                    className="flex-grow p-4 border-2 border-gray-300 rounded-lg text-xl text-center shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                    placeholder="Missing word..."
                />
                <button type="submit" disabled={isRoundComplete || !userInput.trim()}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-md disabled:bg-green-300 disabled:cursor-not-allowed">
                    Submit
                </button>
            </form>
            
            <div className="h-16 flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100">
                <div dangerouslySetInnerHTML={{ __html: statusMessage }} />
            </div>

            {isRoundComplete && (
                <button onClick={handleNextClick}
                    className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg">
                    Next ➔
                </button>
            )}
        </div>
    );
};

// Componente para la pantalla de fin de juego
// Componente para la pantalla de fin de juego
const GameOverScreen = ({ score, onPlayAgain }) => (
    // **CAMBIO REALIZADO**: Se agregó un margen inferior mb-24 para separarlo del pie de página.
    <div className="w-full max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 sm:p-16 text-center mb-33">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Round Complete!</h1>
        <p className="text-gray-600 text-2xl mb-8">Your final score is:</p>
        <p className="text-6xl font-bold text-green-500 mb-12">{score} / {TOTAL_QUESTIONS}</p>
        <button onClick={onPlayAgain}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg">
            Choose Another Level
        </button>
         <Link to="/games" className="inline-block mt-8 text-gray-500 hover:text-blue-600 transition-colors">
            Browse Other Games
        </Link>
    </div>
);

// **MODIFICADO**: Pantalla de inicio sin selección de nivel.
const StartScreen = ({ onPlay }) => (
     <div className="w-full max-w-2xl mx-auto my-16 bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">Listening Challenge</h1>
        <p className="text-gray-600 mb-8">Listen to the sentence and fill in the blank. Test your skills!</p>
        
         <div className="my-8">
             <img src="public/hero.jpg" alt="Listening game illustration" className="rounded-lg mx-auto" />
        </div>
        
        <button onClick={onPlay}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg">
            Play
        </button>
        
        <Link to="/games" className="inline-block mt-8 text-gray-500 hover:text-blue-600 transition-colors">
            Browse Other Games
        </Link>
    </div>
);

// Componente principal 'Listen' que gestiona el estado del juego
export const Listen = () => {
    const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'over'
    const [finalScore, setFinalScore] = useState(0);
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        if (!('speechSynthesis' in window)) {
            setIsSupported(false);
        }
    }, []);

    const handleGameOver = (score) => {
        setFinalScore(score);
        setGameState('over');
    };

    const handlePlayAgain = () => {
        setGameState('start');
    };

    if (!isSupported) {
        return <p>Sorry, your browser does not support Speech Synthesis.</p>;
    }

    switch (gameState) {
        case 'playing':
            return <GameScreen onGameOver={handleGameOver} />;
        case 'over':
            return <GameOverScreen score={finalScore} onPlayAgain={handlePlayAgain} />;
        case 'start':
        default:
            return <StartScreen onPlay={() => setGameState('playing')} />;
    }
};

export default Listen;
