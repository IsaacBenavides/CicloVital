import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { clipboard, calendar, chatbox } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Home.css';
import Header from '../../components/Header/Header';
import LogoCirculos from '../../assets/svgs/LogoCirculos';

function Home() {
  const history = useHistory();

  return (
    <IonPage className="home-page">
      <Header />
      <IonContent className="home-content" fullscreen>
        
        <section className="home">
          <LogoCirculos className="home-logo" />
          <div className="home-buttons">
            <IonButton
              expand="block"
              color="secondary"
              onClick={() => history.push('/chat')}
              className="try-btn"
            >
              ⬆ Comenzar&#8194;
            </IonButton>
            <IonButton
              expand="block"
              color="secondary"
              className="info-btn"
            >
              ⬇ Conócenos
            </IonButton>
          </div>

          <p className="sub-eslogan">Conecta contigo mismo. Mejora cada día.</p>

          <div className="scroll-down">⬇ Desliza para saber más</div>
        </section>

        <section className="sobreNosotros">
          <div className="info">
            <h1><span className="verde">Sobre Nosotros</span> - CicloVital</h1>

            <p>
              <strong>CicloVital</strong> es una plataforma diseñada para facilitar la interacción entre estudiantes y su estado de ánimo.
            </p>

            <p>
              Incluye funcionalidades como registro de usuarios y chats simulados.
            </p>

            <p>
              <strong>CicloVital</strong> representa una iniciativa académica comprometida con la innovación, el aprendizaje significativo y el uso responsable de las tecnologías para el desarrollo personal y profesional del estudiantado universitario.
            </p>

            <h3 className="verde">Funcionalidades</h3>
            <ul>
              <li><IonIcon icon={clipboard}></IonIcon>  Registro e inicio de sesión de usuario.</li>
              <li><IonIcon icon={calendar}></IonIcon>  Registro diario de tu rutina.</li>
              <li><IonIcon icon={chatbox}></IonIcon>  Interacción con chatbot de IA mediante chats interactivos.</li>
            </ul>
          </div>
        </section>
        
      </IonContent>
    </IonPage>
  );
}

export default Home;
