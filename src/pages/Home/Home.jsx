import './Home.css';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { clipboard, calendar, chatbox } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import LogoCirculos from '../../assets/svgs/LogoCirculos';
import { useRef } from 'react';
import Footer from '../../components/Footer/Footer';

function Home() {
  const history = useHistory();

  const sobrenosotrosRef = useRef(null);

  const scrollToSobreNosotros = () => {
    if (sobrenosotrosRef.current) {
      sobrenosotrosRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <IonPage className="app-wrapper">
      <Header />
      <IonContent className="main-content" >

        <section className="home">
          <LogoCirculos />
          <div className="home-buttons">
            <IonButton
              expand="block"
              color="secondary"
              onClick={() => history.push('/login')}
              className="try-btn"
            >
              ⬆ Comenzar&#8194;
            </IonButton>
            <IonButton
              expand="block"
              color="secondary"
              className="info-btn"
              onClick={scrollToSobreNosotros}
            >
              ⬇ Conócenos
            </IonButton>
          </div>

          <p className="sub-eslogan">Conecta contigo mismo. Mejora cada día.</p>

          <div className="scroll-down">⬇ Desliza para saber más</div>
        </section>

        <section className="sobreNosotros" ref={sobrenosotrosRef}>
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
        <Footer />
      </IonContent>
    </IonPage>
  );
}

export default Home;
