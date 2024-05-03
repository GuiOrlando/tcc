import React, { useEffect, useState } from 'react';
import { getAllCarros } from '../services/api';
import "../pageStyle/HomePage.css"

const HomePage = () => {
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCarros();
      setCarros(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <header className="header">A L U C A R</header>
      <div className="body">
        {carros.map((carro) => (
          <div key={carro.id} className="car-card">
            <h2 className="car-title">{carro.modelo}</h2>
            <p className="car-details">{carro.marca} - {carro.ano}</p>
            <p className="car-price">{(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carro.valor))}</p>
            <p className="car-description">{carro.descricao}</p>
          </div>
        ))}
      </div>
      <footer className="footer">© 2024 ALUCAR. Todos os direitos reservados.</footer>
    </div>
  );
};

export default HomePage;