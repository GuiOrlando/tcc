import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../pageStyle/CarroInfo.css';

const CarroInfo = ({ carro, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">

        <span className="close-popup" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className='icon-close-info' />
        </span>

        <h2>Informações do Carro</h2>

        <p> {carro.descricao}</p>
      </div>
    </div>
  );
};

export default CarroInfo;
