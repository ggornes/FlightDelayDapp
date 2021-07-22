import PolizaRetraso from '../artifacts/contracts/PolizaRetraso.sol/PolizaRetraso.json'
import { useState } from 'react';

import { ethers } from 'ethers'

const polizaRetrasoAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"

function PolizaContract() {

    const [prima, setPrimaValue] = useState('')
    const [factor, setFactorValue] = useState('')

    async function fetchPolizas() {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum); // make sure it is connected to metamask
          const contract = new ethers.Contract(polizaRetrasoAddress, PolizaRetraso.abi, provider)
    
          try {
            const polizasTodas = await contract.getPolizasTodas()
            console.log('data: ', contract.pols(polizasTodas))
          } catch (err) {
            console.log('Error: ', err)
          }
        }
      };

      async function fetchSolicitadas() {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum); // make sure it is connected to metamask
          const contract = new ethers.Contract(polizaRetrasoAddress, PolizaRetraso.abi, provider)
    
          try {
            const solicitadas = await contract.getPolizasSolicitadas()
            console.log('data: ', solicitadas)
          } catch (err) {
            console.log('Error: ', err)
          }
        }
      };      

      async function solicitarPoliza() {
        if (!prima || !factor) return // check that prima and factor are not empty
        if (typeof window.ethereum !== 'undefined') {
          // await requestAccount();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(polizaRetrasoAddress, PolizaRetraso.abi, signer);
          const transaction = await contract.solicitarPol(ethers.utils.parseEther(factor), {value: prima});
          setFactorValue('')
          setPrimaValue('')
          await transaction.wait()
          fetchPolizas();
        }
      };
      




    return(
        <>
            <button onClick={fetchPolizas}>Fetch Polizas</button>
            <br />
            <button onClick={fetchSolicitadas}>Fetch Solicitadas</button>

            <p>Solicitar poliza</p>
            <input
            onChange={e => setFactorValue(e.target.value)}
            placeholder="Factor"
            value={factor}
          />            
            <input
            onChange={e => setPrimaValue(e.target.value)}
            placeholder="Prima"
            value={prima}
          />
          <button onClick={solicitarPoliza}>Solicitar Poliza</button>

        </>

    )
}

export default PolizaContract