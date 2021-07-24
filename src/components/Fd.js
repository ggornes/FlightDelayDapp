import FdContract from '../artifacts/contracts/FdContract.sol/FdContract.json'
import { useState } from 'react';

import { ethers } from 'ethers'

import Policy from '../UI_models/Policy/Policy'


const fdContractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"

function Fd() {

  const [premium, setPremiumValue] = useState('')
  const [riskFactor, setRiskFactorValue] = useState('')
  const [policyId, setPolicyIdValue] = useState('')
  const [allPolicies, setAllPoliciesValue] = useState([])



  async function newPolicy() {
    if (!premium || !riskFactor) return // check that premium and risk factor are not empty

    if (typeof window.ethereum !== 'undefined') {
      // await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(fdContractAddress, FdContract.abi, signer);
      const transaction = await contract.newPolicy(ethers.utils.parseEther(riskFactor), {value: premium});
      setRiskFactorValue('')
      setPremiumValue('')
      await transaction.wait()
    }

    // fetchPoliciesView()
    getPolicyItems()
  };

  async function insurePolicy(_id) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // make sure it is connected to metamask
      const signer = provider.getSigner();
      const contract = new ethers.Contract(fdContractAddress, FdContract.abi, signer)

      const submitedPolicy = await fetchPolicyById(_id)
      console.log("submited policy id: ", submitedPolicy[0].id)
      console.log("submited policy premium: ", submitedPolicy[0].premium.toString())
      console.log("submited policy maxClaimAmount: ", submitedPolicy[0].maxClaimAmount.toString())

      try {
        const transaction = await contract.insurePolicy(submitedPolicy[0].id, {value: submitedPolicy[0].maxClaimAmount});
        setPolicyIdValue('')
        await transaction.wait()
        console.log("Policy was succesfully covered")
        
      } catch (err) {
        console.log('Error: ', err)
      }
    }

  }

  // todo: look how to create a subgraph https://thegraph.com/docs/developer/quick-start

  async function fetchPolicies() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // make sure it is connected to metamask
      const contract = new ethers.Contract(fdContractAddress, FdContract.abi, provider)
      try {
        const policies = await contract.getPolicies()
        console.log('Contract policies: ', policies)
        return (policies)

        const policyItems = policies.map(makePolicyItems) // await ?
        console.log('Sweet policies: ', policyItems)
        // return PolicyItems

      } catch (err) {
        console.log('Error: ', err)
      }          
    }
  }

  // function to parse policies read from the contract into a UI types class to handle data views
  const makePolicyItems = policyItem => new Policy(policyItem);

  async function getPolicyItems() {
    const policies = await fetchPolicies()
    const policyItems = policies.map(makePolicyItems)
    console.log(policyItems)
    policyItems.map(m => {console.log(m.data)})
    setAllPoliciesValue(policyItems)
  }

  async function fetchPoliciesView() {
    const policies = await fetchPolicies()
    console.log(policies.length)
    var policiesViewPromise = [];
    var counter = 0;


    const policiesView = policies.map(p => {return new Policy(p)})


    // policiesView = await policies.map(async p => {
    //   // console.log(p)
    //   // console.log(p.id.toString())
    //   // const pView = await fetchPolicyByIdView(p.id.toString())
    //   const pView = await fetchPolicyByIdView(p.id.toString())
    //   console.log("p view ", pView)
    //   policiesView.push(pView)
    //   console.log("Poliocies view", policiesView)
    //   // setAllPoliciesValue(policiesView);
    //   counter++;
    //   console.log("counter ", counter )
    //   // return policiesView
    // })


    console.log("Poliocies view 2 ", policiesView)
    // setAllPoliciesValue(policiesView);
    return policiesView
  }  

  async function fetchPolicyById(_id) {
    const policies = await fetchPolicies()
    try {
      const selectedPolicy = policies.filter(
        policy => {
          return policy.id == _id // Todo: Check types and use === 
        }
      )
      console.log('Selected policy: ', selectedPolicy)
      return (selectedPolicy)
    } catch (err) {
      console.log('Error: ', err)
    }
  }      
      
      



  async function fetchPolicyByIdView(_id) {
    const policy = await fetchPolicyById(_id)
    const policyView = new Policy(policy)
    console.log("policy view data: ", policyView.data)
    return policyView.data
  }


  
      




  return(
      <>
          <button onClick={fetchPolicies}>Fetch Polizas</button>
          <button onClick={fetchPoliciesView}>Fetch Polizas pretty</button>
          <button onClick={getPolicyItems}>Fetch Polizas pretty</button>
          <br />
          <div>
          <ul>
            {
              allPolicies.map((p, index) => {
                return (
                  <li key={index}>
                    <p>{p.data.id} | {p.data.premium/100000000000000000} | {p.data.maxClaimAmount/1000000000000000000000000000}</p>
                  </li>
                );
              })
            }
          </ul>
          </div>
          

          <p>New Policy</p>
          <input
          onChange={e => setRiskFactorValue(e.target.value)}
          placeholder="Risk factor"
          value={riskFactor}
          />            
          <input
          onChange={e => setPremiumValue(e.target.value)}
          placeholder="Premium"
          value={premium}
          />

          <button onClick={newPolicy}>Create new policy</button>
          <br />

          <p>Insure Policy</p>
          <input
          onChange={e => setPolicyIdValue(e.target.value)}
          placeholder="Policy Id"
          value={policyId}
          />
          <button onClick={() => fetchPolicyById(policyId)}>View Policy</button>
          <button onClick={() => fetchPolicyByIdView(policyId)}>View Policy pretty</button>
          <button onClick={() => insurePolicy(policyId)}>Insure policy</button>



      </>

  )
}

export default Fd