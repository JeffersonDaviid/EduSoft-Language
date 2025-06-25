import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router';
import { HeaderGame } from '../../../components/HeaderGame';
import { useAuth } from '../../../context/AuthContext';
import { API_URL } from '../../../API';

const sentencesStack = [
	'Big data is being analyzed in real time to predict customer behavior.',
	'Augmented-reality headsets have been adopted by several hospitals to train surgeons.',
	'Will quantum computing be embraced by mainstream businesses within the decade?',
	'These constant pop-up ads aren’t annoying, are they?',
	'Moreover, video conferencing, which facilitates remote collaboration, is reshaping office culture.',
	'In my opinion, the Internet of Things will revolutionize urban planning.',
	'Participating in the debate, she argued that social-media platforms must be regulated.',
	'Streaming services are being preferred over traditional broadcasting worldwide.',
	'Nevertheless, cyber-security remains a pressing concern; furthermore, data breaches damage trust.',
	'Isn’t it true that e-mail has become less popular among teenagers?',
	'Cloud computing has been heralded as the backbone of digital transformation.',
	'By 2030, remote workspaces will be managed entirely through virtual-reality dashboards.',
	'Applicants fluent in Python, certified in AWS, and experienced with machine learning stand out immediately.',
	'My colleague, who is undeniably visionary, suggested prototyping early to identify flaws.',
	'To solve connectivity issues, one practical solution is installing a mesh network.',
	'Employees motivated by curiosity often generate breakthrough ideas.',
	'Lack of feedback, analyzed carefully, shows why the project stalled.',
	'Her résumé, which was meticulously formatted, highlighted transferable skills.',
	'Designers known for their adaptability frequently pivot during development.',
	'Frankly, the fact remains that the cost-benefit ratio favors automation.',
	'When bandwidth drops, rebooting the router is a quick fix.',
	'The prototype, tested repeatedly, proved viable.',
	'Innovative thinkers, who thrive under pressure, often cultivate a culture of experimentation.',
	'Root-cause analysis revealed that inadequate training led to errors.',
	'While people in Quito greet with a handshake, those in Tokyo bow politely.',
	'We used to gather around the radio in the evenings, but now we stream podcasts individually.',
	'Some professionals stay calm under stress, whereas others keep complaining about minor issues.',
	'Generally speaking, community-oriented cultures place a higher value on collective success.',
	'Except for a few regional differences, holiday traditions remain remarkably similar across the country.',
	'He would always bring home-made desserts to meetings when he worked here.',
	'Tourists keep asking for eco-friendly options, so hotels stay competitive by adopting green policies.',
	'On the other hand, city dwellers dine out frequently, whereas rural families cook at home.',
	'Accepting change is difficult; nevertheless, many employees embrace automation.',
	'Back then, we used to write postcards, and we’d wait weeks for a reply.',
	'Although smartphones simplify communication, they also keep users constantly distracted.',
	'By and large, people prefer flexible schedules over rigid nine-to-five routines.',
	'Slow-loading webpages drive me crazy during rush hours.',
	'I get irritated when automated voices mispronounce my name.',
	'Long queues at the bank make me feel exhausted.',
	'Could you tell me why the printer keeps jamming every morning?',
	'The colleague who never replies to emails is my biggest source of frustration.',
	'What bothers her most is that meetings start late.',
	'If customers feel annoyed, sending a quick apology email may avoid further problems.',
	'He politely suggested that we double-check the cables before calling support.',
	'Was the issue resolved after the update, or is it still causing errors?',
	'Broken coffee machines, outdated keyboards, and flickering monitors were mentioned in the complaint list.',
	'Our supervisor, who is typically even-tempered, sounded disappointed during today’s briefing.',
	'May I ask where I can submit a formal request for quieter workspaces?',
	'The constant notifications are getting on everyone’s nerves, so silent mode was activated.',
	'Satisfied and relieved, the team celebrated once the bug had been fixed.',
];

// mezclar el orden de las oraciones y tomar 5 primeras
const sentences = sentencesStack.sort(() => Math.random() - 0.5).slice(0, 5);
console.log(sentences); // TODO: Eliminar esto en producción

const shuffled = sentences.map((s) => s.split(' ').sort(() => Math.random() - 0.5));

