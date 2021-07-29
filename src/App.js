import './App.css';

import Web3ConnectionManager from './components/Web3ConnectionManager';
import AppBarCustom from './components/AppBarCustom'
import AppBarElevate from './components/AppBarElevate'
import SampleContracts from './components/SampleContracts';
import PolizaContract from './components/PolizaContract';
import AppBarDrawer from './components/AppBarDrawer'
import Fd from './components/Fd'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';




function App() {




  return (





    <div className="App">
      <AppBarDrawer
        Web3ConnectionManager={<Web3ConnectionManager/>}
        Fd={<Fd/>}
      />
    
    </div>    

    // <div className="App">
    //   <AppBarCustom/>
    //   <Web3ConnectionManager />
    //   <Container maxWidth="sm">
    //     <Box my={4}>
    //     {/* <Typography variant="h4" component="h1" gutterBottom>
    //       Hello there
    //     </Typography> */}
    //       <Fd/>
    //     </Box>
    //   </Container>      
    // </div>




    



      // <div className="App">
      //   <AppBarCustom/>
      //   {/* <AppBarElevate/> */}
      //   <Web3ConnectionManager />
      //   <div className="App-header">
      //     {/* <SampleContracts/> */}
      //     {/* <PolizaContract /> */}
      //     <Fd/>
      //   </div>
      // </div>


    
  );
}

export default App;
