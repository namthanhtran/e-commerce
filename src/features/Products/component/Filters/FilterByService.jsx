import { Box, Checkbox, makeStyles, FormControlLabel, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  textTitle: {
    textTransform: 'uppercase',
  },
  menu: {
    listStyleType: 'none',
    padding: '0'
  }
}))

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterByService(props) {
  const classes = useStyles();
  const {filters = {}, onChange} = props;

  const handleChange = (e) => {
    if(!onChange) return;

    const { name, checked } = e.target;
    if(onChange) onChange({[name]: checked});
  }

  return (
    <Box className={classes.root}>
      <Typography component='span' className={classes.textTitle}>Dịch vụ</Typography>

      <ul className={classes.menu}>
        {[{label: 'Giao hàng miễn phí', value: 'isFreeShip'}, {label: 'Giảm giá', value: 'isPromotion'}].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters[service.value]}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;