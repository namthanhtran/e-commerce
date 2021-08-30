import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  textTitle: {
    textTransform: 'uppercase',
  },
  boxPrice: {
    display: 'flex',
    alignItems: 'center'
  },
  span: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px'
  },  
  button:{
    marginTop: theme.spacing(2),
  },
  textField: {
    width: '100px'
  }
}))

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({onChange}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleSubmitPrice = () => {
    console.log(values);
    if(onChange) onChange(values);

    // reset values = 0
    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    })
  }
  
  const handlePriceChange = (e) => {
    const {name, value} = e.target; //get value of name salePrice_gte or salePrice_lte
    setValues(prevValues => ({
      ...prevValues,
      [name] : value, // [e.target.name] : [e.target.value]
    }))
  }

  return (
    <Box className={classes.root}>
      <Typography component='span' className={classes.textTitle}>Khoảng giá</Typography>
      <Box className={classes.boxPrice}>
        <TextField  label='Từ'
                    name='salePrice_gte' 
                    value={values.salePrice_gte} 
                    onChange={handlePriceChange}/>
        <span className={classes.span}>-</span>
        <TextField  label='Đến'
                    name='salePrice_lte' 
                    value={values.salePrice_lte} 
                    onChange={handlePriceChange}/>
      </Box>
      <Button className={classes.button}
              variant='outlined' 
              color='primary' 
              onClick={handleSubmitPrice}>
                Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;