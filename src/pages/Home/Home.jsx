import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import Header from '../../components/Header';
import logo from '../../assets/images/logo.png'; 

function Home() {
  const history = useHistory();

  return (
    <IonPage className="home-page">
      <Header />
      <IonContent className="home-content" fullscreen>
        
        <section className="hero">
          <img src={logo} alt="Logo CicloVital" className="home-logo" />

          <div className="hero-buttons">
            <IonButton
            expand="block"
            color="secondary"
            onClick={() => history.push('/chat')}
            className="try-btn"
          >
            ⬆ Comenzar
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
              <li>Registro e inicio de sesión de usuario.</li>
              <li>Registro diario de tu rutina.</li>
              <li>Interacción con chatbot de IA mediante chats interactivos.</li>
            </ul>
          </div>
        </section>
        
      </IonContent>
    </IonPage>
  );
}

export default Home;
