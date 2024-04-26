// CarroEditForm.js
import React, { useState, useEffect } from 'react';
import { editCarro, getAllCarros } from '../services/api';

const CarroEditForm = ({ onSubmit, carro, onClose }) => {
  const [marca, setMarca] = useState(carro ? carro.marca : '');
  const [modelo, setModelo] = useState(carro ? carro.modelo : '');
  const [ano, setAno] = useState(carro ? carro.ano : new Date().getFullYear());
  const [chassi, setChassi] = useState(carro ? carro.chassi : '');
  const [placa, setPlaca] = useState(carro ? carro.placa : '');
  const [cor, setCor] = useState(carro ? carro.cor : '');
  const [valor, setValor] = useState(carro ? carro.valor : '');
  const [status, setStatus] = useState(carro ? carro.status : '');
  const [carros, setCarros] = useState([]);
  
  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const response = await getAllCarros();
        setCarros(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCarros();
  }, []);

  const marcasCarro = [
    "Chevrolet", "Hyundai", "BMW", "Ford", "Volkswagen", "Fiat", "Peugeot",
    "Volvo", "Audi", "Renault", "Honda", "Mercedes", "Land Rover", "KIA",
    "Citroën", "Jeep", "Toyota", "Mitsubishi"
  ];

  const statusCarro = [
    "Disponível", "Reservado", "Alugado"
  ];

  const anosCarro = Array.from({ length: new Date().getFullYear() - 2010 + 1 }, (_, idx) => 2010 + idx);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (chassi.length !== 17) {
      alert('O Chassi deve conter 17 caracteres.');
      return;
    }

    if (placa.length !== 7) {
      alert('A Placa deve conter 7 caracteres.');
      return;
    }

    if (isDuplicateChassiOrPlaca()) {
      alert('Já existe um carro cadastrado com esse Chassi ou Placa.');
      return;
    }

    const editedCarro = { marca, modelo, ano, chassi, placa, cor, valor, status };

    try {
      await editCarro(carro.id, editedCarro);
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const isDuplicateChassiOrPlaca = () => {
    const foundCarro = carros.find(
      (car) => (car.chassi === chassi || car.placa === placa) && car.id !== carro.id
    );
    return !!foundCarro;
  };

  return (
    <div className='App-container-addcarros'>

      <div className='form-background'></div>
      <div className={`add-carro-form active`}>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Marca:</span>
            <select
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              required
            >
              <option value="" disabled>Selecione a marca</option>
              {marcasCarro.map((marca, index) => (
                <option key={index} value={marca}>{marca}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Modelo:</span>
            <input
              type="text"
              placeholder='Ex: Onix, Gol'
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Ano:</span>
            <select
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              required
            >
              <option value="" disabled>Selecione o ano</option>
              {anosCarro.map((ano, index) => (
                <option key={index} value={ano}>{ano}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Chassi:</span>
            <input
              type="text"
              value={chassi}
              onChange={(e) => setChassi(e.target.value.toUpperCase())}
              maxLength={17} // Definindo o máximo de 17 caracteres para o Chassi
              minLength={17} // Definindo o mínimo de 17 caracteres para o Chassi
              required
            />
          </label>
          <label>
            <span>Placa:</span>
            <input
              type="text"
              placeholder='Ex: ABC1D23'
              value={placa}
              onChange={(e) => setPlaca(e.target.value.toUpperCase())}
              maxLength={7} // Definindo o máximo de 7 caracteres para a Placa
              minLength={7} // Definindo o mínimo de 7 caracteres para a Placa
              required
            />
          </label>
          <label>
            <span>Cor:</span>
            <input
              type="text"
              placeholder='Ex: Prata'
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Valor:</span>
            <input
              type="text"
              placeholder='R$'
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Status</span>
            <select
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>Selecione o Status</option>
              {statusCarro.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </label>
          
          <div className="btn-ex-edit">
            <button type="submit" className="salvar-button">Salvar</button>
            <button type="button" onClick={onClose} className="fechar-button">Fechar</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CarroEditForm;