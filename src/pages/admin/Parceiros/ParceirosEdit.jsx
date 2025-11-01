import { Controller, useForm } from 'react-hook-form';
import styles from '../styles/AdminCommon.module.css';
import { useEffect } from 'react';
import { updateParceiro } from '../../../services/parceirosServices';
import { Input, Textarea, Button, ImageUploader } from '../../../components';

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
    <div className={styles.formContainer}>
      <div className="text-subtitle">
        <h3>Editar Parceiro</h3>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContainerImg}>
          <div className={styles.formImgUploader}>
            <Controller
              name="logoFile"
              control={control}
              rules={
                parceiros?.logoURL ? {} : { required: 'Logo é obrigatória' }
              }
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

          <div className={styles.formInputs}>
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
