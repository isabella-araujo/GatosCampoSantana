import { Controller, useForm } from 'react-hook-form';
import { updateParceiro } from '../../../services/parceirosServices';
import ImageUploader from '../../../components/ImageUploader';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import { useEffect } from 'react';

export default function ParceirosEdit({
  parceiros,
  onParceiroUpdate,
  onClose,
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  useEffect(() => {
    if (parceiros) {
      reset({
        nome: parceiros.nome || '',
        site: parceiros.site || '',
        descricao: parceiros.descricao || '',
        logoFile: null,
      });
    }
  }, [parceiros, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await updateParceiro(parceiros.id, data);
      onParceiroUpdate(response);
      reset();
    } catch (error) {
      setError('root', {
        message: error.message || 'Erro ao atualizar parceiro',
      });
    }
  };

  return (
    <div className="form-container">
      <div className="text-subtitle">
        <h3>Editar Parceiro</h3>
      </div>

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container-img">
          <div className="form-img-uploader">
            <Controller
              name="logoFile"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImageUploader
                  file={value}
                  onFile={(file) => {
                    onChange(file);
                  }}
                >
                  Carregar nova imagem
                </ImageUploader>
              )}
            />
          </div>

          <div className="form-inputs">
            <Input
              id="nome"
              label="Nome"
              type="text"
              placeholder="Nome do parceiro"
              {...register('nome', {
                required: 'Nome é obrigatório',
                maxLength: { value: 50, message: 'Máximo de 50 caracteres' },
              })}
              error={errors.nome?.message}
            />

            <Input
              id="site"
              label="Site"
              type="text"
              placeholder="www.exemplo.com"
              {...register('site')}
              error={errors.site?.message}
            />

            <Textarea
              id="descricao"
              label="Descrição"
              placeholder="Descrição do parceiro"
              rows="6"
              {...register('descricao', {
                maxLength: {
                  value: 250,
                  message: 'Máximo de 250 caracteres',
                },
              })}
              error={errors.descricao?.message}
            />
          </div>
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
