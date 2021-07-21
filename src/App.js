import './App.css';

import Web3ConnectionManager from './components/Web3ConnectionManager';
import SampleContracts from './components/SampleContracts';



function App() {




  return (


    



      <div className="App">
      <Web3ConnectionManager />
        <div className="App-header">
          <SampleContracts/>
        </div>
      </div>


    
  );
}

export default App;
