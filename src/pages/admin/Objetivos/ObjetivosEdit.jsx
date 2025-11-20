import styles from '../styles/AdminCommon.module.css';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Button } from '../../../components';
import { useState } from 'react';
export default function ObjetivosEdit({ objetivos, onObjetivoSave, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    const atualizado = { ...objetivos, ...data };
    onObjetivoSave(atualizado);
    reset();
    setIsSubmitting(false);
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
              validate: (value) =>
                value.trim().length > 0 ||
                'O título não pode conter apenas espaços',
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
                value: 15,
                message: 'Descrição tem que ter pelo menos 15 caracteres',
              },
              maxLength: {
                value: 150,
                message: 'Descrição não pode ter mais que 150 caracteres',
              },
              validate: (value) =>
                value.trim().length > 0 ||
                'A descrição não pode conter apenas espaços',
            })}
            error={errors.descricao?.message}
          />
        </div>

        <div className={styles.formButtons}>
          <Button
            size="small"
            variant="secondary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
