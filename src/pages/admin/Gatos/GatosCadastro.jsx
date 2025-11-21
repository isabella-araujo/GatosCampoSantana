import styles from '../styles/AdminCommon.module.css';
import localStyles from './Gatos.module.css';
import { useState } from 'react';
import { createGato } from '../../../services/gatosServices';
import { Controller, useForm } from 'react-hook-form';
import {
  Container,
  Input,
  Textarea,
  Button,
  Snackbar,
  ImageUploader,
  Dropdown,
  Checkbox,
} from '../../../components';
import { validateBirthDate } from '../../../utils/validateDate';
import { Helmet } from 'react-helmet-async';

export default function GatosCadastro() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      fotoFile: null,
      genero: '',
      castrado: false,
      possuiFievFelv: false,
      disponivelAdocao: true,
      disponivelLarTemporario: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await createGato(data);
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
    <>
      <Helmet>
        <title>Cadastro de Gatos | Gatinhos Admin</title>
      </Helmet>
      <div className={styles.pagesMargin}>
        <div className={styles.titleContainer}>
          <h2 className="text-display">Cadastrar Gatos</h2>
        </div>

        <Container style={{ width: '984px' }}>
          <form
            className={styles.formContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.formContainerImg}>
              <Controller
                name="fotoFile"
                control={control}
                rules={{ required: 'Foto é obrigatória' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <ImageUploader
                    file={value}
                    onFile={(file) => onChange(file)}
                    error={error?.message}
                    onError={(msg) =>
                      setError('fotoFile', { type: 'manual', message: msg })
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    Carregar imagem
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
                        maxLength: {
                          value: 50,
                          message: 'Nome pode ter no máximo 50 caracteres',
                        },
                        validate: (value) =>
                          value.trim().length > 0 ||
                          'O nome não pode conter apenas espaços',
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
                            validate: (value) =>
                              validateBirthDate(value) ||
                              'Data de nascimento inválida',
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
                              onSelect={(option) =>
                                field.onChange(option.value)
                              }
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
                    minLength: {
                      value: 10,
                      message: 'Mínimo de 10 caracteres',
                    },
                    validate: (value) =>
                      value.trim().length > 0 ||
                      'A descrição não pode conter apenas espaços',
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
          message="Gato cadastrado com sucesso!"
          onClose={() => setShowConfirmation(false)}
        />
      </div>
    </>
  );
}
