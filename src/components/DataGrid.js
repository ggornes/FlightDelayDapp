import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import Policy from '../UI_models/Policy/Policy';

import { useContext } from 'react'
import { AppContext } from '../App'


function createData(id, policyholder, premium, insurer, maxClaimAmount) {
  return { id, policyholder, premium, insurer, maxClaimAmount };
}





export default function RenderCellGrid({policyList, insurePolicy}) {

  const {state, dispatch} = useContext(AppContext);

  const handleClick = (policyId) => {
    console.log("Policy selected: ", policyId)
    insurePolicy(policyId)
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Policy ID',
      width: 150,
      renderCell: (params) => (
        <span>
          {params.row.id}
        </span>
      )
    },
  
    {
      field: 'policyholder',
      headerName: 'Policy Holder',
      width: 150,
      renderCell: (params) => (
        <span>
          {params.row.policyholder}
        </span>
      )
    },
  
    {
      field: 'premium',
      headerName: 'Premium',
      width: 150,
      renderCell: (params) => (
        <span>
          {params.row.premium}
        </span>
      )
    },  
  
  
    {
      field: 'insurer',
      headerName: 'Insured by',
      width: 150,
      renderCell: (params) => (
        <span>
          {params.row.insurer}
        </span>
      )
    },
  
    {
      field: 'maxClaimAmount',
      headerName: 'Max Claim',
      width: 150,
      renderCell: (params) => (
        <span>
          {params.row.maxClaimAmount}
        </span>
      )
    },    
  
    {
      field: 'action',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <span>
          <Button
            // make button disabled if policy is already insured or if policy holder is same as current account address
            disabled={params.row.policyholder.toString().toLowerCase() === state.accountDetails.newAddress.toString().toLowerCase() || params.row.insurer !== "0x0000000000000000000000000000000000000000"}
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={()=>{
              return(                
                handleClick(params.row.id)
              )
              
            }}
            // onClick={()=>{console.log(params)}}
          >
            Cover
          </Button>
        </span>
      ),
    },
  
  ];






  const rows = []


  console.log("Data passed from Fd to DataGrid: ", policyList)
  policyList.map(m => {
    rows.push(
      createData(
        m.data.id,
        m.data.policyholder,
        m.data.premium,
        m.data.insurer,
        m.data.maxClaimAmount
    ))
  })
  console.log(rows)

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
