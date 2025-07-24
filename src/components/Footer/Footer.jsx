import { IonFooter, IonIcon} from '@ionic/react'
import { logoFacebook, logoTwitter, logoInstagram, logoLinkedin } from 'ionicons/icons'
import LogoCirculos from '../../assets/svgs/LogoCirculos'
import './Footer.css';

const Footer = () => {

  return (
    <IonFooter className='footer-container'>
        <div className='footer-logo'>
            <LogoCirculos />
        </div>
        <p className='footer-copy'>© 2025 CicloVital. Todos los derechos reservados.</p>
        <div className='footer-right'>
            <div className='footer-icons'>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <IonIcon color='primary' icon={logoFacebook} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <IonIcon color='primary' icon={logoTwitter} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <IonIcon color='primary' icon={logoInstagram} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <IonIcon color='primary' icon={logoLinkedin} />
            </a>
            </div>
        </div>
    </IonFooter>
  )
}

export default Footer