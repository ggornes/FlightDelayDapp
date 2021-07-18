import { useState } from 'react';
import { ethers } from 'ethers'
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import { WindowsBalloon } from 'node-notifier';

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"


function App() {
  const [greeting, setGreetingValue] = useState('')

  // connect to metamask wallet
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts'});
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // make sure it is connected to metamask
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  };

  async function setGreeting() {
    if (!greeting) return // check that greeting message is not empty
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      setGreetingValue('')
      await transaction.wait()
      fetchGreeting();
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={e => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
          value={greeting}
        />


      </header>
    </div>
  );
}

export default App;
