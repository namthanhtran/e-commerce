import { unwrapResult } from '@reduxjs/toolkit';
import { login, register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm/LoginForm';

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleFormSubmit = async(formValues) => {
    try { 
      const action = login(formValues);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction); 
      console.log('New user: ', user);
      const {closeDialog} = props;
      if(closeDialog){
        closeDialog();
      }

    } catch (error) {
      console.log('Failed to register:', error);
      enqueueSnackbar(error.message, {variant: 'error'});
    }
  }
  return (
    <div>
      <LoginForm onSubmit={handleFormSubmit}/>
    </div>
  );
}

export default Login;