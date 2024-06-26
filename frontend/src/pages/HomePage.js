import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCarros, reservarCarro } from '../services/api';
import '../pageStyle/HomePage.css';
import '../pageStyle/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCalendar } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';

const HomePage = () => {
  const [carros, setCarros] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCarros();
      setCarros(data);
    };
    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleReservarClick = () => {
    setShowCalendar(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleConfirmReserva = async () => {
    const carroReservado = carros.find(carro => !carro.reservado);
  
    if (carroReservado && selectedDate) {
      try {
        await reservarCarro(carroReservado.id);
        carroReservado.status = "Reservado";
        carroReservado.reservado = true;
        setCarros([...carros]);
  
      } catch (error) {
        console.error('Erro ao reservar o carro:', error);
      }
    }
    setShowCalendar(false);
  };

  const handleCancelReserva = () => {
    setShowCalendar(false);
    setSelectedDate(null);
  };

  return (
    <div className="alucar-container">
      <header className="alucar-header">
        <div className="alucar-logo" onClick={scrollToTop}>A L U C A R</div>
        <nav className="alucar-nav">
          <a href="#carros">Conta</a>
          <a href="/">Sair</a>
          <Link to="/carros" className="alucar-nav-link">Carros</Link>
        </nav>
      </header>

      <div className="alucar-body">
        <div className="alucar-car-grid">
          {carros.map((carro) => (
            <div key={carro.id} className="alucar-car-card">
              <h2 className="alucar-car-title">
                <FontAwesomeIcon icon={faCar} className="alucar-car-icon" />
                {carro.modelo}
              </h2>
              <p className="alucar-car-details">
                <FontAwesomeIcon icon={faCalendar} className="alucar-car-icon" />
                {carro.marca} - {carro.ano}
              </p>
              <p className="alucar-car-price">${carro.valor}</p>
              <p className="alucar-car-description">
                {carro.modelo} - {carro.ano}
              </p>
              {carro.reservado ? (
                <button className="alucar-reserve-box" disabled>Reservado</button>
              ) : (
                <button className="alucar-reserve-box" onClick={handleReservarClick}>Reservar</button>
              )}
            </div>
          ))}
        </div>
      </div>
      <footer className="alucar-footer">© 2024 ALUCAR. Todos os direitos reservados.</footer>

      {showCalendar && (
        <div className="calendar-popup">
          <Calendar
            className="calendar-container"
            onChange={handleDateSelect}
            value={selectedDate}
          />
          <div className="calendar-buttons">
            <button className="calendar-ok-button" onClick={handleConfirmReserva}>OK</button>
            <button className="calendar-cancel-button" onClick={handleCancelReserva}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
