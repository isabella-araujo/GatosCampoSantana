import styles from '../styles/AdminCommon.module.css';
import localStyles from './Gatos.module.css';
import { Controller, useForm } from 'react-hook-form';
import { updateGato } from '../../../services/gatosServices';
import { useEffect } from 'react';
import {
  Input,
  Textarea,
  Button,
  Snackbar,
  ImageUploader,
  Dropdown,
  Checkbox,
} from '../../../components';

export default function GatosEdit({ gatos, onGatoUpdate, onClose }) {
  const optionsGenero = [
    { value: 'macho', title: 'Macho' },
    { value: 'femea', title: 'Fêmea' },
    { value: 'nao-informado', title: 'Não informado' },
  ];
  const optionsFivFelv = [
    { value: 'possui', title: 'Possui' },
    { value: 'nao-possui', title: 'Não Possui' },
    { value: 'nao-testado', title: 'Não testado' },
  ];
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      nome: '',
      nascimento: '',
      descricao: '',
      genero: '',
      fotoFile: null,
      castrado: false,
      possuiFievFelv: '',
      disponivelAdocao: true,
      disponivelLarTemporario: false,
    },
  });

  useEffect(() => {
    if (gatos) {
      const nascimentoDate = gatos.nascimento
        ? gatos.nascimento.toDate
          ? gatos.nascimento.toDate().toISOString().split('T')[0]
          : new Date(gatos.nascimento).toISOString().split('T')[0]
        : '';
      reset({
        nome: gatos.nome || '',
        genero: gatos.genero || '',
        descricao: gatos.descricao || '',
        nascimento: nascimentoDate,
        fotoFile: null,
        castrado: gatos.castrado ?? false,
        possuiFievFelv: gatos.possuiFievFelv || '',
        disponivelAdocao: gatos.disponivelAdocao ?? true,
        disponivelLarTemporario: gatos.disponivelLarTemporario ?? false,
      });
    }
  }, [gatos, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await updateGato(gatos.id, data);
      onGatoUpdate(response);
      reset();
    } catch (error) {
      setError('root', {
        message: error.message || 'Erro ao atualizar gato',
      });
    }
  };
  return (
    <div className={styles.formContainer}>
      <div className="text-subtitle">
        <h3>Gato</h3>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContainerImg}>
          <Controller
            name="fotoFile"
            control={control}
            rules={gatos?.fotoURL ? {} : { required: 'Foto é obrigatória' }}
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
          <div className={localStyles.formInputsGatos}>
            <div className={localStyles.groupContainer}>
              <div className={localStyles.group}>
                <Input
                  id="nome"
                  label="Nome"
                  type="text"
                  placeholder="Nome do Gatinho"
                  {...register('nome', {
                    required: 'Nome é obrigatório',
                    minLength: {
                      value: 3,
                      message: 'Nome tem que ter pelo menos 3 caracteres',
                    },
                  })}
                  error={errors.nome?.message}
                />
                <div className={localStyles.formGroup}>
                  <div>
                    <Input
                      id="nascimento"
                      label="Nascimento"
                      type="date"
                      placeholder="DD/MM/AAAA"
                      {...register('nascimento', {
                        required: 'Nascimento é obrigatório',
                      })}
                      error={errors.nascimento?.message}
                    />
                  </div>
                  <div>
                    <label>Gênero</label>
                    <Controller
                      name="genero"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          label="Selecione o gênero"
                          options={optionsGenero}
                          onSelect={(option) => field.onChange(option.value)}
                          value={field.value}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className={localStyles.group}>
                <div>
                  <label>Fiv/Felv</label>
                  <Controller
                    name="possuiFievFelv"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        label="possui Fiev/Felv?"
                        options={optionsFivFelv}
                        onSelect={(option) => field.onChange(option.value)}
                        value={field.value}
                      />
                    )}
                  />
                </div>
                <div className={localStyles.formCheckboxes}>
                  <Controller
                    name="castrado"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        label="Castrado(a)"
                        checked={field.value}
                        onChecked={(val) => field.onChange(val)}
                      />
                    )}
                  />

                  <Controller
                    name="disponivelAdocao"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        label="Disponível para Adoção"
                        checked={field.value}
                        onChecked={(val) => field.onChange(val)}
                      />
                    )}
                  />

                  <Controller
                    name="disponivelLarTemporario"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        label="Disponível para Lar Temporário"
                        checked={field.value}
                        onChecked={(val) => field.onChange(val)}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <Textarea
              id="descricao"
              label="Descrição"
              placeholder="Descrição do gatinho..."
              rows="8"
              {...register('descricao', {
                required: 'Descrição é obrigatório',
                maxLength: {
                  value: 350,
                  message: 'Máximo de 350 caracteres',
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
