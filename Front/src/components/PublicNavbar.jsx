import { useState } from 'react';
import { Link } from 'react-router';

import logoApp from '../../public/logo.png';
import burgerIcon from '../assets/burger-icon.svg';

const navLinks = [
	{ to: '/', label: 'Home', aria: 'Home' },
	{ to: '/about', label: 'About us/Help', aria: 'About us and Help' },
	{ to: '/register', label: 'Sign up', aria: 'Sign up', btn: 'primary' },
	{ to: '/login', label: 'Login', aria: 'Login', btn: 'secondary' },
];

const PublicNavbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className='w-full border-b border-[#e6e8eb] bg-white z-10'>
			<div className='flex items-center justify-between px-4 py-2 md:px-10 md:py-3 max-w-7xl mx-auto'>
				<a
					href='/'
					className='flex items-center gap-2 md:gap-4 min-w-[100px] h-10'
					aria-label='Go to homepage'
				>
					<img
						className='w-[80px] md:w-[104px] h-[38px] md:h-[49.1px] object-cover'
						alt='Logo'
						src={logoApp}
					/>
					<span className='w-px h-[23px]' aria-hidden='true' />
				</a>

				{/* Hamburger for mobile */}
				<button
					className='md:hidden flex items-center justify-center p-2 rounded focus:outline-2 focus:outline-blue-400'
					aria-label={menuOpen ? 'Close menu' : 'Open menu'}
					onClick={() => setMenuOpen((v) => !v)}
				>
					<img src={burgerIcon} alt='Menu' className='w-6 h-6' />
				</button>

				{/* Desktop nav */}
				<ul className='hidden md:flex flex-row items-center gap-4 lg:gap-8 list-none m-0 p-0'>
					{navLinks.map((link) => (
						<li key={link.to} className='h-10 flex items-center'>
							{link.btn === 'primary' ? (
								<Link
									to={link.to}
									className='rounded-[20px] bg-[#397DA7] h-10 flex items-center justify-center px-3 md:px-4 min-w-[70px] md:min-w-[84px] max-w-[480px] text-white overflow-hidden text-ellipsis whitespace-nowrap focus:outline-2 focus:outline-white transition-colors duration-150 font-medium'
									aria-label={link.aria}
								>
									{link.label}
								</Link>
							) : link.btn === 'secondary' ? (
								<Link
									to={link.to}
									className='w-[70px] md:w-[84px] rounded-xl bg-[#e8edf2] h-10 flex items-center justify-center px-3 md:px-4 min-w-[70px] md:min-w-[84px] max-w-[480px] cursor-pointer text-[#0d171c] overflow-hidden text-ellipsis whitespace-nowrap focus:outline-2 focus:outline-[#0d171c] transition-colors duration-150 font-medium'
									aria-label={link.aria}
								>
									{link.label}
								</Link>
							) : (
								<Link
									to={link.to}
									className='relative leading-[21px] font-medium focus:outline-2 focus:outline-[#397DA7] px-2 py-1 rounded transition-colors duration-150'
									aria-label={link.aria}
								>
									{link.label}
								</Link>
							)}
						</li>
					))}
				</ul>
			</div>

			{/* Mobile nav */}
			<ul
				className={`md:hidden flex flex-col items-center gap-2 bg-white border-t border-[#e6e8eb] px-4 py-2 transition-all duration-200 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
					}`}
				aria-label='Navigation menu'
			>
				{navLinks.map((link) => (
					<li key={link.to} className='w-full'>
						{link.btn === 'primary' ? (
							<Link
								to={link.to}
								className='w-full rounded-[20px] bg-[#397DA7] h-10 flex items-center justify-center px-3 min-w-[70px] max-w-[480px] text-white overflow-hidden text-ellipsis whitespace-nowrap focus:outline-2 focus:outline-white transition-colors duration-150 font-medium my-1'
								aria-label={link.aria}
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</Link>
						) : link.btn === 'secondary' ? (
							<Link
								to={link.to}
								className='w-full rounded-xl bg-[#e8edf2] h-10 flex items-center justify-center px-3 min-w-[70px] max-w-[480px] cursor-pointer text-[#0d171c] overflow-hidden text-ellipsis whitespace-nowrap focus:outline-2 focus:outline-[#0d171c] transition-colors duration-150 font-medium my-1'
								aria-label={link.aria}
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</Link>
						) : (
							<Link
								to={link.to}
								className='block w-full relative leading-[21px] font-medium focus:outline-2 focus:outline-[#397DA7] px-2 py-3 rounded transition-colors duration-150 my-1 text-center'
								aria-label={link.aria}
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</Link>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default PublicNavbar;
