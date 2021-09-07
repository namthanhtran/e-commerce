import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import QuantityField from 'component/FormControls/QuantityField/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  avatar: {
    width: "70px",
    height: "70px",
    margin: '20px auto',
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 2),
    width: '200px',
  },
}));

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({onSubmit = null}) {

  const classes = useStyles();
  const schema = yup.object().shape({
    
    quantity: yup
            .number()
            .min(1, 'Please enter at least 1') 
            .required('Please enter quantity')
            .typeError('Please enter a number'),    
  });
  const form = useForm({
    defaultValues: {
      quantity: '1'
    },
    resolver: yupResolver(schema),
  });

  
  const handleSubmit = async(values) => {
    if(onSubmit){
      await onSubmit(values);
    }

    form.reset();
  }
  
  const { isSubmitting } = form.formState;

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
          <QuantityField form={form} name='quantity' label='Quantity' />
         
          <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" className={classes.submit} >
            Buy
          </Button>

        </form> 
    </div>
  );
}

export default AddToCartForm;