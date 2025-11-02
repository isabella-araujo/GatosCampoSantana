import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminCommon.module.css';
import { useContext, useEffect, useReducer, useState } from 'react';
import {
  disableVoluntario,
  getVoluntarios,
} from '../../../services/voluntariosServices';
import { search } from '../../../utils/searchUtils';
import {
  Container,
  SearchArea,
  Table,
  Modal,
  Button,
  Tooltip,
} from '../../../components';
import { AuthContext } from '../../../contexts/AuthContext';

const initialState = {
  voluntarios: [],
  openModalConfirm: false,
  selectedVoluntario: null,
};

function voluntariosReducer(state, action) {
  switch (action.type) {
    case 'SET_VOLUNTARIOS':
      return { ...state, voluntarios: action.payload };
    case 'OPEN_MODALCONFIRM':
      return {
        ...state,
        openModalConfirm: true,
        selectedVoluntario: action.payload,
      };
    case 'CLOSE_MODALCONFIRM':
      return { ...state, openModalConfirm: false, selectedVoluntario: null };
    default:
      return state;
  }
}

export default function Voluntarios() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(voluntariosReducer, initialState);
  const { voluntarios, openModalConfirm, selectedVoluntario } = state;
  const [filteredData, setFilteredData] = useState([]);
  const { role } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(role === 'admin');

  useEffect(() => {
    setIsAdmin(role === 'admin');
  }, [role]);

  useEffect(() => {
    fetchVoluntarios();
  }, []);

  async function fetchVoluntarios() {
    const { voluntarios, error } = await getVoluntarios();

    if (!error) {
      dispatch({ type: 'SET_VOLUNTARIOS', payload: voluntarios });
    } else {
      console.error('Erro ao buscar voluntários:', error);
    }
  }

  const handleDelete = async () => {
    if (!selectedVoluntario) return;
    try {
      await disableVoluntario(
        selectedVoluntario.id,
        !selectedVoluntario.disabled,
      );
      await fetchVoluntarios();
      dispatch({ type: 'CLOSE_MODALCONFIRM' });
      console.log('Voluntário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar voluntário:', error.message);
      alert(
        'Não foi possível atualizar o status do voluntário. Tente novamente.',
      );
    }
  };

  const columns = [
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Senha', selector: (row) => row.senha, sortable: true },
  ];

  const handleSearch = (query) => {
    setFilteredData(search(voluntarios, 'email', query));
  };

  return (
    <div className={styles.pagesMargin}>
      <div className={styles.titleContainer}>
        <h2 className="text-display">Voluntários</h2>
      </div>

      <Container style={{ width: '1224px' }}>
        <div className={styles.subtitleDescription}>
          <p className={`${styles.adminSubtitle} text-body`}>
            Lista de voluntários
          </p>
          <p className="text-body">
            Consulte os dados dos voluntários cadastrados e acesse ações como
            exclusão e cadastro de novos membros.
          </p>
        </div>

        <div className={styles.headerActions}>
          <div style={{ width: '324px' }}>
            <SearchArea onChange={handleSearch} />
          </div>
          <Tooltip text="Apenas Admin podem cadastrar voluntário">
            <Button
              variant="secondary"
              size="medium"
              onClick={() => navigate('cadastro')}
              disabled={!isAdmin}
            >
              Cadastrar Voluntário
            </Button>
          </Tooltip>
        </div>
        {!isAdmin ? (
          <p
            className="text-body"
            style={{
              color: 'var(--color-support-red)',
              textAlign: 'center',
              marginTop: '32px',
            }}
          >
            Apenas administradores tem acesso aos voluntários.
          </p>
        ) : (
          <>
            <Table
              columns={columns}
              data={filteredData.length === 0 ? voluntarios : filteredData}
              onBlock={(v) =>
                dispatch({ type: 'OPEN_MODALCONFIRM', payload: v })
              }
            />

            <Modal
              open={openModalConfirm}
              onClose={() => dispatch({ type: 'CLOSE_MODALCONFIRM' })}
            >
              <div className={styles.deleteModalContent}>
                <p>Tem certeza que deseja desativar este voluntário?</p>
                <div className={styles.deleteModalActions}>
                  <Button size="small" variant="danger" onClick={handleDelete}>
                    Desativar
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
          </>
        )}
      </Container>
    </div>
  );
}
