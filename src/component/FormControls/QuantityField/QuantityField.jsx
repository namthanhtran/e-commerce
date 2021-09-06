import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  error: {
    color: 'red'
  },
  box: {
    marginTop: theme.spacing(2),
    display: 'flex',
    width: '200px'
  }
}))

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, disable } = props;
  const { control, formState: {errors}, setValue } = form;

  return (
    <>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel htmlFor={name}/>
        <Typography style={{padding: '0 20px'}}>Quantity</Typography>
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, onBlur, value, name }, 
            fieldState: { invalid, error } 
            }) => (
              <Box className={classes.box}>

                <IconButton onClick={() => setValue(name,Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
                  <RemoveCircleOutlineIcon/>
                </IconButton>

                <OutlinedInput
                  variant="outlined"
                  fullWidth
                  type="number"
                  name={name}
                  value={value}
                  
                  error={invalid}
                  onChange={onChange}
                  onBlur={onBlur}
                  disabled={disable}
                />

                <IconButton onClick={() => setValue(name,Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
                  <AddCircleOutlineIcon />
                </IconButton>

              </Box>
            )}
          />
          <FormHelperText className={classes.error}>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </>
  );
}

export default QuantityField;