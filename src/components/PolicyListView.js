import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(policyId, policyholder, premium, insurer, maxClaimAmount) {
  return { policyId, policyholder, premium, insurer, maxClaimAmount };
}


export default function BasicTable({policyList}) {
  const rows = []
  console.log("data passed to child: ", policyList)
  policyList.map(m => {rows.push(createData(m.data.id, m.data.policyholder, m.data.premium, m.data.insurer, m.data.maxClaimAmount))})
  // policyList.map(m => {console.log(m.data.id)})
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Policy ID</TableCell>
            <TableCell align="right">policyholder</TableCell>
            <TableCell align="right">premium &nbsp;(ETH)</TableCell>
            <TableCell align="right">insurer</TableCell>
            <TableCell align="right">maxClaimAmount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.policyId}>
              <TableCell component="th" scope="row">
                {row.policyId}
              </TableCell>
              <TableCell align="right">{row.policyholder.substring(0,6)+"..."+row.policyholder.substring(row.policyholder.length-7)}</TableCell>
              <TableCell align="right">{row.premium}</TableCell>
              <TableCell align="right">{row.insurer.substring(0,6)+"..."+row.insurer.substring(row.insurer.length-7)}</TableCell>
              <TableCell align="right">{row.maxClaimAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
