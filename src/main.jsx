import ReactDOM from 'react-dom/client';
import App from './App';
import { IonReactRouter } from '@ionic/react-router';
import { setupIonicReact } from '@ionic/react';

import '@ionic/react/css/core.css';

setupIonicReact();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
