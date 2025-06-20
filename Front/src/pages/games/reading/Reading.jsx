import { useState, useEffect } from 'react';
import { HeaderGame } from '../../../components/HeaderGame';
import { useAuth } from '../../../context/AuthContext';

const passages = [
	{
		text: `Although Ecuador is famous for its {0}, many university students are
           still unaware of the {1} available close to home. The Universidad de
           Cuenca {2} launched a summer field course in the Andean páramo that allows
           participants to collect data on water quality while practising their English.
           The project was designed by a group of biology {3} who realised that hands-on
           activities motivate learners far more than traditional lectures. During the
           course, each student is paired with a mentor and must prepare a short report,
           which is later shared at an open science fair. This experience not only
           strengthens academic skills but also promotes {4} tourism in the nearby
           communities.`,
		answers: ['biodiversity', 'opportunities', 'recently', 'lecturers', 'responsible'],
		distractors: ['landscape', 'students', 'careless'],
	},
	{
		text: `The city of {0} has become a living laboratory for architecture students
           who analyse how colonial buildings withstand frequent {1}. While attending a
           workshop organised by the Universidad Central, participants must propose
           strategies that respect the original {2} yet improve safety. Their findings
           are later presented to local {3}, which often adopt the ideas in community
           projects. This collaboration encourages sustainable urban planning and gives
           students valuable {4} experience before graduation.`,
		answers: ['Cuenca', 'earthquakes', 'design', 'authorities', 'professional'],
		distractors: ['volcanoes', 'tourists', 'temporary'],
	},
	{
		text: `During lockdown, many Ecuadorian universities accelerated the use of open
           educational resources, a trend that {0} benefited rural learners. One example
           is a virtual laboratory that simulates chemical {1} with minimal bandwidth.
           Students located in remote areas of {2} province can now repeat experiments
           until they fully {3} the concepts, which would have been impossible in a
           traditional setting. Lecturers report that overall student {4} has improved
           since the platform was introduced.`,
		answers: ['particularly', 'reactions', 'Esmeraldas', 'grasp', 'performance'],
		distractors: ['machinery', 'attendance', 'Galápagos'],
	},
];

