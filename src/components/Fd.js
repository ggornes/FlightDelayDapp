import FdContract from '../artifacts/contracts/FdContract.sol/FdContract.json'
import { useEffect, useState } from 'react';

import { ethers } from 'ethers'

import Policy from '../UI_models/Policy/Policy'

import { Button } from '@material-ui/core';
import DataGrid from './DataGrid'


import PolicyListView from './PolicyListView'
import NewPolicyDialog from './NewPolicyDialog'

import CachedIcon from '@material-ui/icons/Cached';

const fdContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

function Fd() {

  const [premium, setPremiumValue] = useState('')
  const [riskFactor, setRiskFactorValue] = useState('')
  const [policyId, setPolicyIdValue] = useState('')
  const [allPolicies, setAllPoliciesValue] = useState([])
  const [selectedPolicyId, setSelectedPolicyId] = useState('')

  const updatePremium = (premiumValue) => {
    setPremiumValue(premiumValue)
  }

  const updateRiskFactor = (riskFactorValue) => {
    setRiskFactorValue(riskFactorValue)
  }

  // const selectPolicyId = (policyId) => {
  //   setSelectedPolicyId(policyId)
  // }

  function selectPolicyId(policyId) {
    return setSelectedPolicyId(policyId)
  }

  function getSelectedPolicy() {
    return selectedPolicyId
  }


  /**
   * Submit a new policy. Account signature is required
   * @returns 
   */
  async function newPolicy(_premium=premium, _riskfactor=riskFactor) {
    console.log("Creating new policy")
    console.log("premium: ", _premium)
    console.log("Risk factor: ", _riskfactor)

    if (!_premium || !_riskfactor) {
      console.log("_premium: ", _premium)
      console.log("Risk factor: ", _riskfactor)
      return (console.log("Premiun or risk factor could not be read")) // check that premium and risk factor are not empty
    }
     
    if (typeof window.ethereum !== 'undefined') {
      // await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(fdContractAddress, FdContract.abi, signer);
      const transaction = await contract.newPolicy(_riskfactor, {value: ethers.utils.parseEther(_premium)});
      setRiskFactorValue('')
      setPremiumValue('')
      await transaction.wait()
    }

    // fetchPoliciesView()
    getPolicyItems()
  };

  /**
   * Insure a selected policy. Signer is required
   * @param {string} _id 
   */
  async function insurePolicy(_id=selectedPolicyId) {
    console.log("Insuring policy id: ", _id)
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

    getPolicyItems()

  }

  // todo: look how to create a subgraph https://thegraph.com/docs/developer/quick-start

  async function fetchPolicies() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // make sure it is connected to metamask
      const contract = new ethers.Contract(fdContractAddress, FdContract.abi, provider)

      try {
        const policies = await contract.getPolicies()
        // console.log('Contract policies: ', policies)
        return (policies)

        // const policyItems = policies.map(makePolicyItems)
        // console.log('Sweet policies: ', policyItems)
        // return PolicyItems

      } catch (err) {
        console.log('Error: ', err)
      }          
    }
  }




  /**
   * Convert policy object read from FdContract and parse into a more readable Policy type
   * @param {*} policyItem 
   * @returns 
   */
  // function to parse policies read from the contract into a UI types class to handle data views
  const makePolicyItems = policyItem => new Policy(policyItem);


  /**
   * 
   */
  async function getPolicyItems() {
    const policies = await fetchPolicies()
    try {
      const policyItems = policies.map(makePolicyItems) // policies.map(p => makePolicyItems(p))
      // console.log(policyItems)
      // policyItems.map(m => {console.log(m.data)})
      setAllPoliciesValue(policyItems)      
    } catch(err) {
      console.log("Could not fetch policies. Err: ", err)
    }
  }

  /**
   * 
   * @param {*} _id 
   * @returns
   */
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


  // load policy list when component loads
  useEffect(() => {
    getPolicyItems()
  }, [])
      




  return(
      <>

          <Button
            id="policies"
            variant="contained"
            color="primary"
            onClick={()=>{getPolicyItems()}}
            startIcon={<CachedIcon/>}
          >
            Reload Data
          </Button>
          <br />
          {/* <div>
          <PolicyListView policyList={allPolicies} />
          </div> */}
          

          <p>New Policy</p>
          <NewPolicyDialog updatePremium={updatePremium} updateRiskFactor={updateRiskFactor} createNewPolicy={newPolicy}/>
          
          {/* <PremiumSlider updatePremium={updatePremium}/> */}


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

          <DataGrid policyList={allPolicies} insurePolicy={insurePolicy}/>



      </>

  )
}

export default Fd