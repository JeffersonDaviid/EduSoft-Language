import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import RouterProviders from './RouterProviders.jsx';
import { AuthProvider } from './context/AuthContext';
import { FontSizeProvider } from './context/FontSizeContext.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<FontSizeProvider>
			<AuthProvider>
				<RouterProviders>
					<App />
				</RouterProviders>
			</AuthProvider>
		</FontSizeProvider>
	</StrictMode>
);
