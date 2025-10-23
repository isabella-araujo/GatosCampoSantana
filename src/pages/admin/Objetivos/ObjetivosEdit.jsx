import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
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
    <div className="form-container">
      <div className="text-subtitle">
        <h3>Edite Objetivo</h3>
      </div>

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-inputs">
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

        <div className="form-buttons">
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
