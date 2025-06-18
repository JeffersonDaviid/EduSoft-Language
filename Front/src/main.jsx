import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import RouterProviders from './RouterProviders.jsx';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthProvider>
			<RouterProviders>
				<App />
			</RouterProviders>
		</AuthProvider>	
	</StrictMode>
);
