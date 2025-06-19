import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router';
import { HeaderGame } from '../../../components/HeaderGame';

const sentences = [
	'Paola has already visited the Galápagos',
	'Quito University will launch a new research hub next semester',
	'Paola has already visited the Galápagos',
	'If students recycle properly, the campus will stay cleaner',
	'Paola has already visited the Galápagos',
];
const shuffled = sentences.map((s) => s.split(' ').sort(() => Math.random() - 0.5));

export const Grammar = () => {
	const total = sentences.length;
	const [step, setStep] = useState(0);
	const [dock, setDock] = useState(shuffled[0]);
	const [placed, setPlaced] = useState([]);
	const [verified, setVerified] = useState(false);
	const [results, setResults] = useState([]);
	const [finished, setFinished] = useState(false);
	const [score, setScore] = useState(100); // 5 ejercicios x 20 pts

	const correctSentence = sentences[step];

	/* mover palabra */
	const move = (w, fromDock) => {
		if (verified) return;
		fromDock
			? (setDock(dock.filter((x) => x !== w)), setPlaced([...placed, w]))
			: (setPlaced(placed.filter((x) => x !== w)), setDock([...dock, w]));
	};

	/* verificar */
	const handleVerify = () => {
		const userAnswer = placed.join(' ');
		setVerified(true);
		// Calcular errores en este ejercicio
		const correctArr = correctSentence.split(' ');
		let errors = 0;
		for (let i = 0; i < correctArr.length; i++) {
			if (placed[i] !== correctArr[i]) errors++;
		}
		// Restar puntos por errores (cada error = -2 puntos, ajustable)
		setScore((prev) => Math.max(0, prev - errors * 2));
		setResults([
			...results,
			{
				question: 'Arrange the words to form a correct sentence:',
				userAnswer,
				correctAnswer: correctSentence,
				isCorrect: userAnswer === correctSentence,
				errors,
			},
		]);
	};

	/* avanzar */
	const handleNext = () => {
		setStep((c) => c + 1);
		setDock(shuffled[step + 1]);
		setPlaced([]);
		setVerified(false);
	};

	/* terminar */
	const handleFinish = () => setFinished(true);

	/* componente palabra */
	const Word = ({ w, fromDock, idx }) => {
		const correct = verified && placed[idx] === correctSentence.split(' ')[idx];
		const wrong = verified && placed[idx] && !correct;
		return (
			<motion.button
				layout
				whileTap={{ scale: 0.9 }}
				disabled={verified}
				onClick={() => move(w, fromDock)}
				className={`px-3 py-1 m-1 rounded shadow ${
					correct ? 'bg-green-300' : wrong ? 'bg-red-300' : 'bg-white'
				}`}
			>
				{w}
			</motion.button>
		);
	};

	/* pantalla de resultados */
	if (finished)
		return (
			<GameResumeDetails
				results={results}
				score={score}
				onPlayAgain={() => window.location.reload()}
			/>
		);

	/* UI principal */
	return (
		<section className='max-w-2xl mx-auto p-4 sm:p-6 space-y-6 select-none'>
			<HeaderGame
				typeGame={'Grammar'}
				title={'Arrange the words in order'}
				totalSteps={sentences.length}
				currentStep={step + 1}
				score={score}
			/>

			{/* oración armada */}
			<div className='w-full border-2 border-green-400 rounded-xl flex flex-wrap  gap-0 bg-gradient-to-r from-green-50 via-green-100 to-green-50 shadow-inner py-4 px-2 min-h-[56px] transition-all duration-300'>
				{placed.map((w, i) => (
					<span key={w + i} className='inline-flex items-center'>
						<Word w={w} idx={i} fromDock={false} />
						{/* corrección */}
						{verified && placed[i] !== correctSentence.split(' ')[i] && (
							<span className='ml-1 italic text-green-700 text-sm'>
								{correctSentence.split(' ')[i]}
							</span>
						)}
					</span>
				))}
			</div>
			{/* dock mejorado */}
			{dock.length > 0 && (
				<div className='w-full border-2 border-sky-400 rounded-xl flex flex-wrap justify-center items-center gap-2 bg-gradient-to-r from-sky-100 via-sky-200 to-sky-100 shadow-inner py-4 px-2 min-h-[56px] transition-all duration-300'>
					{dock.map((w) => (
						<Word key={w} w={w} fromDock={true} />
					))}
				</div>
			)}
			{/* botones */}
			<div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
				{!verified && (
					<button
						onClick={handleVerify}
						disabled={placed.length === 0}
						className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40 cursor-pointer'
					>
						Verify
					</button>
				)}

				{verified && step < total - 1 && (
					<button
						onClick={handleNext}
						className='bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition-colors duration-150 cursor-pointer'
					>
						Next ➔
					</button>
				)}

				{verified && step === total - 1 && (
					<button
						onClick={handleFinish}
						className='bg-gray-800 text-white px-4 py-2 rounded cursor-pointer'
					>
						Finish
					</button>
				)}
			</div>

			{/* feedback general */}
			{verified && (
				<p
					className={`font-semibold ${
						placed.join(' ') === correctSentence ? 'text-green-600' : 'text-red-600'
					}`}
				>
					{placed.join(' ') === correctSentence
						? 'Great! The sentence is correct.'
						: 'Some words are in the wrong place — see corrections above.'}
				</p>
			)}
		</section>
	);
};

