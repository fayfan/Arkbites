import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkLogin } from '../../redux/session';
import * as sessionActions from '../../redux/session';
import arkbitesLogo from '/arkbites-logo.png';
import './LoginForm.css';

const LoginFormModal = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const logInDemoUser = () => {
    return dispatch(
      sessionActions.thunkLogin({
        email: 'dokutah@rhodes.is',
        password: 'password',
      })
    ).then(closeModal);
  };

  return (
    <div className="login-modal-div">
      <img
        src={arkbitesLogo}
        className="login-modal-arkbites-logo"
        alt="Arkbites Logo"
      />
      <h1 className="login-modal-h1">Hello, Dokutah</h1>
      <form className="login-modal-form" onSubmit={handleSubmit}>
        <label className="login-modal-label">
          Email
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            required
            className="login-modal-input"
          />
          {errors.email && <p className="login-modal-error">{errors.email}</p>}
        </label>
        <label className="login-modal-label">
          Password
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
            className="login-modal-input"
          />
          {errors.password && (
            <p className="login-modal-error">{errors.password}</p>
          )}
        </label>
        <button type="submit" className="login-modal-button">
          Log In
        </button>
        <button onClick={logInDemoUser} className="login-modal-button">
          Log In as Demo User
        </button>
      </form>
    </div>
  );
};

export default LoginFormModal;
