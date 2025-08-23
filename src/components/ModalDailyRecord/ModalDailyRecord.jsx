import React, { useState } from 'react'
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonItem, IonLabel, IonInput, IonRange, IonNote, IonTextarea, IonFooter,
  IonList,
  IonText,
  IonAlert
} from '@ionic/react'
import { close } from 'ionicons/icons'
import './ModalDailyRecord.css'
import { useDailyRecord } from '../../hooks/useDailyRecord';

const today = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const ModalDailyRecord = ({ isOpen, onClose, user, handleAlert }) => {
  const { createDailyRecord } = useDailyRecord();
  

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    date: today(),
    horasSueno: 8,
    energia: 5,
    estadoAnimo: 5,
    motivacion: 5,
    ejercicio: 0,            
    comentario: "",
    usuario: { id: user.id }
  });

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const onNum = (k, e, min, max) =>
    setField(k, Math.max(min, Math.min(max, Number(e.detail?.value ?? 0))));

  const isValid =
    form.horasSueno >= 0 && form.horasSueno <= 24 &&
    [form.energia, form.estadoAnimo, form.motivacion].every((v) => v >= 0 && v <= 10) &&
    form.ejercicio >= 0 && form.ejercicio <= 600;

  const onSubmit = async () => {
    if (!isValid || saving) return;
    setSaving(true);
    try {
      const res = await createDailyRecord(form);
      if (res.ok) {
        handleAlert(true,"El registro diario se ha guardado correctamente.", "Registro guardado");
        onClose?.();
      } else {
        handleAlert(true, res.messageError, "Registro guardado");
        onClose?.();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="record-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro diario</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList className="record-modal-list" inset lines="full">
          {/* Fecha */}
          <IonItem className="record-modal-date">{/* 👈 className correcto */}
            <IonLabel>Fecha</IonLabel>
            <IonText>{form.date}</IonText>
          </IonItem>

          {/* Horas de sueño */}
          <IonItem>
            <IonInput
              label="Horas de sueño (0–24)"
              labelPlacement="stacked"
              type="number"
              inputmode="numeric"
              min="0"
              max="24"
              value={form.horasSueno}
              onIonChange={(e) => onNum("horasSueno", e, 0, 24)}
            />
          </IonItem>

          {/* Energía */}
          <IonItem className="range-item">
            <IonLabel>Energia</IonLabel>
            <IonRange
              min={0}
              max={10}
              step={1}
              ticks
              snaps
              value={form.energia}
              onIonChange={(e) => setField("energia", Number(e.detail.value))}
            />
            <IonNote slot="end">{form.energia}</IonNote>
          </IonItem>

          {/* Estado de ánimo */}
          <IonItem className="range-item">
            <IonLabel>Estado de ánimo</IonLabel>
            <IonRange
              min={0}
              max={10}
              step={1}
              ticks
              snaps
              value={form.estadoAnimo}
              onIonChange={(e) => setField("estadoAnimo", Number(e.detail.value))}
            />
            <IonNote slot="end">{form.estadoAnimo}</IonNote>
          </IonItem>

          {/* Motivación */}
          <IonItem className="range-item">
            <IonLabel>Motivación</IonLabel>
            <IonRange
              min={0}
              max={10}
              step={1}
              ticks
              snaps
              value={form.motivacion}
              onIonChange={(e) => setField("motivacion", Number(e.detail.value))}
            />
            <IonNote slot="end">{form.motivacion}</IonNote>
          </IonItem>

          {/* Ejercicio (min) */}
          <IonItem>
            <IonInput
              label="Ejercicio (min)"
              labelPlacement="stacked"
              type="number"
              inputmode="numeric"
              min="0"
              max="600"
              value={form.ejercicio}
              onIonChange={(e) => onNum("ejercicio", e, 0, 600)}
            />
          </IonItem>

          {/* Comentario */}
          <IonItem>
            <IonTextarea
              label="Comentario"
              labelPlacement="stacked"
              autoGrow
              value={form.comentario}
              onIonChange={(e) => setField("comentario", e.detail.value)}
              placeholder="Notas breves del día…"
            />
          </IonItem>
        </IonList>

        {!isValid && (
          <IonNote color="danger" className="mt-2 block">
            Revisa que los valores estén dentro de los rangos permitidos.
          </IonNote>
        )}
      </IonContent>

      <IonFooter className="ion-padding">
        <IonButton expand="block" disabled={!isValid || saving} onClick={onSubmit}>
          {saving ? "Guardando…" : "Guardar registro"}
        </IonButton>
      </IonFooter>
    </IonModal>
  );
};

export default ModalDailyRecord;
