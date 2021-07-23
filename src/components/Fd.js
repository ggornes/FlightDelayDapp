import FdContract from '../artifacts/contracts/FdContract.sol/FdContract.json'
import { useState } from 'react';

import { ethers } from 'ethers'

const fdContractAddress = "0x998abeb3E57409262aE5b751f60747921B33613E"

function Fd() {

    const [premium, setPremiumValue] = useState('')
    const [riskFactor, setRiskFactorValue] = useState('')
    const [policyId, setPolicyIdValue] = useState('')



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

        fetchPolicies()
      };

      // todo: get function working on the contract

      async function fetchPolicies() {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum); // make sure it is connected to metamask
          const contract = new ethers.Contract(fdContractAddress, FdContract.abi, provider)
          try {
            const policies = await contract.getPolicies()
            console.log('Contract policies: ', policies)
            return (policies)
          } catch (err) {
            console.log('Error: ', err)
          }          
        }
      }

      async function fetchPolicyById() {
        const policies = await fetchPolicies()
        try {
          const selectedPolicy = policies.filter(
            policy => {
              return policy.id == policyId // Todo: Check types and use === 
            }
          )
          console.log('Selected policy: ', selectedPolicy)
          return (selectedPolicy)
        } catch (err) {
          console.log('Error: ', err)
        }
      }      
      
      
      async function insurePolicy(policyId) {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum); // make sure it is connected to metamask
          const signer = provider.getSigner();
          const contract = new ethers.Contract(fdContractAddress, FdContract.abi, signer)

          const submitedPolicy = await fetchPolicyById()
          console.log("submited policy id: ", submitedPolicy[0].id)
          console.log("submited policy premium: ", submitedPolicy[0].premium.toString())
          console.log("submited policy maxClaimAmount: ", submitedPolicy[0].maxClaimAmount.toString())
          const maxClaimAmount = submitedPolicy[0].maxClaimAmount.toString() // be careful with types
          // const bigMaxClaimAmount = ethers.utils.parseEther(maxClaimAmount.toString())
          console.log(maxClaimAmount)
          // console.log(bigMaxClaimAmount)



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
      




    return(
        <>
            <button onClick={fetchPolicies}>Fetch Polizas</button>
            <br />
            

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
            <button onClick={insurePolicy}>Insure policy</button>



        </>

    )
}

export default Fd