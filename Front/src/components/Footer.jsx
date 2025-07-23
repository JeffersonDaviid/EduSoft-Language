import { Link } from 'react-router';


export const Footer = () => {
	return (
		<footer
			className='w-full h-16 px-4 md:pl-12 md:pr-80 py-5 bg-slate-300 flex justify-start items-center gap-2.5'
			role='contentinfo'
		>
			<p
				className='text-black text-xs md:text-sm font-light font-lexend leading-tight text-left w-full'
				tabIndex={0}
				aria-label='Edusoft copyright and developer notice'
			>
				Edusoft © 2025 | All rights reserved | Developed by Edusoft Group 6
			</p>
			<Link
                to='/accessibility'
                className='text-black underline font-medium text-xs md:text-sm hover:text-blue-900 focus:outline-2 focus:outline-blue-700 rounded px-2 py-1 transition-colors duration-150'
                aria-label='Accessibility'
                tabIndex={0}
            >
                Accessibility
            </Link>
		</footer>
	);
};
