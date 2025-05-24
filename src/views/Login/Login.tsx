import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Tymczasowe przejście do /home bez walidacji
    navigate('/home');
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Możesz dodać sprawdzenie: if (registerPassword !== registerRepeatPassword) return;
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: registerUsername, password: registerPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Registration failed');
      } else {
        alert('Registered successfully');
      }
    } catch (err) {
      alert('Registration server error');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">
        <img src="/albatross-big.svg" alt="logo" className="logo-icon-login" />
        <h2>
          <span className="logo-highlight">Alba.</span>Tross
        </h2>
      </div>

      <div className="auth-container">
        <div className="auth-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Login" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
        </div>

        <div className="auth-form">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Login" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
            <input
              type="password"
              placeholder="Repeat password"
              value={registerRepeatPassword}
              onChange={(e) => setRegisterRepeatPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-button">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
