// ClozeExplorerB2.jsx
import { useState } from 'react';

const text = `Although Ecuador is famous for its {0}, many university students are 
still unaware of the {1} available close to home. The Universidad de Cuenca 
{2} launched a summer field course in the Andean páramo that allows participants 
to collect data on water quality while practising their English. The project 
was designed by a group of biology {3} who realised that hands-on activities 
motivate learners far more than traditional lectures. During the course, each 
student is paired with a mentor and must prepare a short report, which is later 
shared at an open science fair. This experience not only strengthens academic 
skills but also promotes {4} tourism in the nearby communities.`;

const answers = ['biodiversity', 'opportunities', 'recently', 'lecturers', 'responsible'];
const distractors = ['landscape', 'students', 'careless'];

export const Reading = () => {
	const [choices] = useState(() =>
		[...answers, ...distractors].sort(() => Math.random() - 0.5)
	);
	const [blanks, setBlanks] = useState(Array(5).fill(''));
	const [checked, setChecked] = useState(false);

	const handleSelect = (idx, value) =>
		setBlanks((prev) => prev.map((v, i) => (i === idx ? value : v)));

	const verify = () => setChecked(true);
	const reset = () => {
		setBlanks(Array(5).fill(''));
		setChecked(false);
	};

	const feedbackColor = (idx) =>
		!checked ? '' : blanks[idx] === answers[idx] ? 'bg-green-100' : 'bg-red-100';

	return (
		<section className='p-6 max-w-2xl mx-auto space-y-6'>
			<h2 className='text-lg font-semibold'>
				Cloze Explorer – Energía Solar en los Andes
			</h2>

			{/* Texto con selects */}
			<div className='leading-relaxed'>
				{text.split(/(\{[0-4]\})/g).map((seg, i) => {
					const m = seg.match(/\{(\d)\}/);
					if (!m) return seg;
					const idx = Number(m[1]);
					return (
						<select
							key={i}
							value={blanks[idx]}
							onChange={(e) => handleSelect(idx, e.target.value)}
							disabled={checked}
							className={`mx-1 border rounded px-2 ${feedbackColor(idx)}`}
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

			{/* Controles */}
			<div className='flex gap-4'>
				<button
					onClick={verify}
					disabled={checked || blanks.includes('')}
					className='bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-40'
				>
					Verificar lectura
				</button>
				<button onClick={reset} className='bg-neutral-500 text-white px-4 py-2 rounded'>
					Reiniciar
				</button>
			</div>

			{/* Feedback */}
			{checked && (
				<p
					className={`font-semibold ${
						blanks.every((w, i) => w === answers[i]) ? 'text-emerald-600' : 'text-red-600'
					}`}
				>
					{blanks.every((w, i) => w === answers[i])
						? '¡Excelente! Completaste correctamente el texto. 🎉'
						: 'Hay errores marcados en rojo. Revisa el contexto y vuelve a intentarlo.'}
				</p>
			)}
		</section>
	);
};
