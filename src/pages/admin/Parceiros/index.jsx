import styles from '../styles/AdminCommon.module.css';
import { useEffect, useReducer, useState } from 'react';
import {
  deleteParceiro,
  getParceiros,
  toggleParceiroStatus,
} from '../../../services/parceirosServices';
import { search } from '../../../utils/searchUtils';
import { useNavigate } from 'react-router-dom';
import ParceirosEdit from './ParceirosEdit';
import {
  Container,
  SearchArea,
  Table,
  StatusPill,
  Button,
  Modal,
} from '../../../components';

const initialState = {
  parceiros: [],
  openEditModal: false,
  openModalConfirm: false,
  selectedParceiro: null,
};

function parceirosReducer(state, action) {
  switch (action.type) {
    case 'SET_PARCEIROS':
      return { ...state, parceiros: action.payload };
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        openEditModal: true,
        selectedParceiro: action.payload,
      };
    case 'CLOSE_EDIT_MODAL':
      return { ...state, openEditModal: false, selectedParceiro: null };
    case 'OPEN_MODALCONFIRM':
      return {
        ...state,
        openModalConfirm: true,
        selectedParceiro: action.payload,
      };
    case 'CLOSE_MODALCONFIRM':
      return { ...state, openModalConfirm: false, selectedParceiro: null };
    default:
      return state;
  }
}

export default function Parceiros() {
  const [state, dispatch] = useReducer(parceirosReducer, initialState);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const { parceiros, openEditModal, openModalConfirm, selectedParceiro } =
    state;

  useEffect(() => {
    fetchParceiros();
  }, []);

  async function fetchParceiros() {
    try {
      const parceiros = await getParceiros();

      if (Array.isArray(parceiros)) {
        dispatch({ type: 'SET_PARCEIROS', payload: parceiros });
      } else {
        console.error('Erro ao buscar parceiros: retorno inválido', parceiros);
      }
    } catch (error) {
      console.error('Erro inesperado ao buscar parceiros:', error);
    }
  }

  function handleSearch(query) {
    setFilteredData(search(parceiros, 'nome', query));
  }

  const handleDelete = async () => {
    if (selectedParceiro) {
      await deleteParceiro(selectedParceiro.id);
      fetchParceiros();
      dispatch({ type: 'CLOSE_MODALCONFIRM' });
    }
  };

  const handleEditClick = (parceiro) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: parceiro });
  };

  const handleStatusClick = async (row) => {
    try {
      const updatedStatus = await toggleParceiroStatus(row.id, row.ativo);
      const updatedParceiros = parceiros.map((parceiro) =>
        parceiro.id === row.id
          ? { ...parceiro, ativo: updatedStatus }
          : parceiro,
      );
      dispatch({ type: 'SET_PARCEIROS', payload: updatedParceiros });
    } catch (error) {
      console.error('Erro ao atualizar status do parceiro:', error);
    }
  };

  const columns = [
    {
      name: 'Nome',
      selector: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <img src={row.logoURL} alt={row.nome} width="50" />
          <span>{row.nome}</span>
        </div>
      ),
      sortable: true,
    },

    { name: 'Site', selector: (row) => row.site, sortable: true },
    { name: 'Descrição', selector: (row) => row.descricao, sortable: true },
    {
      name: 'Status',
      selector: (row) => (
        <div
          onClick={() => handleStatusClick(row)}
          style={{ cursor: 'pointer' }}
        >
          <StatusPill
            bgColor={
              row.ativo ? 'rgba(91, 190, 114, 0.5)' : 'rgba(254, 50, 49, 0.5)'
            }
            textColor="var(--color-neutral-black)"
          >
            {row.ativo ? 'Ativo' : 'Inativo'}
          </StatusPill>
        </div>
      ),
      sortable: true,
    },
  ];

  const handleParceiroUpdate = (updatedParceiro) => {
    const updatedParceiros = parceiros.map((parceiro) =>
      parceiro.id === updatedParceiro.id ? updatedParceiro : parceiro,
    );
    dispatch({ type: 'SET_PARCEIROS', payload: updatedParceiros });
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
  };

  return (
    <div className={styles.pagesMargin}>
      <div className={styles.titleContainer}>
        <h2 className="text-display">Parceiros</h2>
      </div>

      <Container style={{ width: '1224px' }}>
        <div className={styles.subtitleDescription}>
          <p className={`${styles.adminSubtitle} text-body`}>
            Lista de parceiros
          </p>
          <p className="text-body">
            Consulte os registros dos parceiros cadastrados e realize ações como
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
            onClick={() => navigate('cadastro')}
          >
            Cadastrar Parceiro
          </Button>
        </div>
        <Table
          columns={columns}
          data={filteredData.length === 0 ? parceiros : filteredData}
          onDelete={(parceiro) =>
            dispatch({ type: 'OPEN_MODALCONFIRM', payload: parceiro })
          }
          onEdit={(parceiro) => handleEditClick(parceiro)}
        />

        <Modal
          open={openModalConfirm}
          onClose={() => dispatch({ type: 'CLOSE_MODALCONFIRM' })}
        >
          <div className={styles.deleteModalContent}>
            <p>Tem certeza que deseja excluir este parceiro?</p>
            <div className={styles.deleteModalActions}>
              <Button size="small" variant="danger" onClick={handleDelete}>
                Excluir
              </Button>
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
            <ParceirosEdit
              parceiros={selectedParceiro}
              onParceiroUpdate={handleParceiroUpdate}
              onClose={() => dispatch({ type: 'CLOSE_EDIT_MODAL' })}
            />
          </Modal>
        )}
      </Container>
    </div>
  );
}
