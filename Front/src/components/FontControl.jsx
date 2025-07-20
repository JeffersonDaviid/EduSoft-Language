import { useFontSize } from '../context/FontSizeContext';

const FontControls = () => {
	const { increaseFont, decreaseFont } = useFontSize();

	return (
		<div className='flex items-center gap-2' role='group' aria-label='Font size controls'>
			<span className='text-sm text-[#57788f] font-medium mr-2' tabIndex={0}>Text size:</span>
			<button
				onClick={decreaseFont}
				className='w-8 h-8 flex items-center justify-center rounded-full bg-[#e8edf2] text-[#0f141a] hover:bg-[#d1dee8] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-150 text-sm font-medium'
				title='Decrease text size'
				aria-label='Decrease text size'
			>
				A-
			</button>
			<button
				onClick={increaseFont}
				className='w-8 h-8 flex items-center justify-center rounded-full bg-[#e8edf2] text-[#0f141a] hover:bg-[#d1dee8] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-150 text-sm font-medium'
				title='Increase text size'
				aria-label='Increase text size'
			>
				A+
			</button>
		</div>
	);
};

export default FontControls;
