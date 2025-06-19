import { Link } from 'react-router';

export const GameDescription = ({
	title,
	description,
	img,
	setSelectedGame,
	link,
	enable,
}) => {
	return (
		<section className='w-full max-w-4xl mx-auto flex flex-col gap-4 md:gap-6 p-2 md:p-4'>
			<header className='w-full flex flex-col gap-2 md:gap-3 px-2 md:px-4'>
				<h1 className='text-neutral-900 text-2xl md:text-3xl lg:text-4xl font-bold font-lexend leading-tight break-words'>
					{title}
				</h1>
				<p className='text-slate-500 text-sm md:text-base font-normal font-lexend leading-tight'>
					{description}
				</p>
			</header>
			<div className='w-full flex justify-center items-center bg-neutral-50 rounded-xl overflow-hidden p-2 md:p-4'>
				<img
					src={img}
					alt={`Preview for ${title}`}
					className='w-full max-w-[928px] h-auto md:h-[50vh] rounded-xl object-cover shadow-sm'
				/>
			</div>
			<div className='w-full flex flex-col sm:flex-row gap-3 justify-center items-center px-2 md:px-4'>
				{enable ? (
					<Link
						to={link}
						className='w-full sm:w-40 h-12 px-5 bg-blue-500 rounded-3xl flex justify-center items-center text-neutral-50 text-base font-bold font-lexend leading-normal shadow-md hover:bg-blue-600 focus:outline-2 focus:outline-blue-700 transition-colors duration-150'
						aria-label='Play this game'
					>
						Play
					</Link>
				) : (
					<p className='text-base font-lexend text-green-500'>Coming Soon</p>
				)}
				<button
					className='w-full sm:w-40 h-10 px-4 bg-slate-200 cursor-pointer rounded-2xl flex justify-center items-center text-neutral-900 text-sm font-bold font-lexend leading-tight hover:bg-slate-300 focus:outline-2 focus:outline-blue-700 transition-colors duration-150'
					aria-label='Browse other games'
					onClick={() => setSelectedGame(null)}
				>
					Browse Other Games
				</button>
			</div>
		</section>
	);
};
