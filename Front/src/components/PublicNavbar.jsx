import { Link } from 'react-router';

const PublicNavbar = () => (
	<nav className='bg-primary text-white p-2 flex gap-4'>
		<Link to='/'>Home</Link>
		<Link to='/about'>About</Link>
		<Link to='/register'>Sign up</Link>
		<Link to='/login'>Login</Link>
	</nav>
);

export default PublicNavbar;
