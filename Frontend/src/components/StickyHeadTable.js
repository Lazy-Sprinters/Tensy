import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from 'react-bootstrap'
import {
  Paper,
  Table,
  TableBody,
  TableCell, 
  TableContainer,
  TableHead,
  TablePagination, 
  TableRow 
}
from '@material-ui/core';

const columns = [
  { id: 'ExpiredProduct', label: 'Contract Product', minWidth: 170 ,align:'center'},
  { id: 'FirmName', label: 'Firm Name', minWidth: 100, align:'center'},
  { id: 'CED', label: 'Contract End Date', minWidth: 100, align:'center'},
  { id: 'btn', label: 'Renew RFP', minWidth: 100, align:'center'},
];

function createData(ExpiredProduct, FirmName,CED,btn) {
  return { ExpiredProduct, FirmName,CED,btn};
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 200,
  },
});

export default function StickyHeadTable({arr,handleNewRfp}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [start1, setStart] = React.useState(true);
  const convertToRows = (x) => {
    setStart(false);
    console.log(x);
    let ans = []; 
    if( x==undefined || x.length==0 ){
      ans.push(createData("No Such Contracts Found","-","-","-"));
      setRows(ans);
    }
    else{
      for (let i = 0; i < x.length; i++) {
        ans.push(
          createData(
            x[i].Product,
            x[i].Firm,
            x[i].ContractEndDate,
            x[i].Product
          )
        );
      }
      setRows(ans);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      {start1 && convertToRows(arr)}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if(column.id=="btn" && row[column.id]!="-"){
                      return(
                        <TableCell key={column.id} align={column.align}>
                        <Button 
                          variant="success"
                          onClick={()=>handleNewRfp(value)}
                          style={{boxShadow:'0px 0px 14px 0.3px bisque' , backgroundColor:'white',color:'black',border:"5px solid bisque",marginBottom:"0vh"}}
                        >
                          NEW RFP
                        </Button>
                      </TableCell>
                        );
                    }
                    else
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
