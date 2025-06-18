import { Link } from 'react-router';
import logoApp from '../../public/logo.png';
const PublicNavbar = () => (
	<nav className='w-full border-[#e6e8eb] border-solid border-b flex flex-row items-center justify-between py-2 px-4 md:py-3 md:px-10 gap-0 bg-white z-10'>
		<a
			href='/'
			className='w-[110px] md:w-[127px] h-10 flex flex-row items-center justify-start gap-2 md:gap-4'
			aria-label='Go to homepage'
		>
			<img
				className='w-[80px] md:w-[104px] h-[38px] md:h-[49.1px] object-cover'
				alt='Logo'
				src={logoApp}
			/>
			<span className='w-px h-[23px]' aria-hidden='true' />
		</a>
		<ul className='flex-1 flex flex-row items-center justify-end gap-4 md:gap-8 list-none m-0 p-0'>
			<li className='h-10 flex items-center'>
				<Link
					to='/'
					className='relative leading-[21px] font-medium focus:outline-2 focus:outline-[#61a1c9]'
					aria-label='Home'
				>
					Home
				</Link>
			</li>
			<li className='h-10 flex items-center'>
				<Link
					to='/about'
					className='relative leading-[21px] font-medium focus:outline-2 focus:outline-[#61a1c9]'
					aria-label='About us and Help'
				>
					About us/Help
				</Link>
			</li>
			<li className='h-10 flex items-center'>
				<Link
					to='/register'
					className='rounded-[20px] bg-[#61a1c9] h-10 flex items-center justify-center py-0 px-3 md:px-4 min-w-[70px] md:min-w-[84px] max-w-[480px] text-white overflow-hidden text-ellipsis whitespace-nowrap focus:outline-2 focus:outline-white transition-colors duration-150'
					aria-label='Sign up'
				>
					Sign up
				</Link>
			</li>
			<li className='h-10 flex items-center'>
				<Link
					to='/login'
					className='w-[70px] md:w-[84px] rounded-xl bg-[#e8edf2] h-10 flex items-center justify-center py-0 px-3 md:px-4 min-w-[70px] md:min-w-[84px] max-w-[480px] cursor-pointer text-[#0d171c] overflow-hidden text-ellipsis whitespace-nowrap focus:outline-2 focus:outline-[#0d171c] transition-colors duration-150'
					aria-label='Login'
				>
					Login
				</Link>
			</li>
		</ul>
	</nav>
);

export default PublicNavbar;
