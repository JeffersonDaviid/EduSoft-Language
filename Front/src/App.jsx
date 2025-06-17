import { Outlet } from 'react-router';
import PrivateNavbar from './components/PrivateNavbar';
import PublicNavbar from './components/PublicNavbar';

const App = ({ isAuthenticated }) => (
	<>
		{isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
		<main>
			<Outlet />
		</main>
	</>
);

export default App;
