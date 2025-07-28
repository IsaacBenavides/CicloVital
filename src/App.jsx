import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import SingUp from './pages/SingUp/SingUp';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import './App.css';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" component={Home} />
          <Route path="/singup" component={SingUp} />
          <Route path="/login" component={Login} />
          <Route path="/settings" component={Settings} />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;