export const Grammar = () => {
	const total = sentences.length;
	const [step, setStep] = useState(0);
	const [dock, setDock] = useState(shuffled[0]);
	const [placed, setPlaced] = useState([]);
	const [verified, setVerified] = useState(false);
	const [results, setResults] = useState([]);
	const [finished, setFinished] = useState(false);
	const [score, setScore] = useState(0);
	const { user } = useAuth(); // 5 ejercicios x 20 pts

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
		const correctArr = correctSentence.split(' ');
		let correctCount = 0;
		for (let i = 0; i < correctArr.length; i++) {
			if (placed[i] === correctArr[i]) correctCount++;
		}
		// Calcular la puntuación del ejercicio en base a respuestas correctas parciales
		// Cada ejercicio vale 20 puntos como máximo
		const exerciseScore = Math.round((correctCount / correctArr.length) * 20);
		// Se marca como correcto solo si todas las palabras están en la posición correcta
		setScore((prev) => prev + exerciseScore);
		setResults([
			...results,
			{
				question: 'Arrange the words to form a correct sentence:',
				userAnswer,
				correctAnswer: correctSentence,
				isCorrect: correctCount === correctArr.length,
				exerciseScore,
				correctCount,
				totalWords: correctArr.length,
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
	const handleFinish = async () => {
		setFinished(true);

		if (user && user.id) {
			await fetch(`${API_URL}/user/game-history`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: user.id,
					game: 'Grammar Challenge',
					score: score,
				}),
			});
		}
	};

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
	const accuracy = results.length > 0 ? Math.round((correctAnswers.length / results.length) * 100) : 0;

	const getPerformanceLevel = (score) => {
		if (score >= 90) return { level: "Excellent", color: "text-green-600", bg: "bg-green-100" };
		if (score >= 75) return { level: "Good", color: "text-blue-600", bg: "bg-blue-100" };
		if (score >= 60) return { level: "Fair", color: "text-yellow-600", bg: "bg-yellow-100" };
		return { level: "Needs Practice", color: "text-gray-600", bg: "bg-gray-100" };
	};

	const performance = getPerformanceLevel(score);

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
				<div className='text-4xl sm:text-5xl font-bold text-blue-600 mb-2'>{score}</div>

				{/* Nivel de rendimiento */}
				<div className={`inline-block px-4 py-2 rounded-full font-semibold ${performance.bg} ${performance.color}`}>
					{performance.level}
				</div>
			</div>

			{/* Estadísticas detalladas */}
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
				<div className='bg-gray-50 p-4 rounded-lg text-center'>
					<div className='text-2xl font-bold text-gray-800'>{correctAnswers.length}/{results.length}</div>
					<div className='text-sm text-gray-600'>Correct Sentences</div>
				</div>
				<div className='bg-gray-50 p-4 rounded-lg text-center'>
					<div className='text-2xl font-bold text-gray-800'>{accuracy}%</div>
					<div className='text-sm text-gray-600'>Accuracy Rate</div>
				</div>
				<div className='bg-gray-50 p-4 rounded-lg text-center'>
					<div className='text-2xl font-bold text-gray-800'>{results.length}</div>
					<div className='text-sm text-gray-600'>Total Exercises</div>
				</div>
			</div>

			<p className='text-gray-600 text-center mb-8 sm:mb-10'>
				Let's review your grammar performance. Use this feedback to improve your sentence construction skills.
			</p>

			<div className='space-y-8'>
				{/* Sección de respuestas correctas */}
				{correctAnswers.length > 0 && (
					<section>
						<h2 className='text-xl sm:text-2xl font-bold text-green-700 mb-4 flex items-center'>
							<span className='bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg'>✓</span>
							Correct Sentences ({correctAnswers.length})
						</h2>
						<div className='space-y-3'>
							{correctAnswers.map((r, i) => (
								<div key={i} className='p-4 bg-green-50 border border-green-200 rounded-lg'>
									<div className='flex items-start gap-3'>
										<div className='flex-shrink-0 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm'>
											{results.indexOf(r) + 1}
										</div>
										<div>
											<p className='font-semibold text-gray-900 mb-1'>"{r.correctAnswer}"</p>
											<p className='text-sm text-gray-600'>
												Your arrangement: <span className='font-medium text-green-700'>"{r.userAnswer}"</span>
											</p>
											<div className='flex gap-4 text-xs text-gray-500 mt-1'>
												<span>Words: {r.totalWords}</span>
												<span>Score: {r.exerciseScore}/20</span>
											</div>
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
											<p className='font-semibold text-gray-900 mb-1'>Correct: "{r.correctAnswer}"</p>
											<p className='text-sm text-gray-600 mb-2'>
												Your attempt: <span className='font-medium text-blue-700'>"{r.userAnswer}"</span>
											</p>
											<div className='flex gap-4 text-xs text-gray-500 mb-2'>
												<span>Correct words: {r.correctCount}/{r.totalWords}</span>
												<span>Score: {r.exerciseScore}/20</span>
											</div>
											<p className='text-xs text-blue-700 bg-blue-50 p-2 rounded border-l-2 border-blue-300'>
												💡 Tip: Pay attention to sentence structure, word order, and grammar rules. Practice with similar sentence patterns.
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
					{score >= 90 && "🎉 Outstanding! Your grammar skills are excellent. Keep up the great work!"}
					{score >= 75 && score < 90 && "👏 Good job! You're showing strong grammar understanding. A little more practice and you'll be perfect!"}
					{score >= 60 && score < 75 && "💪 You're making progress! Focus on sentence structure and word order to improve your results."}
					{score < 60 && "🎯 Keep practicing! Grammar takes time to master. Review the feedback and try again."}
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
