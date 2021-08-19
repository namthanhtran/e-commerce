import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm/RegisterForm';

Register.propTypes = {
  
};

function Register(props) {

  const handleFormSubmit = (formValues) => {
    console.log('Form submit: ', formValues);
  }
  return (
    <div>
      <RegisterForm onSubmit={handleFormSubmit}/>
    </div>
  );
}

export default Register;