import Logo from '../../../assets/Logo/Logo.svg';
import { Button, Input, ErrorMessage } from '../../../components';

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { validateEmail } from '../../../utils/validateEmail';

import './style.css';

export default function Login() {
  const { signIn, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    auth: '',
  });

  function validateField(name, value) {
    let error = '';
    if (value.length === 0) {
      error = 'O campo é obrigatório.';
    } else if (name === 'email' && !validateEmail(value)) {
      error = 'O formato do e-mail é inválido.';
    }

    setFormErrors({
      ...formErrors,
      [name]: error,
      auth: '',
    });
  }

  function validateOnSubmit() {
    const { email, password } = formData;
    const errors = { email: '', password: '', auth: '' };
    let isValid = true;

    if (email.length === 0) {
      errors.email = 'O campo é obrigatório.';
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = 'O formato do e-mail é inválido.';
      isValid = false;
    }

    if (password.length === 0) {
      errors.password = 'O campo é obrigatório.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  }

  async function handleSignIn() {
    if (!validateOnSubmit) return;

    try {
      const response = await signIn(formData);
      if (response?.error.includes('invalid-credential')) {
        setFormErrors({
          ...formErrors,
          auth: 'Credenciais incorretas.',
        });
      }
    } catch (error) {
      setFormErrors({
        ...formErrors,
        auth: 'Ocorreu um erro inesperado. Tente novamente.',
      });
    }
  }

  const isButtonDisabled = !formData.email || !formData.password || loading;

  return (
    <div className="login">
      <div className="container-img">
        <img className="logo" src={Logo} />
      </div>

      <div className="container-login">
        <span className="title text-display">Entre</span>
        <div className="container-inputs">
          <Input
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            label="Email"
            placeholder="usuario@email.com"
            type="email"
            name="email"
          />
          <Input
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            name="password"
          />

          {/* <p className='recuperar-senha'>
                        Esqueceu a senha?
                    </p> */}

          <Button
            onClick={handleSignIn}
            variant="secondary"
            disabled={isButtonDisabled}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>
          <ErrorMessage>{formErrors.auth}</ErrorMessage>
        </div>
      </div>
    </div>
  );
}
