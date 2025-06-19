import { Link } from 'react-router';

export const HeaderGame = ({ typeGame, title }) => {
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
					<li className='text-zinc-900 font-medium' aria-current='page'>
						{typeGame}
					</li>
				</ol>
			</nav>
			<div className='w-full pt-4 pb-3'>
				<h1 className='text-neutral-900 text-2xl md:text-3xl font-bold font-lexend leading-tight break-words'>
					{title}
				</h1>
			</div>
		</header>
	);
};
