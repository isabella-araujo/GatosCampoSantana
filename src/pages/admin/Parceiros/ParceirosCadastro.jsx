import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { createParceiro } from '../../../services/parceirosServices';
import ImageUploader from '../../../components/ImageUploader';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import Snackbar from '../../../components/Snackbar';
import Container from '../../../components/Container';
//ParceirosCadastro.jsx
export default function ParceirosCadastro() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await createParceiro(data);
      if (response.error) throw new Error(response.error.message);
      setShowConfirmation(true);
      reset();
    } catch (error) {
      setError('root', {
        message: error.message || 'Erro ao cadastrar parceiro',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-pages-margin">
      <div className="admin-title-container">
        <h1 className="text-display">Cadastrar Parceiros</h1>
      </div>

      <Container style={{ width: '646px' }}>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container-img">
            <Controller
              name="logoFile"
              control={control}
              rules={{ required: 'Logo é obrigatória' }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <ImageUploader
                  file={value}
                  onFile={(file) => onChange(file)}
                  error={error?.message}
                  onError={() => {}}
                  onClick={(e) => e.stopPropagation()}
                >
                  Carregar imagem
                </ImageUploader>
              )}
            />

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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Cadastrar'}
          </Button>
        </form>
      </Container>

      <Snackbar
        open={showConfirmation}
        message="Parceiro cadastrado com sucesso!"
        onClose={() => setShowConfirmation(false)}
      />
    </div>
  );
}
