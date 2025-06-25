import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Alert from '@/components/Alert/Alert';
import './Login.css';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const { login, register, loading } = useAuth();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const location = useLocation();
  const alertFromRedirect = location.state?.alert;

  useEffect(() => {
    if (alertFromRedirect) {
      setAlertTitle(alertFromRedirect.title || 'Error');
      setAlertMessage(alertFromRedirect.message || '');
      setAlertVisible(true);
    }
  }, [alertFromRedirect]);

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, message } = await login(loginUsername, loginPassword);
    if (!success && message) {
      showAlert('Login failed', message);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerPassword !== registerRepeatPassword) {
      showAlert('Registration failed', 'Passwords do not match');
      return;
    }

    const { success, message } = await register(registerUsername, registerPassword);
    if (!success && message) {
      showAlert('Registration failed', message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">
        <img src="/svg/albatross-big.svg" alt="logo" className="logo-icon-login" />
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
            <button type="submit" className="auth-button" disabled={loading}>
              Login
            </button>
          </form>
        </div>

        <div className="auth-form">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Login" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
            <input type="password" placeholder="Repeat password" value={registerRepeatPassword} onChange={(e) => setRegisterRepeatPassword(e.target.value)} />
            <button type="submit" className="auth-button" disabled={loading}>
              Register
            </button>
          </form>
        </div>
      </div>

      {alertVisible && <Alert title={alertTitle} message={alertMessage} onClose={() => setAlertVisible(false)} />}
    </div>
  );
};

export default Login;
