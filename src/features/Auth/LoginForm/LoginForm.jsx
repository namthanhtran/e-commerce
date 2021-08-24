import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import InputField from 'component/FormControls/InputField/InputField';
import PasswordField from 'component/FormControls/PasswordField/PasswordField';
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
    margin: theme.spacing(3, 0, 2),
  },
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm( {onSubmit} ) {
  const classes = useStyles();

  const schema = yup.object().shape({
    
    identifier: yup
            .string()
            .required('Please enter email') 
            .email('Please enter a valid email'),    
    password: yup
              .string()
              .required('Please enter password')
              .min(6, 'Password must be least 6 character'),
  });
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
        {isSubmitting && <LinearProgress />}

        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Sign In
        </Typography>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField form={form} name='identifier' label='Email' />
          <PasswordField form={form} name='password' label='Password' />
         
          <Button disabled={isSubmitting} type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
            Sign in
          </Button>

        </form> 
    </div>
  );
}

export default LoginForm;