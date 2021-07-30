import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import Policy from '../UI_models/Policy/Policy';




function createData(id, policyholder, premium, insurer, maxClaimAmount) {
  return { id, policyholder, premium, insurer, maxClaimAmount };
}





export default function RenderCellGrid({policyList, insurePolicy}) {

  const handleClick = (policyId) => {
    //selectPolicyId(policyId)
    console.log("Policy selected: ", policyId)
    // console.log("Policy selected: ", selectedPolicy)
    // const selection = getSelectedPolicy()
    // console.log("Selection: ", selection)
    
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
          {params.row.id}
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={()=>{
              console.log("PAPARAAAAMS ", params)
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





  const rows2 = []
  const rows = []
  // const rows = [
  //   {
  //     id: 1,
  //     date: new Date(1979, 0, 1),
  //   },
  //   {
  //     id: 2,
  //     date: new Date(1984, 1, 1),
  //   },
  //   {
  //     id: 3,
  //     date: new Date(1992, 2, 1),
  //   },
  // ];

  // const rows = [
  //   {id: 1, policyholder: "0x3f3...332", premium: 1.23, insurer: "0x1a2z...9d8", maxClaimAmount: 5.32}
  // ]

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
  // console.log(rows2)
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
