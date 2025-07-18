import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Chat from './pages/Chat'; 
import './App.css';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chat" component={Chat} />
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;