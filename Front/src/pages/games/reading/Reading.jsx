import { useState, useEffect } from 'react';

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
	const [idx, setIdx] = useState(0); // paso actual
	const [blanks, setBlanks] = useState([]);
	const [verified, setVerified] = useState(false);
	const [finished, setFinished] = useState(false);
	const [progress, setProgress] = useState(0); // porcentaje barra
	const [alert, setAlert] = useState(''); // aviso “faltan espacios”

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

	// acciones
	const handleVerify = () => {
		if (!allFilled) {
			setAlert('Por favor completa todos los espacios antes de verificar.');
			return;
		}
		setVerified(true);
		setProgress(((idx + 1) / total) * 100); // 🚀 sube la barra aquí
	};

	const handleNext = () => setIdx((i) => i + 1);

	const handleFinish = () => setFinished(true);

	// UI final
	if (finished)
		return (
			<section className='max-w-xl mx-auto p-8 text-center space-y-4'>
				<h2 className='text-2xl font-bold text-emerald-700'>🎉 ¡Prueba finalizada!</h2>
				<p>¡Gracias por participar!</p>
			</section>
		);

	// UI principal
	return (
		<section className='max-w-2xl mx-auto p-6 space-y-6'>
			{/* Barra de progreso */}
			<div className='w-full bg-neutral-200 rounded h-3'>
				<div
					className='h-3 bg-emerald-600 rounded transition-all'
					style={{ width: `${progress}%` }}
				/>
			</div>
			<p className='text-sm text-right'>{Math.round(progress)}%</p>

			<div className='leading-relaxed'>
				{current.text.split(/(\{\d\})/g).map((seg, k) => {
					const m = seg.match(/\{(\d)\}/);
					if (!m) return seg;
					const i = Number(m[1]);
					const correct = verified && blanks[i] === current.answers[i];
					const wrong = verified && !correct;
					return (
						<select
							key={k}
							value={blanks[i]}
							onChange={(e) => selectWord(i, e.target.value)}
							disabled={verified}
							className={`mx-1 border rounded px-2 ${
								correct ? 'bg-green-100' : wrong ? 'bg-red-100' : ''
							}`}
						>
							<option value=''>___</option>
							{choices.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					);
				})}
			</div>

			{/* Aviso faltan espacios */}
			{alert && !verified && <p className='text-red-600 text-sm'>{alert}</p>}

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
						Next
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

			{/* Feedback tras verificar */}
			{verified && (
				<p
					className={`font-semibold ${allCorrect ? 'text-emerald-600' : 'text-red-600'}`}
				>
					{allCorrect
						? 'Great! All answers are correct.'
						: 'Some answers are incorrect — check the red highlights.'}
				</p>
			)}
		</section>
	);
};
