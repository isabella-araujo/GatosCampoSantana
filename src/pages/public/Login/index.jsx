import Logo from '../../../assets/Logo/Logo.svg';
import { Button, Input, ErrorMessage, Modal } from '../../../components';
import { IoArrowBack } from 'react-icons/io5';

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { validateEmail } from '../../../utils/validateEmail';

import './style.css';
import { Link } from 'react-router-dom';
import { resetPasswordUser } from '../../../services/authServices';
import { Helmet } from 'react-helmet-async';

export default function Login() {
  const { signIn, loading } = useAuth();
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    auth: '',
  });

  function validateField(name, value) {
    let error = '';

    if (!value.trim()) {
      error = 'O campo é obrigatório.';
    } else if (name === 'email' && !validateEmail(value)) {
      error = 'O formato do e-mail é inválido.';
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
      auth: '',
    }));
  }

  function validateOnSubmit() {
    const { email, password } = formData;
    const errors = { email: '', password: '', auth: '' };
    let isValid = true;

    if (!email.trim()) {
      errors.email = 'O campo é obrigatório.';
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = 'O formato do e-mail é inválido.';
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = 'O campo é obrigatório.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  }

  async function handleSignIn() {
    if (!validateOnSubmit()) return;
    setLoadingLocal(true);
    setFormErrors((prev) => ({ ...prev, auth: '' }));

    const response = await signIn(formData);
    setLoadingLocal(false);

    if (response?.error === 'disabled-account') {
      setFormErrors((prev) => ({
        ...prev,
        auth: 'Sua conta foi desativada. Entre em contato com o administrador.',
      }));
    } else if (response?.error?.includes('invalid-credential')) {
      setFormErrors((prev) => ({
        ...prev,
        auth: 'Credenciais incorretas.',
      }));
    } else if (response?.error) {
      setFormErrors((prev) => ({
        ...prev,
        auth: 'Erro ao fazer login. Tente novamente.',
      }));
    }
  }

  async function handleResetPassword() {
    const email = formData.email.trim();

    if (!email) {
      setFormErrors((prev) => ({
        ...prev,
        email: 'O campo é obrigatório.',
        auth: '',
      }));
      return;
    }

    if (!validateEmail(email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: 'O formato do e-mail é inválido.',
        auth: '',
      }));
      return;
    }

    try {
      const response = await resetPasswordUser({ email });

      if (response?.error) {
        setFormErrors((prev) => ({
          ...prev,
          auth: 'Erro ao enviar e-mail de redefinição de senha. Tente novamente.',
        }));
        return;
      }

      setFormErrors((prev) => ({
        ...prev,
        auth: 'Instruções de redefinição de senha enviadas para seu e-mail.',
      }));

      setResetPasswordModal(false);
    } catch (error) {
      setFormErrors((prev) => ({
        ...prev,
        auth: `Erro inesperado ao redefinir senha: ${error.message}. Tente novamente.`,
      }));
    }
  }

  const isButtonDisabled = !formData.email || !formData.password || loading;
  const isResetDisabled = !formData.email.trim();

  return (
    <>
      <Helmet>
        <title>Login | Gatos do Campo de Santana</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="login">
        <div className="container-img">
          <img className="logo" src={Logo} alt="Logo" />
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
            <div
              className="forgot-password"
              onClick={() => setResetPasswordModal(true)}
            >
              <p> Esqueceu sua senha? </p>
            </div>
            <Button
              onClick={(e) => handleSignIn(e)}
              variant="secondary"
              disabled={isButtonDisabled}
            >
              {loadingLocal ? 'Carregando...' : 'Entrar'}
            </Button>

            <ErrorMessage>{formErrors.auth}</ErrorMessage>
            <Link to="/" className="backHome-link text-caption">
              <IoArrowBack /> Voltar para "Gatos Campo Santana"
            </Link>
            <Modal
              open={resetPasswordModal}
              onClose={() => setResetPasswordModal(false)}
            >
              <div className="modal-content">
                <div>
                  <h2>Redefinir Senha</h2>
                  <p>
                    Insira seu e-mail para receber um link de redefinição de
                    senha.
                  </p>
                </div>
                <Input
                  value={formData.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  label="Email"
                  placeholder="usuario@email.com"
                  type="email"
                  name="email"
                />

                {formErrors.auth && (
                  <ErrorMessage>{formErrors.auth}</ErrorMessage>
                )}

                <Button
                  onClick={handleResetPassword}
                  variant="primary"
                  disabled={isResetDisabled}
                >
                  Enviar
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
