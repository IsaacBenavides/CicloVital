import React from 'react';
import './Message.css';

const Message = ({ mensaje }) => {
  const { contenido, fechaHora, esUsuario } = mensaje;

  return (
    <div className={`message-container ${esUsuario ? 'user' : 'ia'}`}>
      <div className={`message-bubble ${esUsuario ? 'user-message' : 'ia-message'}`}>
        <div className="message-content">
          <p>{contenido}</p>
          <span className="message-date">{new Date(fechaHora).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
