import { Link } from 'react-router';

const PrivateNavbar = () => (
	<nav className='bg-primary text-white p-2 flex gap-4'>
		<Link to='/home'>Home</Link>
		<Link to='/games'>Games</Link>
		<Link to='/progress'>Progress</Link>
		<Link to='/profile'>Profile</Link>
		<Link to='/about'>About</Link>
	</nav>
);

export default PrivateNavbar;
