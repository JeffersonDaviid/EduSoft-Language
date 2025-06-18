// TapToOrderVerify.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const correctSentence = 'Paola has already visited the Galápagos';
const randomWords = correctSentence.split(' ').sort(() => Math.random() - 0.5);

export const Grammar = () => {
	const [dock, setDock] = useState(randomWords);
	const [sentence, setSentence] = useState([]);
	const [verified, setVerified] = useState(false); // ← nuevo
	const [isCorrect, setIsCorrect] = useState(null); // ← nuevo

	/* ---------- mover palabras ---------- */
	const move = (word, fromDock) => {
		if (verified) return; // bloqueamos si ya finalizó

		if (fromDock) {
			setDock((d) => d.filter((w) => w !== word));
			setSentence((s) => [...s, word]);
		} else {
			setSentence((s) => s.filter((w) => w !== word));
			setDock((d) => [...d, word]);
		}
	};

	/* ---------- verificar ---------- */
	const handleVerify = () => {
		const ok = sentence.join(' ') === correctSentence;
		setIsCorrect(ok);
		setVerified(true);
	};

	const restart = () => {
		setDock(randomWords);
		setSentence([]);
		setVerified(false);
		setIsCorrect(null);
	};

	/* ---------- mini-componente palabra ---------- */
	const WordBtn = ({ w, fromDock }) => (
		<motion.button
			layout
			whileTap={{ scale: 0.9 }}
			onClick={() => move(w, fromDock)}
			disabled={verified} // no se puede mover tras verificar
			className='px-3 py-1 m-1 rounded bg-amber-100 shadow hover:bg-amber-200'
		>
			{w}
		</motion.button>
	);

	/* ---------- render ---------- */
	return (
		<section className='p-2 sm:p-4 space-y-4 sm:space-y-6 w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto select-none'>
			{/* Zona Oración */}
			<div className='border p-2 min-h-[3rem] rounded flex flex-wrap gap-2 bg-white shadow-sm'>
				{sentence.map((w) => (
					<WordBtn key={w} w={w} fromDock={false} />
				))}
			</div>

			{/* Zona Dock */}
			<div className='border p-2 rounded flex flex-wrap gap-2 bg-slate-50 shadow-sm'>
				{dock.map((w) => (
					<WordBtn key={w} w={w} fromDock={true} />
				))}
			</div>

			{/* Botones de control */}
			<div className='flex flex-col sm:flex-row gap-2 sm:gap-3 w-full justify-center items-center'>
				<button
					onClick={handleVerify}
					disabled={verified || sentence.length === 0}
					className='bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto disabled:opacity-40 transition-colors duration-150 focus:outline-2 focus:outline-green-700'
				>
					Verificar / Finalizar
				</button>

				<button
					onClick={restart}
					className='bg-neutral-500 text-white px-4 py-2 rounded w-full sm:w-auto transition-colors duration-150 focus:outline-2 focus:outline-neutral-700'
				>
					Reiniciar
				</button>
			</div>

			{/* Mensaje final */}
			{verified && (
				<p
					className={`font-semibold text-center text-base sm:text-lg ${
						isCorrect ? 'text-emerald-600' : 'text-red-600'
					}`}
				>
					{isCorrect
						? '¡Correcto! 🎉 Has completado la oración.'
						: 'La oración no es correcta. Intenta de nuevo.'}
				</p>
			)}
		</section>
	);
};
