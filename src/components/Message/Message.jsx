import React from 'react';
import './Message.css';
import AvatarIA from '../../assets/svgs/AvatarIA';

const Message = ({ mensaje }) => {
  const { contenido, fechaHora, esUsuario } = mensaje;

  return (
    <div className={`message-container ${esUsuario ? 'user' : 'ia'}`}>
      {!esUsuario && <AvatarIA className={`message-avatar ${esUsuario ? 'user-avatar' : 'ia-avatar'}`} />}
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
