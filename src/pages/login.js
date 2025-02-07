import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import logo from '../assets/lk.svg';
import '../style.css';
import { auth } from '../services/firebaseConfig';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Container from '../Componentes/Layout/Container';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (email === '') {
      setEmailError('O campo de email não pode estar vazio.');
    }

    if (password === '') {
      setPasswordError('O campo de senha não pode estar vazio.');
    }

    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(email, password);
    }
  };

  if (user) {
    navigate('/Principal'); 
    return null;
  }

  return (
    <div className="login-page">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSignIn}>
            <span className="login-form-title">
              <img src={logo} alt="Logo do sistema" />
            </span>

            <div className="wrap-input">
              <input
                className={email !== '' ? 'has-val input' : 'input'}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
              {emailError && <p className="error">{emailError}</p>}
            </div>

            <div className="wrap-input">
              <input
                className={password !== '' ? 'has-val input' : 'input'}
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
              {passwordError && <p className="error">{passwordError}</p>}

            
              <span
                className="toggle-password-visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" type="submit">Entrar</button>
            </div>

            {error && <p className="error">{"Não foi possível fazer login"}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
