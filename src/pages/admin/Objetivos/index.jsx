import styles from '../styles/AdminCommon.module.css';
import localStyles from './Objetivos.module.css';
import { IoPencilOutline } from 'react-icons/io5';
import { useEffect, useReducer } from 'react';
import ObjetivosEdit from './ObjetivosEdit';
import {
  getObjetivos,
  updateObjetivos,
} from '../../../services/objetivosServices';
import {
  Container,
  IconButton,
  Modal,
  Button,
  Snackbar,
} from '../../../components';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const initialState = {
  objetivos: [],
  objetivosEditados: [],
  openEditModal: false,
  openConfirmModal: false,
  selectedObjetivo: null,
};

function objetivosReducer(state, action) {
  switch (action.type) {
    case 'SET_OBJETIVOS':
      return {
        ...state,
        objetivos: action.payload,
        objetivosEditados: action.payload,
      };
    case 'UPDATE_OBJETIVO_LOCAL': {
      const updatedObjetivos = state.objetivosEditados.map((obj) =>
        obj.id === action.payload.id ? action.payload : obj,
      );
      return { ...state, objetivosEditados: updatedObjetivos };
    }
    case 'MODAL_EDIT_OPEN':
      return {
        ...state,
        openEditModal: true,
        selectedObjetivo: action.payload,
      };
    case 'MODAL_EDIT_CLOSE':
      return { ...state, openEditModal: false, selectedObjetivo: null };
    case 'MODAL_CONFIRM_OPEN':
      return {
        ...state,
        openConfirmModal: true,
        selectedObjetivo: action.payload,
      };
    case 'MODAL_CONFIRM_CLOSE':
      return { ...state, openConfirmModal: false, selectedObjetivo: null };
    default:
      return state;
  }
}

export default function Objetivos() {
  const [state, dispatch] = useReducer(objetivosReducer, initialState);
  const hasChanges =
    JSON.stringify(state.objetivos) !== JSON.stringify(state.objetivosEditados);
  const {
    objetivosEditados,
    openEditModal,
    openConfirmModal,
    selectedObjetivo,
  } = state;

  useEffect(() => {
    fetchObjetivos();
  }, []);

  async function fetchObjetivos() {
    try {
      const { objetivos, error } = await getObjetivos();
      if (!error && Array.isArray(objetivos)) {
        dispatch({ type: 'SET_OBJETIVOS', payload: objetivos });
      } else {
        toast.error(`Erro ao buscar objetivos: ${error}`);
      }
    } catch (err) {
      toast.error(`Erro inesperado ao buscar objetivos: ${err}`);
    }
  }

  const handleEditClick = (objetivo) => {
    dispatch({ type: 'MODAL_EDIT_OPEN', payload: objetivo });
  };

  const handleObjetivoEdit = (objetivoEditado) => {
    dispatch({ type: 'UPDATE_OBJETIVO_LOCAL', payload: objetivoEditado });
    dispatch({ type: 'MODAL_EDIT_CLOSE' });
  };

  const handleUpdateClick = async () => {
    try {
      await updateObjetivos(state.objetivosEditados);
      dispatch({ type: 'MODAL_CONFIRM_OPEN' });
      fetchObjetivos();
    } catch (err) {
      toast.error(`Erro ao atualizar objetivos: ${err}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Administração de Objetivos | Gatinhos Admin</title>
      </Helmet>
      <div className={styles.pagesMargin}>
        <div className={styles.titleContainer}>
          <h2 className="text-display">Objetivos</h2>
        </div>

        <Container style={{ width: '818px' }}>
          <div className={styles.subtitleDescription}>
            <p className={`${styles.adminSubtitle} text-body1`}>
              Lista de objetivos que serão mostrados na página “home”
            </p>
            <p className="text-body1">
              Ao editar, a descrição deve ser uma frase curta e completa.
            </p>
          </div>

          <div className={localStyles.listGroup}>
            {objetivosEditados.slice(0, 3).map((obj, index) => (
              <div key={index} className={localStyles.listContainer}>
                <div className={localStyles.listItem}>
                  <div className={localStyles.listItemTitle}>
                    <span className={localStyles.listItemTitleNumber}>
                      {index + 1}
                    </span>
                    <h3 className="text-body1 ">
                      {obj?.titulo || 'Escreva o título do objetivo aqui.'}
                    </h3>
                  </div>
                  <IconButton
                    icon={IoPencilOutline}
                    color="var(--color-neutral-black)"
                    onClick={() => handleEditClick(obj)}
                  />
                </div>
                <p className="text-body2">
                  {obj?.descricao || 'Escreva a descrição do objetivo aqui.'}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.formButton}>
            <Button
              variant="secondary"
              size="large"
              onClick={handleUpdateClick}
              disabled={!hasChanges}
            >
              Atualizar
            </Button>
          </div>
        </Container>
        {openEditModal && (
          <Modal
            open={openEditModal}
            onClose={() => dispatch({ type: 'MODAL_EDIT_CLOSE' })}
          >
            <ObjetivosEdit
              objetivos={selectedObjetivo}
              onObjetivoSave={handleObjetivoEdit}
              onClose={() => dispatch({ type: 'MODAL_EDIT_CLOSE' })}
            />
          </Modal>
        )}
        {openConfirmModal && (
          <Snackbar
            open={openConfirmModal}
            message="Objetivos atualizados com sucesso!"
            onClose={() => dispatch({ type: 'MODAL_CONFIRM_CLOSE' })}
          />
        )}
      </div>
    </>
  );
}
