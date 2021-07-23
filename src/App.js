import './App.css';

import Web3ConnectionManager from './components/Web3ConnectionManager';
import SampleContracts from './components/SampleContracts';
import PolizaContract from './components/PolizaContract';
import Fd from './components/Fd'



function App() {




  return (


    



      <div className="App">
      <Web3ConnectionManager />
        <div className="App-header">
          {/* <SampleContracts/> */}
          {/* <PolizaContract /> */}
          <Fd/>
        </div>
      </div>


    
  );
}

export default App;
