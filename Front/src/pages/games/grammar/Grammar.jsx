import { useState } from 'react';
import { motion } from 'framer-motion';

const sentences = [
	'Paola has already visited the Galápagos',
	'Quito University will launch a new research hub next semester',
	'If students recycle properly, the campus will stay cleaner',
];

const shuffled = sentences.map((s) => s.split(' ').sort(() => Math.random() - 0.5));

export const Grammar = () => {
	const total = sentences.length;

	const [step, setStep] = useState(0); // índice de oración activa
	const [dock, setDock] = useState(shuffled[0]); // palabras sueltas
	const [placed, setPlaced] = useState([]); // palabras ordenadas
	const [checked, setChecked] = useState(false); // ya pulsó Verify
	const [finished, setFinished] = useState(false); // juego concluido
	const [completed, setCompleted] = useState(0); // oraciones verificadas ✔️

	const correctSentence = sentences[step];
	const progress = Math.round((completed / total) * 100); // 🚀 barra

	// mover palabras
	const move = (w, fromDock) => {
		if (checked) return; // bloquea tras Verify
		if (fromDock) {
			setDock(dock.filter((x) => x !== w));
			setPlaced([...placed, w]);
		} else {
			setPlaced(placed.filter((x) => x !== w));
			setDock([...dock, w]);
		}
	};

	// helpers UI
	const isCorrect = placed.join(' ') === correctSentence;

	// acciones
	const verify = () => {
		setChecked(true);
		setCompleted((c) => c + 1); // ⬆️ progreso aquí
	};

	const next = () => {
		const nxt = step + 1;
		setStep(nxt);
		setDock(shuffled[nxt]);
		setPlaced([]);
		setChecked(false);
	};

	const finish = () => setFinished(true);

	// mini-componente btn
	const Word = ({ w, fromDock }) => (
		<motion.button
			layout
			whileTap={{ scale: 0.9 }}
			disabled={checked}
			onClick={() => move(w, fromDock)}
			className='px-3 py-1 m-1 rounded bg-amber-100 shadow hover:bg-amber-200'
		>
			{w}
		</motion.button>
	);

	/* ---------- pantalla final ---------- */
	if (finished) {
		return (
			<section className='max-w-xl mx-auto p-8 text-center space-y-4'>
				<h2 className='text-2xl font-bold text-emerald-700'>
					🎉 ¡Has finalizado el juego de oraciones!
				</h2>
				<p>Gracias por participar.</p>
			</section>
		);
	}

	return (
		<section className='max-w-2xl mx-auto p-6 space-y-6 select-none'>
			{/* Barra de progreso */}
			<div className='w-full bg-neutral-200 rounded h-3'>
				<div
					className='h-3 bg-emerald-600 rounded transition-all'
					style={{ width: `${progress}%` }}
				/>
			</div>
			<p className='text-sm text-right'>{progress}%</p>

			{/* Oración armada */}
			<div className='border p-2 min-h-[3rem] rounded flex flex-wrap'>
				{placed.map((w) => (
					<Word key={w} w={w} fromDock={false} />
				))}
			</div>

			{/* Palabras en Dock */}
			<div className='border p-2 rounded flex flex-wrap bg-slate-50'>
				{dock.map((w) => (
					<Word key={w} w={w} fromDock={true} />
				))}
			</div>

			{/* Botonera */}
			<div className='flex gap-4'>
				{!checked && (
					<button
						onClick={verify}
						disabled={placed.length === 0}
						className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40'
					>
						Verify
					</button>
				)}

				{checked && step < total - 1 && (
					<button onClick={next} className='bg-emerald-600 text-white px-4 py-2 rounded'>
						Next
					</button>
				)}

				{checked && step === total - 1 && (
					<button
						onClick={finish}
						className='bg-neutral-700 text-white px-4 py-2 rounded'
					>
						Finish
					</button>
				)}
			</div>

			{/* Feedback */}
			{checked && (
				<p className={`font-semibold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
					{isCorrect
						? 'Great! The sentence is correct.'
						: 'Oops! The order is not correct.'}
				</p>
			)}
		</section>
	);
};
