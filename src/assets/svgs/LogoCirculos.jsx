import React from 'react';
import './LogoCirculos.css';

const LogoCirculos = () => {
  return (
    <svg
      width="500"
      height="140"
      viewBox="0 0 500 140"
      className='logo-circles'
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Círculo superior */}
      <circle className="logo-circle" r="20">
        <animate attributeName="cy" values="20;100;20" dur="7s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="cx" values="60;60" dur="7s" begin="0s" repeatCount="indefinite" />
      </circle>

      {/* Círculo inferior */}
      <circle className="logo-circle" r="20">
        <animate attributeName="cy" values="100;20;100" dur="7s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="cx" values="60;60" dur="7s" begin="0s" repeatCount="indefinite" />
      </circle>

      {/* Círculo izquierdo */}
      <circle className="logo-circle" r="20">
        <animate attributeName="cx" values="20;100;20" dur="4s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="60;60" dur="4s" begin="0.5s" repeatCount="indefinite" />
      </circle>

      {/* Círculo derecho */}
      <circle className="logo-circle" r="20">
        <animate attributeName="cx" values="100;20;100" dur="4s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="60;60" dur="4s" begin="0.5s" repeatCount="indefinite" />
      </circle>

      {/* Texto CicloVital */}
      <text className="logo-text" x="130" y="78">
          CicloVital
          
        
      </text>
    </svg>
  );
};

export default LogoCirculos;
