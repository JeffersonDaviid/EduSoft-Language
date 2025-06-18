import { Outlet } from 'react-router';
import PrivateNavbar from './components/PrivateNavbar';
import PublicNavbar from './components/PublicNavbar';
import { Footer } from './components/Footer';
import { useAuth } from './context/AuthContext';

const App = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default App;