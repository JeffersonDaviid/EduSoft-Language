import { Link } from 'react-router';

export const GameEnd = () => {
	return (
		<section className='w-full max-w-2xl mx-auto flex flex-col gap-4 md:gap-6 p-2 md:p-6 items-center'>
			<header className='w-full flex flex-col items-center gap-2 px-2 md:px-4'>
				<h1 className='text-center text-zinc-900 text-2xl md:text-3xl font-bold font-lexend leading-9 mb-1'>
					Correct! Well done!
				</h1>
				<p className='text-center text-zinc-900 text-base md:text-lg font-normal font-lexend leading-normal'>
					You've successfully identified the correct sentence. Keep up the great work!
				</p>
			</header>
			<div className='w-full flex justify-center items-center bg-slate-50 rounded-xl overflow-hidden p-2 md:p-4'>
				<img
					src='https://placehold.co/879x335'
					alt='Celebratory illustration for correct answer'
					className='w-full max-w-[879px] h-auto rounded-xl object-cover shadow-sm'
				/>
			</div>
			<div className='w-full flex justify-center items-center px-2 md:px-4'>
				<Link
					to='../'
					className='w-full sm:w-40 h-10 px-4 bg-sky-400 rounded-2xl flex justify-center items-center text-zinc-900 text-sm font-bold font-lexend leading-tight hover:bg-sky-500 focus:outline-2 focus:outline-blue-700 transition-colors duration-150'
					aria-label='Finish and return'
				>
					Finish
				</Link>
			</div>
		</section>
	);
};
