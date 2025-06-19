import { motion } from 'framer-motion';
import { useState } from 'react';
import { HeaderGame } from '../../../components/HeaderGame';
import { GameEnd } from '../GameEnd';

/* -------- 3 oraciones B2 -------- */
const sentences = [
	'Paola has already visited the Galápagos',
	'Quito University will launch a new research hub next semester',
	'If students recycle properly, the campus will stay cleaner',
];
const shuffled = sentences.map((s) => s.split(' ').sort(() => Math.random() - 0.5));

export const Grammar = () => {
	const total = sentences.length;
	const [step, setStep] = useState(0);
	const [dock, setDock] = useState(shuffled[0]);
	const [placed, setPlaced] = useState([]);
	const [verified, setVerified] = useState(false);
	const [completed, setComp] = useState(0);
	const [finished, setFin] = useState(false);

	const correctArr = sentences[step].split(' ');
	const progressPct = Math.round((completed / total) * 100);

	/* --- mover palabras --- */
	const move = (w, fromDock) => {
		if (verified) return;
		fromDock
			? (setDock(dock.filter((x) => x !== w)), setPlaced([...placed, w]))
			: (setPlaced(placed.filter((x) => x !== w)), setDock([...dock, w]));
	};

	/* --- acciones --- */
	const verify = () => {
		setVerified(true);
		setComp((c) => c + 1);
	};
	const next = () => {
		setStep((s) => s + 1);
		setDock(shuffled[step + 1]);
		setPlaced([]);
		setVerified(false);
	};
	const finish = () => setFin(true);

	/* --- estilos palabra tras verificar --- */
	const wordStyle = (i) => {
		if (!verified) return 'bg-white';
		return placed[i] === correctArr[i] ? 'bg-green-300' : 'bg-red-300';
	};

	/* --- botón palabra --- */
	const Word = ({ w, fromDock, idx }) => (
		<motion.button
			layout
			whileTap={{ scale: 0.9 }}
			disabled={verified}
			onClick={() => move(w, fromDock)}
			className={`${wordStyle(idx)} px-3 py-1 m-1 rounded shadow`}
		>
			{w}
		</motion.button>
	);

	/* --- FIN --- */
	if (finished) return <GameEnd />;

	/* --- UI principal --- */
	return (
		<section className='max-w-2xl mx-auto p-4 sm:p-6 space-y-6 select-none'>
			<HeaderGame typeGame={'Grammar'} title={'Arrange the words in order'} />
			{/* barra de progreso */}
			<div className='w-full bg-gray-200 rounded h-3'>
				<div
					className='h-3 bg-green-500 rounded transition-all'
					style={{ width: `${progressPct}%` }}
				/>
			</div>
			<p className='text-sm text-right'>{progressPct}%</p>

			{/* oración armada */}
			<div className='w-full border-2 border-green-400 rounded-xl flex flex-wrap  gap-0 bg-gradient-to-r from-green-50 via-green-100 to-green-50 shadow-inner py-4 px-2 min-h-[56px] transition-all duration-300'>
				{placed.map((w, i) => (
					<span key={w + i} className='inline-flex items-center'>
						<Word w={w} fromDock={false} idx={i} />
						{/* corrección en línea si está mal */}
						{verified && placed[i] !== correctArr[i] && (
							<span className='ml-1 italic text-green-700 text-sm'>{correctArr[i]}</span>
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
						onClick={verify}
						disabled={placed.length === 0}
						className='bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-40 transition-colors duration-150'
					>
						Verify
					</button>
				)}

				{verified && step < total - 1 && (
					<button
						onClick={next}
						className='bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition-colors duration-150'
					>
						Next ➔
					</button>
				)}

				{verified && step === total - 1 && (
					<button
						onClick={finish}
						className='bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900 transition-colors duration-150'
					>
						Finish
					</button>
				)}
			</div>
			{/* feedback general */}
			{verified && (
				<p
					className={`font-semibold text-center text-base sm:text-lg mt-2 ${
						placed.join(' ') === correctArr.join(' ') ? 'text-green-600' : 'text-red-600'
					}`}
				>
					{placed.join(' ') === correctArr.join(' ')
						? 'Great! The sentence is correct.'
						: 'Some words are in the wrong place — see corrections above.'}
				</p>
			)}
		</section>
	);
};
