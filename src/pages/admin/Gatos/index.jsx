import styles from '../styles/AdminCommon.module.css';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatBirthDate, formatDate } from '../../../utils/validateDate';
import { deleteGato, getAllGatos } from '../../../services/gatosServices';
import { search } from '../../../utils/searchUtils';
import { IoCheckmarkCircleSharp, IoCloseCircleSharp } from 'react-icons/io5';
import GatosEdit from './GatosEdit';
import {
  Container,
  SearchArea,
  Button,
  Table,
  Modal,
  StatusPill,
  Tooltip,
  Loading,
} from '../../../components';
import { AuthContext } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const initialState = {
  gatos: [],
  openEditModal: false,
  openModalConfirm: false,
  selectedGato: null,
};

function gatosReducer(state, action) {
  switch (action.type) {
    case 'SET_GATOS':
      return { ...state, gatos: action.payload };
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        openEditModal: true,
        selectedGato: action.payload,
      };
    case 'CLOSE_EDIT_MODAL':
      return { ...state, openEditModal: false, selectedGato: null };
    case 'OPEN_MODALCONFIRM':
      return {
        ...state,
        openModalConfirm: true,
        selectedGato: action.payload,
      };
    case 'CLOSE_MODALCONFIRM':
      return { ...state, openModalConfirm: false, selectedGato: null };
    default:
      return state;
  }
}

export default function Gatos() {
  const [state, dispatch] = useReducer(gatosReducer, initialState);
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const { gatos, openEditModal, openModalConfirm, selectedGato } = state;
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    fetchGatos();
  }, []);

  async function fetchGatos() {
    try {
      const gatos = await getAllGatos();
      if (Array.isArray(gatos)) {
        dispatch({ type: 'SET_GATOS', payload: gatos });
      } else {
        toast.error(`Erro ao buscar gatos: retorno inválido ${gatos}`);
      }
    } catch (error) {
      toast.error(`Erro inesperado ao buscar gatos: ${error}`);
    }
  }

  function handleSearch(query) {
    setFilteredData(search(gatos, 'nome', query));
  }

  const handleDelete = async () => {
    if (selectedGato) {
      await deleteGato(selectedGato.id);
      fetchGatos();
      dispatch({ type: 'CLOSE_MODALCONFIRM' });
    }
  };

  const handleEditClick = (gato) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: gato });
  };

  const columns = [
    {
      name: 'Nome',
      selector: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <img src={row.fotoURL} alt={row.nome} width="50" />
          <span>{row.nome}</span>
        </div>
      ),
      sortable: true,
    },

    {
      name: 'Gênero',
      selector: (row) => {
        return row.genero === 'macho'
          ? 'Macho'
          : row.genero === 'femea'
          ? 'Fêmea'
          : 'Não informado';
      },
      sortable: true,
    },
    {
      name: 'Idade',
      selector: (row) => {
        const dataFormatada = formatDate(row.nascimento);
        return formatBirthDate(dataFormatada);
      },
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <div>
          <StatusPill
            bgColor={
              row.disponivelAdocao
                ? 'rgba(91, 190, 114, 0.5)'
                : 'rgba(198,206,218, 0.5)'
            }
            textColor="var(--color-neutral-black)"
          >
            {row.disponivelAdocao ? 'Disponivel' : 'Adotado'}
          </StatusPill>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Castrado',
      selector: (row) => (
        <div>
          {row.disponivelAdocao ? (
            <IoCheckmarkCircleSharp
              color="var(--color-support-green)"
              size={24}
            />
          ) : (
            <IoCloseCircleSharp color="var(--color-support-red)" size={24} />
          )}
        </div>
      ),
      sortable: true,
      center: true,
    },
  ];

  const handleGatoUpdate = (updatedGato) => {
    const updatedGatos = gatos.map((gato) =>
      gato.id === updatedGato.id ? updatedGato : gato,
    );
    dispatch({ type: 'SET_GATOS', payload: updatedGatos });
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
  };

  return (
    <>
      <Helmet>
        <title>Administração de Gatos | Gatinhos Admin</title>
      </Helmet>
      <div className={styles.pagesMargin}>
        <div className={styles.titleContainer}>
          <h2 className="text-display">Gatos</h2>
        </div>

        <Container style={{ width: '1224px' }}>
          <div className={styles.subtitleDescription}>
            <p className={`${styles.adminSubtitle} text-body1`}>
              Lista de gatos
            </p>
            <p className="text-body1">
              Consulte os registros dos gatos cadastrados e realize ações como
              editar, excluir ou adicionar novos.
            </p>
          </div>

          <div className={styles.headerActions}>
            <div style={{ width: '324px' }}>
              <SearchArea onChange={handleSearch} />
            </div>
            <Button
              variant="secondary"
              size="medium"
              onClick={() => navigate('/admin/gatos/cadastro')}
            >
              Cadastrar Gato
            </Button>
          </div>
          <Table
            columns={columns}
            data={filteredData.length === 0 ? gatos : filteredData}
            onDelete={(gato) =>
              dispatch({ type: 'OPEN_MODALCONFIRM', payload: gato })
            }
            onEdit={(gato) => handleEditClick(gato)}
          />
          <Modal
            open={openModalConfirm}
            onClose={() => dispatch({ type: 'CLOSE_MODALCONFIRM' })}
          >
            <div className={styles.deleteModalContent}>
              <p>Tem certeza que deseja excluir este gato?</p>
              <div className={styles.deleteModalActions}>
                <Tooltip text="Apenas Admin podem excluir gato">
                  <Button
                    size="small"
                    variant="danger"
                    onClick={handleDelete}
                    disabled={!isAdmin}
                  >
                    Excluir
                  </Button>
                </Tooltip>
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => dispatch({ type: 'CLOSE_MODALCONFIRM' })}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal>
          {openEditModal && (
            <Modal
              open={openEditModal}
              onClose={() => dispatch({ type: 'CLOSE_EDIT_MODAL' })}
            >
              <GatosEdit
                gatos={selectedGato}
                onGatoUpdate={handleGatoUpdate}
                onClose={() => dispatch({ type: 'CLOSE_EDIT_MODAL' })}
              />
            </Modal>
          )}
        </Container>
      </div>
    </>
  );
}
