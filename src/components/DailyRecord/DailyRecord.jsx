import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonText
} from '@ionic/react';
import { close } from 'ionicons/icons';
import React from 'react';
import './DailyRecord.css';

const DailyRecord = ({ eventInfo, onClose }) => {
  const { horasSueno, ejercicio, energia, estadoAnimo, motivacion, comentario } = eventInfo.event.extendedProps;

  return (
    <div className="daily-recor-modal-overlay">
      <div className="daily-recor-modal-container">
        {/* Botón de cierre */}
        <div className="daily-recor-modal-close-button">
          <IonButton size="small" fill="solid" color="danger" onClick={onClose}>
            <IonIcon icon={close} />
          </IonButton>
        </div>

        <IonCard>
            <IonCardHeader>
                <IonCardTitle className="ion-text-center ion-padding-bottom">Registro Diarios</IonCardTitle>
            </IonCardHeader>

            <IonCardContent className="daily-recor-content">
                <IonText>Sueño: <strong>{horasSueno}h</strong></IonText>
                <IonText>Ejercicio: <strong>{ejercicio}h</strong></IonText>
                <IonText>Energía: <strong>{energia}</strong></IonText>
                <IonText>Ánimo: <strong>{estadoAnimo}</strong></IonText>
                <IonText>Motivación: <strong>{motivacion}</strong></IonText>

                {comentario && (
                    <IonText className="daily-recor-comentario">
                    Comentario: <em>{comentario}</em>
                    </IonText>
                )}
            </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default DailyRecord;
