import ReactDOM from 'react-dom/client';
import App from './App';
import { setupIonicReact } from '@ionic/react';
import { ThemeProvider } from './contexts/ThemeProvider';
import  UserProvider  from './contexts/UserProvider'

import './theme/variables.css';
import '@ionic/react/css/core.css';

setupIonicReact();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ThemeProvider>
);
