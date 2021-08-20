import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../component/FormControls/InputField/InputField';
import PasswordField from '../../../component/FormControls/PasswordField/PasswordField'

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
    margin: theme.spacing(3, 0, 2),
  },
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm( {onSubmit} ) {
  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup
              .string()
              .required('Please enter fullname')
              .test('Should has at least 2 words', 'Please enter least 2 words', (value) =>{
                return value.split(' ').length >= 2;
              }),
    email: yup
            .string()
            .required('Please enter email') 
            .email('Please enter a valid email'),    
    password: yup
              .string()
              .required('Please enter password')
              .min(6, 'Password must be least 6 character'),
    confirmPassword: yup  
                      .string()
                      .required('Please enter confirm password')
                      .oneOf([yup.ref('password')], 'Password does not match')
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if(onSubmit){
      await onSubmit(values);
    }
  }
  
  const { isSubmitting } = form.formState;

  return (
    <div>
        {isSubmitting && <LinearProgress />}

        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Create an account
        </Typography>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField form={form} name='fullName' label='Fullname' />
          <InputField form={form} name='email' label='Email' />
          <PasswordField form={form} name='password' label='Password' />
          <PasswordField form={form} name='confirmPassword' label='Confirm Password' />
         
          <Button disabled={isSubmitting} type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
            Create an account
          </Button>

        </form> 
    </div>
  );
}

export default RegisterForm;