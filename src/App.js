import './App.css';

import Web3ConnectionManager from './components/Web3ConnectionManager';
// import AppBarCustom from './components/AppBarCustom'
// import AppBarElevate from './components/AppBarElevate'
// import SampleContracts from './components/SampleContracts';
// import PolizaContract from './components/PolizaContract';
import AppBarDrawer from './components/AppBarDrawer'
// import Fd from './components/Fd'

// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { useReducer, createContext } from 'react'


export const AppContext = createContext();

const initialState = {

  accountDetails: {
    newAddress: '',
    newBalance: '',
  }



};

function reducer(state, action) {
  switch (action.type) {

          case 'UPDATE_ACCOUNT':
            return {
                accountDetails: action.data
            };          


      default:
          return initialState;
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState);




  return (


    <div className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        <Web3ConnectionManager/>
        <BrowserRouter>
          <AppBarDrawer
            // Web3ConnectionManager={<Web3ConnectionManager/>}
            // Fd={<Fd/>}
          />        
        </BrowserRouter>
        
      </AppContext.Provider>
    
    </div>    


    
  );
}

export default App;
