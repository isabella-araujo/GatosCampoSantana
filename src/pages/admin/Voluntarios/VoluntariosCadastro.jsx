import styles from '../styles/AdminCommon.module.css';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUpUser } from '../../../services/authServices';
import { createVoluntario } from '../../../services/voluntariosServices';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { Input, Button, Snackbar } from '../../../components';
import { AuthContext } from '../../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { validateEmail } from '../../../utils/validateEmail';

export default function VoluntariosCadastro() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
  } = useForm();
  const senha = watch('senha');
  const { role } = useContext(AuthContext);

  if (role !== 'admin') {
    return <Navigate to="/admin/voluntarios" replace />;
  }

  const onSubmit = async (data) => {
    const signUpResponse = await signUpUser({
      email: data.email,
      password: data.senha,
    });

    if (signUpResponse.error) {
      const error = signUpResponse.error;

      if (error.code === 'auth/email-already-in-use') {
        setError('email', { message: 'O email já está em uso.' });
      } else if (error.code === 'auth/weak-password') {
        setError('senha', { message: 'A senha é muito fraca.' });
      } else {
        setError('email', { message: error.message });
      }
      return;
    }

    const user = signUpResponse.user;
    await createVoluntario({
      ...data,
      userId: user.id,
      email: user.email,
    });

    setShowConfirmation(true);
    reset();
  };

  return (
    <div className={styles.pagesMargin}>
      <div className={styles.titleContainer}>
        <h2 className="text-display">Cadastrar Voluntário</h2>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formIcon}>
          <IoPersonCircleSharp size={134} color="var(--color-primary-blue)" />
        </div>
        <div className={styles.formInputs}>
          <Input
            id="email"
            label={'Email'}
            type="email"
            placeholder="email@gmail.com"
            {...register('email', {
              required: 'Email é obrigatório',
              minLength: {
                value: 5,
                message: 'Email tem que ter pelo menos 5 caracteres',
              },
              maxLength: {
                value: 30,
                message: 'Email não pode ter mais que 30 caracteres',
              },
              validate: (value) => validateEmail(value) || 'Email inválido',
            })}
            error={errors.email?.message}
          />
          <Input
            id="senha"
            label={'Senha'}
            type="password"
            placeholder="••••••••••"
            {...register('senha', {
              required: 'Senha é obrigatória',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
            })}
            error={errors.senha?.message}
          />
          <Input
            id="confirmarSenha"
            label={'Confirmar Senha'}
            type="password"
            placeholder="••••••••••"
            {...register('confirmarSenha', {
              required: 'Confirme a senha',
              validate: (value) =>
                value === senha || 'As senhas não correspondem',
            })}
            error={errors.confirmarSenha?.message}
          />
        </div>
        <Button type="submit">Cadastrar</Button>
      </form>
      <Snackbar
        open={showConfirmation}
        message="Voluntário cadastrado com sucesso!"
        onClose={() => setShowConfirmation(false)}
      />
    </div>
  );
}
