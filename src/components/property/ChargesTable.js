import React from 'react';
import { withStyles } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import GREY from '@mui/material/colors/grey';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: GREY[600],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function EnhancedTableHead(props) {
  const { headCells } = props;
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <StyledTableCell key={index}>
            {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable(props) {
  const {
    rows,
    headCells,
    handleDelete,
    handleEditClick,
  } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(10);
    setPage(0);
  };


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            headCells={headCells}
            rowCount={rows.length}
          />
          <TableBody>
            {
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <StyledTableRow key={`row${rowIndex}`}>
                      {headCells.map(
                        (headCell, tableCellIndex) => {
                          const tableCellData =
                            row[headCell.id];
                          return (
                            headCell.id === 'edit' ?
                              <TableCell
                                component="th"
                                scope="row"
                                sortDirection={false}
                                key={`edit${tableCellIndex}`}
                              >
                                <Tooltip
                                  title="Edit"
                                  placement="bottom"
                                >
                                  <IconButton
                                    onClick={(event) => {
                                      handleEditClick(rowIndex);
                                    }}
                                    color="primary"
                                    size="small"
                                  >
                                    <EditIcon fontSize="default" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                              : headCell.id === 'delete' ?
                              <TableCell
                                component="th"
                                scope="row"
                                sortDirection={false}
                                key={`delete${tableCellIndex}`}
                              >
                                <Tooltip
                                  title="Delete"
                                  placement="bottom"
                                >
                                  <IconButton
                                    onClick={(event) => {
                                      handleDelete(rowIndex);
                                    }}
                                    color="primary"
                                    size="small"
                                  >
                                    <DeleteIcon fontSize="default" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                              : <StyledTableCell component="th" scope="row" key={`other${tableCellIndex}`}>
                                {tableCellData || "One time"}
                              </StyledTableCell>
                          )
                        }
                      )}
                    </StyledTableRow>
                  );
                })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}