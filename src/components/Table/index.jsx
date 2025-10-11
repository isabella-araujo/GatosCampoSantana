import DataTable from 'react-data-table-component';
import { IoTrashOutline } from 'react-icons/io5';
import { IoPencilOutline } from 'react-icons/io5';
import { IoBanOutline } from 'react-icons/io5';
import IconButton from '../IconButton';
import './styles.css';

const Table = ({
  columns = [],
  data = [],
  selectable = true,
  showActions = true,
  showDate = true,
  onEdit,
  onDelete,
  onBlock,
}) => {
  const colmnsDefault = [];

  if (showDate) {
    colmnsDefault.push({
      name: 'Cadastro',
      selector: (row) => row.createdAt,
      sortable: true,
      format: (row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleDateString('pt-BR')
          : 'DD/MM/AAAA',
    });
  }

  if (showActions) {
    colmnsDefault.push({
      name: ' ',
      cell: (row) => (
        <div>
          {onEdit && (
            <IconButton
              icon={IoPencilOutline}
              color="var(--color-neutral-black)"
              size={16}
              style={{ padding: '0 2px' }}
              onClick={() => onEdit(row)}
            />
          )}
          {onDelete && (
            <IconButton
              icon={IoTrashOutline}
              color="var(--color-neutral-black)"
              size={16}
              style={{ padding: '0 2px' }}
              onClick={() => onDelete(row)}
            />
          )}
          {onBlock && (
            <IconButton
              icon={IoBanOutline}
              color="var(--color-neutral-black)"
              size={16}
              style={{ padding: '0 2px' }}
              onClick={() => onBlock(row)}
            />
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
  }

  const allColumns = [...columns, ...colmnsDefault];

  if (data && data.length > 0) {
    return (
      <div className="table-container">
        <DataTable
          columns={allColumns}
          data={data}
          pagination
          highlightOnHover
          striped
          responsive
          fixedHeader
          selectableRows={selectable}
          selectableRowsHighlight={selectable}
          noDataComponent="Nenhum registro encontrado"
          className="table-container"
          customStyles={{
            cells: {
              style: {
                fontSize: 'var(--font-overline-size)',
                color: 'var(--color-neutral-black)',
                borderBottom: '1px solid var(--color-neutral-gray)',
                borderRight: '2px solid var(--color-neutral-gray)',
                '&:last-of-type': {
                  borderRight: 'none',
                },
              },
            },
            headCells: {
              style: {
                backgroundColor: ' var(--color-neutral-gray)',
                fontSize: 'var(--font-overline-size)',
                fontWeight: 'bold',
              },
            },
            pagination: {
              style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'var(--color-neutral-white)',
                borderBottom: 'none',
                fontSize: 'var(--font-overline-size)',
                color: 'var(--color-neutral-black)',
              },
            },
          }}
        />
      </div>
    );
  }
};

export default Table;
