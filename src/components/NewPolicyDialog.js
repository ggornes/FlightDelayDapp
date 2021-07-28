import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PremiumSlider from './PremiumSlider';

export default function FormDialog({updatePremium, updateRiskFactor, createNewPolicy}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewPolicy = () => {
    createNewPolicy()
    handleClose()
  }

//   const updatePremium = (premiumValue) => {
//     setPremiumValue(premiumValue)
//   }

  // const [value, setValue] = React.useState(0.0001);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create new policy
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Policy</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}

          <PremiumSlider updatePremium={updatePremium} updateRiskFactor={updateRiskFactor}/>
          
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
          {/* <TextField
            autoFocusid="outlined-basic"
            margin="dense"
            label="Premium"
            variant="outlined"
            value={value}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNewPolicy} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