const GameResumeDetails = ({ results, score, onPlayAgain }) => {
	const correctAnswers = results.filter((r) => r.isCorrect);
	const incorrectAnswers = results.filter((r) => !r.isCorrect);

	const renderQuestion = (question) => {
		// resaltamos la parte que debía ir en negrita
		return <p className='font-semibold text-black'>{question}</p>;
	};

	return (
		<div className='w-full max-w-4xl mx-auto my-16 bg-white lg:shadow-2xl rounded-2xl p-4 sm:p-8 md:p-12 text-left'>
			<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center'>
				Review Your Performance
			</h1>
			<p className='text-gray-600 text-center mb-8 sm:mb-10'>
				Let's take a look at how you did. This review will help you understand where you
				excelled and where you might need a bit more practice.
			</p>
			<div className='text-center mb-8'>
				<span className='inline-block bg-green-100 text-green-700 font-bold text-lg md:text-2xl rounded-full px-6 py-2 shadow'>
					Your Score: {score} / 100
				</span>
			</div>

			<div className='space-y-8'>
				{correctAnswers.length > 0 && (
					<section>
						<h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4'>
							Correct Answers
						</h2>
						<div className='space-y-4'>
							{correctAnswers.map((r, i) => (
								<div
									key={i}
									className={`p-4 flex items-start gap-4 rounded-lg ${
										'sm:bg-gray-50 sm:border sm:border-gray-200' // Only show card style on sm and up
									}`}
								>
									<div className='flex-shrink-0 bg-gray-200 text-green-600 rounded-full h-8 w-8 flex items-center justify-center font-bold'>
										✓
									</div>
									<div>
										{renderQuestion(r.question, r.correctAnswer)}
										<p className='text-sm text-[#57788F]'>
											Your Answer: <span className='font-medium'>{r.userAnswer}</span>
										</p>
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{incorrectAnswers.length > 0 && (
					<section>
						<h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4'>
							Incorrect Answers
						</h2>
						<div className='space-y-4'>
							{incorrectAnswers.map((r, i) => (
								<div
									key={i}
									className={`p-4 flex items-start gap-4 rounded-lg ${'sm:bg-gray-50 sm:border sm:border-gray-200'}`}
								>
									<div className='flex-shrink-0 bg-gray-200 text-red-600 rounded-full h-8 w-8 flex items-center justify-center font-bold'>
										✗
									</div>
									<div>
										{renderQuestion(r.question, r.correctAnswer)}
										<p className='text-sm text-[#57788F]'>
											Correct Answer:{' '}
											<span className='font-medium'>{r.correctAnswer}</span>
										</p>
										<p className='text-sm text-[#57788F]'>
											Your Answer: <span className='font-medium'>{r.userAnswer}</span>
										</p>
									</div>
								</div>
							))}
						</div>
					</section>
				)}
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