export const Reading = () => {
	const total = passages.length;
	const [idx, setIdx] = useState(0);
	const [blanks, setBlanks] = useState([]);
	const [verified, setVerified] = useState(false);
	const [alert, setAlert] = useState('');
	const [results, setResults] = useState([]);
	const [score, setScore] = useState(0);
	const [finished, setFinished] = useState(false);
	const { user } = useAuth();

	const current = passages[idx];
	const choices = [...current.answers, ...current.distractors].sort(
		() => Math.random() - 0.5
	);

	// al cambiar de lectura, reinicia
	useEffect(() => {
		setBlanks(Array(current.answers.length).fill(''));
		setVerified(false);
		setAlert('');
	}, [idx]);

	// helpers
	const allFilled = blanks.every((w) => w !== '');
	const allCorrect = blanks.every((w, i) => w === current.answers[i]);

	const selectWord = (i, val) =>
		setBlanks((b) => {
			const copy = [...b];
			copy[i] = val;
			return copy;
		});

	const handleVerify = () => {
		if (!allFilled) {
			setAlert('Please complete all spaces before checking.');
			return;
		}
		setVerified(true);

		/* se crea un resultado POR LECTURA */
		const readingResult = {
			idx: idx,
			text: current.text,
			userAnswers: [...blanks],
			correctAnswers: [...current.answers],
			isCorrect: allCorrect, // sigue siendo incorrecta si hay alguna errónea
		};
		setResults((prev) => [...prev, readingResult]);

		// Calcular el score usando una variable temporal para incluir crédito parcial
		const tempResults = [...results, readingResult];
		const totalTempScore = tempResults.reduce((acc, r) => {
			const maxPoints = 100 / passages.length;
			// Calcula cuántas respuestas fueron correctas
			const numCorrect = r.userAnswers.reduce(
				(count, ans, i) => (ans === r.correctAnswers[i] ? count + 1 : count),
				0
			);
			// Si se escogió al menos una correcta, se asigna crédito parcial,
			// pero la lectura se marca como incorrecta si alguna falla.
			const points =
				numCorrect > 0 ? (numCorrect / r.correctAnswers.length) * maxPoints : 0;
			return acc + points;
		}, 0);

		setScore(Math.round(totalTempScore));
	};

	const handleNext = () => {
		setIdx((i) => i + 1);
	};

	/* ---------- Finish ---------- */
	const handleFinish = async () => {
		// score ya está calculado en state «score»
		if (user?.id) {
			await fetch('http://localhost:8080/user/game-history', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: user.id,
					game: 'Reading',
					score,
				}),
			});
		}
		setFinished(true);
	};

	// UI final
	if (finished)
		return (
			<GameResumeDetails
				results={results} // [{index, text, userAnswers, correctAnswers, isCorrect}, …]
				score={score} // 0-100
				onPlayAgain={() => window.location.reload()}
			/>
		);

	// UI principal
	return (
		<section className='max-w-2xl mx-auto p-6 space-y-6'>
			<HeaderGame
				typeGame='Reading'
				title='Choose the correct word'
				currentStep={idx + 1}
				totalSteps={total}
				score={score}
			/>

			<div className='leading-relaxed'>
				{current.text.split(/(\{\d\})/g).map((seg, k) => {
					const m = seg.match(/\{(\d)\}/);
					if (!m) return seg;

					const i = Number(m[1]);
					const filled = blanks[i];
					const correct = current.answers[i];
					const wrong = verified && filled !== correct;

					return (
						<span key={k} className='inline-flex items-center'>
							<select
								value={filled}
								disabled={verified}
								onChange={(e) => selectWord(i, e.target.value)}
								className={`mx-1 border rounded px-2 ${
									verified && filled === correct
										? 'bg-green-100'
										: wrong
										? 'bg-red-100'
										: ''
								}`}
							>
								<option value=''>___</option>
								{choices.map((c) => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>

							{/* 💡 Corrección visible al verificar si estaba mal */}
							{wrong && (
								<span className='text-emerald-700 text-sm italic ml-1'>{correct}</span>
							)}
						</span>
					);
				})}
			</div>

			{/* Aviso faltan espacios */}
			{alert && !verified && <p className='text-red-600 text-sm'>{alert}</p>}

			{/* Botonera */}
			{/* Botonera */}
			<div className='flex gap-4'>
				{!verified && (
					<button
						onClick={handleVerify}
						className='bg-blue-600 text-white px-4 py-2 rounded'
					>
						Verify
					</button>
				)}

				{verified && idx < total - 1 && (
					<button
						onClick={handleNext}
						className='bg-emerald-600 text-white px-4 py-2 rounded'
					>
						Next ➔
					</button>
				)}

				{verified && idx === total - 1 && (
					<button
						onClick={handleFinish}
						className='bg-neutral-700 text-white px-4 py-2 rounded'
					>
						Finish
					</button>
				)}
			</div>
		</section>
	);
};

import { Link } from 'react-router';

const ReadingCard = ({ idx, text, userAnswers, correctAnswers, isCorrect }) => {
	const badge = isCorrect ? '✓' : '✗';
	const badgeColor = isCorrect ? 'text-green-600' : 'text-red-600';

	return (
		<div
			className={`p-4 flex flex-col gap-2 rounded-lg sm:bg-gray-50 sm:border sm:border-gray-200`}
		>
			{/* Encabezado */}
			<div className='flex items-center gap-3 mb-2'>
				<span
					className={`flex-shrink-0 bg-gray-200 ${badgeColor} rounded-full h-8 w-8 flex items-center justify-center font-bold`}
				>
					{badge}
				</span>
				<h3 className='font-bold text-gray-800'>Reading {idx + 1}</h3>
			</div>

			{/* Texto con placeholders */}
			<p className='text-black mb-2'>{text}</p>

			{/* Respuestas */}
			<p className='text-sm text-[#57788F]'>
				<span className='font-medium'>Your answers:&nbsp;</span>
				{userAnswers.join(', ')}
			</p>

			{!isCorrect && (
				<p className='text-sm text-[#57788F]'>
					<span className='font-medium'>Correct answers:&nbsp;</span>
					{correctAnswers.join(', ')}
				</p>
			)}
		</div>
	);
};

const GameResumeDetails = ({ results, score, onPlayAgain }) => {
	const correctReadings = results.filter((r) => r.isCorrect);
	const incorrectReadings = results.filter((r) => !r.isCorrect);

	return (
		<div className='w-full max-w-4xl mx-auto my-16 bg-white lg:shadow-2xl rounded-2xl p-4 sm:p-8 md:p-12 text-left'>
			<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center'>
				Review Your Performance
			</h1>

			{/* Puntaje global */}
			<p className='text-3xl sm:text-4xl font-extrabold text-green-600 text-center mb-8'>
				{score} / 100
			</p>

			<p className='text-gray-600 text-center mb-8 sm:mb-10'>
				Let's take a look at how you did. This review will help you understand where you
				excelled and where you might need a bit more practice.
			</p>

			{/* Lecturas correctas */}
			{correctReadings.length > 0 && (
				<section className='space-y-4 mb-8'>
					<h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
						Correct Readings
					</h2>
					{correctReadings.map((r) => (
						<ReadingCard key={r.idx} {...r} />
					))}
				</section>
			)}

			{/* Lecturas con errores */}
			{incorrectReadings.length > 0 && (
				<section className='space-y-4'>
					<h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
						Readings to Review
					</h2>
					{incorrectReadings.map((r) => (
						<ReadingCard key={r.idx} {...r} />
					))}
				</section>
			)}

			{/* Botones */}
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
