import { Outlet } from 'react-router';
import { Footer } from './components/Footer';
import PrivateNavbar from './components/PrivateNavbar';
import PublicNavbar from './components/PublicNavbar';
import { useAuth } from './context/AuthContext';
import { useFontSize } from './context/FontSizeContext';

const App = () => {
	const { isAuthenticated } = useAuth();
	const { fontSize } = useFontSize();

	return (
		<div className={`${fontSize}`}>
			{isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
			<main className={`w-full min-h-[calc(100vh-4rem)]`}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default App;
