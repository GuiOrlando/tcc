import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; 
import "../pageStyle/Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, senha);
            navigate('/home'); // Redirecione para a homepage após o login bem-sucedido
        } catch (error) {
            alert('Erro ao fazer login: ' + error.message);
        }
    };

    return (
        <div className='login-container'>
            <div className='form-login'>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>

                    <div className="login">
                        <input 
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon icon={faUser} className="icon" />
                    </div>

                    <div className="login">
                        <input 
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon icon={faLock} className="icon" />
                    </div>

                    <div className="recall-forget">
                        <label>
                            <input type="checkbox" /> Lembre de mim
                        </label>
                        <a href="#">Esqueceu a senha?</a>
                    </div>

                    <button type="submit">Entrar</button>

                    <div className="signup-link">
                        <p>
                            Não tem uma conta? <a href="/cadastro">Registrar</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
