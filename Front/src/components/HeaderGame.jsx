import { Link } from 'react-router';

export const HeaderGame = ({
	typeGame,
	title,
	currentStep = -1,
	totalSteps = -1,
	score = -1,
}) => {
	const pct = Math.round((currentStep / totalSteps) * 100);
	return (
		<header className='w-full'>
			<nav aria-label='Breadcrumb' className='w-full pt-4'>
				<ol className='flex flex-wrap items-center gap-2 text-sm md:text-base'>
					<li className='text-slate-500 font-medium'>
						<Link to='../' className='hover:underline'>
							Games
						</Link>
					</li>
					<li className='text-slate-500 font-medium' aria-hidden='true'>
						/
					</li>
					<li className='text-slate-800 font-medium' aria-current='page'>
						{typeGame}
					</li>
				</ol>
			</nav>
			<div className='w-full pt-4 pb-3'>
				<div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-2'>
					<h1 className='text-gray-700 text-2xl md:text-3xl font-bold font-lexend leading-tight break-words'>
						{title}
					</h1>
					<p className='text-xl font-bold text-gray-700'>Score: {score}</p>
				</div>
			</div>
			<div className='w-full flex flex-col gap-1'>
				<label htmlFor='game-progress-bar' className='text-sm text-gray-600 mb-1'>
					Progress
				</label>
				<div className='relative w-full bg-gray-200 rounded h-3 overflow-hidden'>
					<div
						id='game-progress-bar'
						role='progressbar'
						aria-valuenow={pct}
						aria-valuemin={0}
						aria-valuemax={100}
						className='h-3 bg-sky-400 rounded transition-all duration-300'
						style={{ width: `${pct}%` }}
					/>
				</div>
				<p className='text-xs text-left mt-1 text-gray-700'>
					{currentStep} / {totalSteps}
				</p>
			</div>
		</header>
	);
};
