import { Outlet } from 'react-router';
import PrivateNavbar from './components/PrivateNavbar';
import PublicNavbar from './components/PublicNavbar';
import { Footer } from './components/Footer';

const App = ({ isAuthenticated }) => (
	<>
		{isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
		<main>
			<Outlet />
		</main>
		<Footer />
	</>
);

export default App;
