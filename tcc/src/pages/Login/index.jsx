import {useState} from 'react'
import logo from '../../assets/lk.svg'
import './styles.css'
import { auth } from '../../services/firebaseConfig'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'

function Login() {

  const [email, setNome] = useState("")
  const [password, setPassword] = useState("")

  const [signInWithEmailAndPassword, user, loading, error, ] = useSignInWithEmailAndPassword(auth);

  function handleSingIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  if (loading) {
    return <p>carregando</p>
  }

  if (user) {
    return console.log(user);
  }

  return (
    <div className="container">
      <div className="container-login">
        <div  className="wrap-login">
          <form className="login-form">
            <span className="login-form-title">
              <img src={logo} alt="Logo do sistema"/>
            </span>
            <div className="wrap-input">
              <input  className={email !== "" ?  'has-val input' : 'input'}
               type="email"
               value={email}
               onChange={e => setNome(e.target.value)}
               />
              <span className="focus-input" data-placeholder="Nome"></span>
            </div>

            <div className="wrap-input">
              <input  className={password !== "" ?  'has-val input' : 'input'}
               type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            <div className="container-login-form-btn">
          
                <button type="button">Entrar</button>
                
              
            </div>

            

          </form>
        </div>
      </div>
    </div>
  );
}


export default Login;