import React, { useState, useEffect } from 'react';
import { getAllCarros } from '../services/api';
import '../pageStyle/HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [carros, setCarros] = useState([]);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="alucar-container">
      <header className="alucar-header">
        <div className="alucar-logo" onClick={scrollToTop}>A L U C A R</div>
        <nav className="alucar-nav">
          <a href="#carros">Conta</a>
          <button className="logout-button" onClick={handleLogout}>Sair</button>
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
              <button className="alucar-reserve-box">Reservar</button>
            </div>
          ))}
        </div>
      </div>
      <footer className="alucar-footer">© 2024 ALUCAR. Todos os direitos reservados.</footer>
    </div>
  );
};

export default HomePage;
