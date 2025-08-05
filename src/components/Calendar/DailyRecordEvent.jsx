import './DailyRecordEvent.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText } from '@ionic/react';

const DailyRecordEvent = ({ eventInfo }) => {
  const { horasSueno, ejercicio, energia, estadoAnimo, motivacion, comentario } = eventInfo.event.extendedProps;
  const title = eventInfo.event.title;

  return (
    <IonCard className="ion-registro-card">
      <IonCardHeader color='secundary' className="ion-registro-header">
        <IonCardTitle className="ion-registro-title">{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="ion-registro-content">
        <div className="ion-registro-flex-wrap">
          <IonText>Sueño: <strong>{horasSueno}</strong></IonText>
          <IonText>Ánimo: <strong>{ejercicio}</strong></IonText>
          <IonText>Energía: <strong>{energia}</strong></IonText>
          <IonText>Ánimo: <strong>{estadoAnimo}</strong></IonText>
          <IonText>Motivación: <strong>{motivacion}</strong></IonText>
        </div>
        {comentario && (
          <IonText className="ion-registro-comentario">
            Comentario: {comentario}
          </IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default DailyRecordEvent;