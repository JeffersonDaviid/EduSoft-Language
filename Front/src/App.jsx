import { Outlet, useNavigate } from 'react-router';
import { Footer } from './components/Footer';
import PrivateNavbar from './components/PrivateNavbar';
import PublicNavbar from './components/PublicNavbar';
import { useAuth } from './context/AuthContext';
import { useFontSize } from './context/FontSizeContext';
import { useEffect } from 'react';

const App = () => {
	const { isAuthenticated } = useAuth();
	const { fontSize } = useFontSize();
	const navigate = useNavigate();

	useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'h') {
                e.preventDefault();
                navigate('/home');
            }
			if (e.ctrlKey && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            navigate('/about');
        	}
			if (e.ctrlKey && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            navigate('/accessibility');
        	}
			if (!isAuthenticated) {
				if (e.ctrlKey && e.key.toLowerCase() === 'l') {
					e.preventDefault();
					navigate('/login');
				}
				if (e.ctrlKey && e.key.toLowerCase() === 's') {
					e.preventDefault();
					navigate('/register');
				}
        	}
			if (isAuthenticated) {
				if (e.ctrlKey && e.key.toLowerCase() === 'g') {
					e.preventDefault();
					navigate('/games');
				}
				if (e.ctrlKey && e.key.toLowerCase() === 'p') {
					e.preventDefault();
					navigate('/progress');
				}
				if (e.ctrlKey && e.key.toLowerCase() === 'r') {
					e.preventDefault();
					navigate('/profile');
				}
        	}
            if (e.key === 'Escape') {
                window.dispatchEvent(new Event('closeAllDialogs'));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

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
