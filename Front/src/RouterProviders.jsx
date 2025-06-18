import { HashRouter, Route, Routes } from 'react-router';
import App from './App';
import { GamesHome } from './pages/games/GamesHome';
import { Grammar } from './pages/games/grammar/Grammar';
import { Listen } from './pages/games/listen/Listen';
import { Speak } from './pages/games/speak/Speak';
import { Vocabulary } from './pages/games/vocabulary/Vocabulary';
import { Write } from './pages/games/write/Write';
import { HomeUser } from './pages/HomeUser';
import { Profile } from './pages/profile/Profile';
import { UpdateProfile } from './pages/profile/UpdateProfile';
import { Progress } from './pages/Progress';
import { About } from './pages/public/About';
import { Login } from './pages/public/auth/Login';
import { Register } from './pages/public/auth/Register';
import { Home } from './pages/public/Home';
import { useEffect, useState } from 'react';

const RouterProviders = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	return (
		<HashRouter>
			<Routes>
				<Route element={<App isAuthenticated={isAuthenticated} />}>
					<Route index element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='register' element={<Register />} />
					<Route path='login' element={<Login />} />

					<Route path='home' element={<HomeUser />} />
					<Route path='progress' element={<Progress />} />
					<Route path='profile'>
						<Route index element={<Profile />} />
						<Route path='update' element={<UpdateProfile />} />
					</Route>
					<Route path='games'>
						<Route index element={<GamesHome />} />
						<Route path='grammar' element={<Grammar />} />
						<Route path='vocabulary' element={<Vocabulary />} />
						<Route path='write' element={<Write />} />
						<Route path='speak' element={<Speak />} />
						<Route path='listen' element={<Listen />} />
					</Route>
				</Route>
			</Routes>
		</HashRouter>
	);
};

export default RouterProviders;
