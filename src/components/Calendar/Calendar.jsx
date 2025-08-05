import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDailyRecord } from '../../hooks/useDailyRecord';
import RegistroEvento from './DailyRecordEvent';
import DailyRecord from '../DailyRecord/DailyRecord'; // Asegurate de importar
import { IonButton, IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import './Calendar.css';

const Calendar = ({ user, onClose }) => {
  const { getDailyRecord } = useDailyRecord();
  const [eventos, setEventos] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const cargarRegistros = async () => {
      const registros = await getDailyRecord(user.id);
      if (Array.isArray(registros)) {
        const eventosFormateados = registros.map(reg => ({
          id: reg.id,
          title: 'Registro Diarios',
          date: reg.date,
          extendedProps: {
            horasSueno: reg.horasSueno,
            ejercicio: reg.ejercicio,
            energia: reg.energia,
            estadoAnimo: reg.estadoAnimo,
            motivacion: reg.motivacion,
            comentario: reg.comentario
          }
        }));
        setEventos(eventosFormateados);
      }
    };

    cargarRegistros();
  }, [getDailyRecord, user.id]);

  const renderRegistroContent = (eventInfo) => {
    return <RegistroEvento eventInfo={eventInfo} />;
  };

  return (
    <div className="calendar-overlay">
      <div className="calendar-container">
        <div className="calendar-close-button">
          <IonButton size="small" fill="solid" color='danger' onClick={onClose}>
            <IonIcon icon={close} />
          </IonButton>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="100%"
          events={eventos}
          eventContent={renderRegistroContent}
          eventClick={(info) => {
            info.jsEvent.preventDefault();
            setSelectedEvent(info);
          }}
        />

        {selectedEvent && (
          <DailyRecord
            eventInfo={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
