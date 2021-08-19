import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const control = form;
  
  return (
    <>
      <Controller 
        name={name}
        control={control}
        render={({
          field: {onChange, onBlur, value, name},
          fieldState: {invalid, error},
        }) => (
          <TextField 
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            value={value}
            name={name}
            disabled={disabled}
            error={invalid}
            helperText={error?.message}
          />
        )}
      /> 
    </>
  );
}

export default InputField;