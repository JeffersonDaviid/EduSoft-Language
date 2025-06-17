import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import RouterProviders from './RouterProviders.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProviders>
			<App />
		</RouterProviders>
	</StrictMode>
);
