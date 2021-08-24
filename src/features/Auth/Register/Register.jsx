import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm/RegisterForm';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleFormSubmit = async(formValues) => {
    try { 
      // auto set username = email
      formValues.username = formValues.email;

      const action = register(formValues);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction); 
      console.log('New user: ', user);
      const {closeDialog} = props;
      if(closeDialog){
        closeDialog();
      }
      enqueueSnackbar('Register Successfully !!!', {variant: 'success'});

    } catch (error) {
      console.log('Failed to register:', error);
      enqueueSnackbar(error.message, {variant: 'error'});
    }
  }
  return (
    <div>
      <RegisterForm onSubmit={handleFormSubmit}/>
    </div>
  );
}

export default Register;