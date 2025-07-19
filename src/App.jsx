import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Chat from './pages/Chat';
import Settings from './pages/Settings/Settings';
import './App.css';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/settings" component={Settings} />
          <Route path="/chat" component={Chat} />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;