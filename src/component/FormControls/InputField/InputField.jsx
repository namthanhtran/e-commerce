import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disable } = props;
  const { control } = form;
  
  return (
    <>
      <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name }, 
        fieldState: { invalid, error } 
      }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth

          name={name}
          value={value}
          label={label}
          error={invalid}
          disabled={disable}
          onChange={onChange}
          onBlur={onBlur}
          helperText={error?.message}
        />
      )}
    />
    </>
  );
}

export default InputField;