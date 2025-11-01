import styles from '../styles/AdminCommon.module.css';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Button } from '../../../components';
export default function ObjetivosEdit({ objetivos, onObjetivoSave, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      titulo: objetivos?.titulo || '',
      descricao: objetivos?.descricao || '',
    },
  });

  const onSubmit = (data) => {
    const atualizado = { ...objetivos, ...data };
    onObjetivoSave(atualizado);
    reset();
  };

  return (
    <div className={styles.formContainer}>
      <div className="text-subtitle">
        <h3>Edite Objetivo</h3>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputs}>
          <Input
            id="titulo"
            label="Título"
            type="text"
            placeholder="Título do objetivo"
            {...register('titulo', {
              required: 'Título é obrigatório',
              minLength: {
                value: 5,
                message: 'Título tem que ter pelo menos 5 caracteres',
              },
              maxLength: {
                value: 30,
                message: 'Título não pode ter mais que 30 caracteres',
              },
            })}
            error={errors.titulo?.message}
          />

          <Textarea
            id="descricao"
            label="Descrição"
            type="textArea"
            rows="5"
            placeholder="Descrição do objetivo"
            {...register('descricao', {
              required: 'Descrição é obrigatória',
              minLength: {
                value: 5,
                message: 'Descrição tem que ter pelo menos 5 caracteres',
              },
              maxLength: {
                value: 150,
                message: 'Descrição não pode ter mais que 150 caracteres',
              },
            })}
            error={errors.descricao?.message}
          />
        </div>

        <div className={styles.formButtons}>
          <Button size="small" variant="secondary" type="submit">
            Editar
          </Button>
          <Button size="small" variant="danger" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
