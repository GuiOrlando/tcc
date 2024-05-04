import React, { useEffect, useState } from 'react';
import { deleteCarro, getAllCarros } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import CarroForm from '../components/CarroForm';
import CarroEditForm from '../components/CarroEditForm';
import '../pageStyle/CarroList.css';

const CarroList = () => {
  const [carros, setCarros] = useState([]);
  const [editCarroData, setEditCarroData] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [carrosPerPage] = useState(8);
  const [searchInput, setSearchInput] = useState('');
  const [filteredCarros, setFilteredCarros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCarros();
        setCarros(response);
        setFilteredCarros(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCarro(id);
      setCarros(carros.filter((carro) => carro.id !== id));
      setFilteredCarros(filteredCarros.filter((carro) => carro.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (carro) => {
    setEditCarroData(carro);
    setEditFormVisible(true);
  };

  const handleFormSubmit = () => {
    setEditCarroData(null);
    setEditFormVisible(false);
    getAllCarros().then((response) => {
      const updatedCarros = response.map(carro => ({
        ...carro,
        valor: parseFloat(carro.valor).toFixed(2).replace('.', ',')
      }));
      setCarros(updatedCarros);
      setFilteredCarros(updatedCarros);
    });
  };

  const handleCloseForm = () => {
    setEditCarroData(null);
    setEditFormVisible(false);
  };

  // Get current cars
  const indexOfLastCar = currentPage * carrosPerPage;
  const indexOfFirstCar = indexOfLastCar - carrosPerPage;
  const currentCarros = filteredCarros.slice(indexOfFirstCar, indexOfLastCar);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);
    const filteredData = carros.filter(
      (carro) =>
        carro.marca.toLowerCase().includes(searchTerm) ||
        carro.modelo.toLowerCase().includes(searchTerm) ||
        carro.chassi.toLowerCase().includes(searchTerm) ||
        carro.placa.toLowerCase().includes(searchTerm) ||
        carro.cor.toLowerCase().includes(searchTerm) ||
        carro.status.toLowerCase().includes(searchTerm)
    );
    setFilteredCarros(filteredData);
  };

  return (
    <div className="carrolist-container">
      <div className="list-title">
        <h1 className='logo-text'>
        <span>A </span><span>L </span><span>U </span><span>C </span><span>A </span><span>R</span>
        </h1>
        {editFormVisible && editCarroData ? (
          <div>
            <CarroEditForm onSubmit={handleFormSubmit} carro={editCarroData} onClose={handleCloseForm} />
          </div>
        ) : (
          <div>
            <CarroForm onSubmit={handleFormSubmit} />
          </div>
        )}
        <h2>Lista de Carros</h2>
      </div>

      <div className="App-container-addcarros">
        <input
          type="text"
          placeholder="Filtrar carros"
          value={searchInput}
          onChange={handleSearch}
        />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Chassi</th>
                <th>Placa</th>
                <th>Cor</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentCarros.map((carro) => (
                <tr key={carro.id}>
                  <td>{carro.marca}</td>
                  <td>{carro.modelo}</td>
                  <td>{carro.ano}</td>
                  <td>{carro.chassi}</td>
                  <td>{carro.placa}</td>
                  <td>{carro.cor}</td>
                  <td>{(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carro.valor))}</td>
                  <td>{carro.status}</td>
                  <td>
                    <div className='btn-actions'>
                      <button onClick={() => handleDelete(carro.id)}>
                        <FontAwesomeIcon icon={faTrash} className="icon-trash" />
                      </button>
                      <button onClick={() => handleEdit(carro)}>
                        <FontAwesomeIcon icon={faPencil} className="icon-pencil" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination">
        {carros.length > 0 && (
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}> {'<'} </button>
        )}
        {carros.length > 0 &&
          Array.from({ length: Math.ceil(carros.length / carrosPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={index + 1 === currentPage ? 'active' : (index >= currentPage + 2 || index < currentPage - 2 ? 'hide' : '')}
            >
              {index + 1}
            </button>
          ))}
        {carros.length > 0 && (
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(carros.length / carrosPerPage)}> {'>'} </button>
        )}
      </div>
    </div>
  );
};

export default CarroList;
