import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, getAllUsers } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faIdCard, faHome, faMailReply } from '@fortawesome/free-solid-svg-icons';
import "../pageStyle/Signup.css";

const Signup = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisible, setSenhaVisible] = useState(false);
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response);
        } catch (error) {
            console.error(error);
        }
    };

    const isDuplicateEmailOrCpf = () => {
        const foundUser = users.find(
            (user) => user.email === email || user.cpf === cpf
        );
        return !!foundUser;
    };

    const clearFields = () => {
        setNome('');
        setEmail('');
        setSenha('');
        setCpf('');
        setEndereco('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !email || !senha || !cpf || !endereco) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (isDuplicateEmailOrCpf()) {
            alert('Já existe um usuário cadastrado com esse email ou CPF.');
            return;
        }

        const newUser = { nome, email, senha, cpf, endereco };

        try {
            await signup(newUser);
            alert('Cadastro realizado com sucesso!');
            clearFields();
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar. Por favor, tente novamente.');
        }
    };

    const togglePasswordVisibility = () => {
        setSenhaVisible(!senhaVisible);
    };

    const goBackToLogin = () => {
        navigate('/');
    };

    return (
        <div className="signup-container">
            <div className="form-signup">

                <form>

                    <button className='return-btn' onClick={goBackToLogin}> 
                    <FontAwesomeIcon icon={faMailReply} className='icon-return' />
                    </button>
                
                    <h1> Faça seu cadastro </h1>

                    <input
                        type="text"
                        placeholder="Nome Completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    <div className="create-account">
                        
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon icon={faEnvelope} className="icon-email" />

                        <input
                            type={senhaVisible ? "text" : "password"}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon 
                            icon={senhaVisible ? faEye : faEyeSlash} 
                            className="icon-password" 
                            onClick={togglePasswordVisibility}
                        />
                    </div>

                    <div className="create-account">
                        <input
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon icon={faIdCard} className="icon-cpf" />

                        <input
                            type="text"
                            placeholder="Endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon icon={faHome} className="icon-adress" />
                    </div>

                    <div className='div-signup-btn' >
                    <button className="signup-btn" type="submit" onClick={handleSubmit}> Cadastrar </button>
                    </div>
                    
                </form>

            </div>
        </div>
    );
};

export default Signup;
