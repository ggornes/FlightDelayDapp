import FdContract from '../artifacts/contracts/FdContract.sol/FdContract.json'
import { useState } from 'react';

import { ethers } from 'ethers'

const fdContractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"

function Fd() {

    const [premium, setPremiumValue] = useState('')
    const [riskFactor, setRiskFactorValue] = useState('')



      async function newPolicy() {
        if (!premium || !riskFactor) return // check that premium and risk factor are not empty
        if (typeof window.ethereum !== 'undefined') {
          // await requestAccount();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(fdContractAddress, FdContract.abi, signer);
          const transaction = await contract.createNewPolicy(ethers.utils.parseEther(riskFactor), {value: premium});
          setRiskFactorValue('')
          setPremiumValue('')
          await transaction.wait()
        }
      };

      // todo: get function working on the contract

      // async function fetchPolicies() {
      //   if (typeof window.ethereum !== 'undefined') {
      //     const provider = new ethers.providers.Web3Provider(window.ethereum); // make sure it is connected to metamask
      //     const contract = new ethers.Contract(fdContractAddress, FdContract.abi, provider)
    
      //     try {
      //       const polizas = await contract.getPolicies()
      //       console.log('data: ', contract.pols(polizasTodas))
      //     } catch (err) {
      //       console.log('Error: ', err)
      //     }
      //   }
      // }
      




    return(
        <>
            {/* <button onClick={fetchPolizas}>Fetch Polizas</button>
            <br />
            <button onClick={fetchSolicitadas}>Fetch Solicitadas</button> */}

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

        </>

    )
}

export default Fd