import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

function valueLabelFormat(value) {
//   const [coefficient, exponent] = value
//     .toExponential()
//     .split('e')
//     .map((item) => Number(item));
//   return `${Math.round(coefficient)}e^${exponent}`;
  return `${value.toFixed(2)}`;
}


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


  

export default function PremiumSlider({updatePremium, updateRiskFactor}) {
  const [premiumValue, setValue] = React.useState(0.0001);
  const [riskFactorValue, setRiskFactorValue] = React.useState(10000)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    updatePremium(newValue.toString())
  };

  const handleRiskFactorChange = (e, newValue) => {
      console.log(newValue)
      setRiskFactorValue(newValue)
      updateRiskFactor(newValue.toString())
  }

  const classes = useStyles();
  

  return (
    <div>
      <Typography id="non-linear-slider" gutterBottom>
        Premium
      </Typography>
      <Slider
        value={premiumValue}
        min={0.0001}
        step={0.0001}
        max={25}
        // scale={(x) => x ** 10}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <form className={classes.root} noValidate autoComplete="off">
        {/* <TextField id="standard-basic" label="Standard" />
        <TextField id="filled-basic" label="Filled" variant="filled" /> */}
        <TextField id="premium" label="Premium" variant="outlined" fullWidth value={premiumValue} />
        {/* <TextField id="outlined-basic" label="Risk Factor" variant="outlined" fullWidth onChange={handleRiskFactorChange} value={riskFactorValue}/> */}
        <TextField id="riskFactor" label="Risk Factor" variant="outlined" fullWidth onChange={e => updateRiskFactor(e.target.value)}/>
      </form>
    </div>
  );
}