import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters(props) {
  const { filters = {}, onChange = null } = props;

  const handleCategoryChange = (newCategoryid) => {
    if(!onChange) return;

    const newFilters = {
      ...filters,
      'category.name': newCategoryid,
    }
    onChange(newFilters);
  };

  const handleChange = (values) => {
    if(onChange) onChange(values);
  }

  return (
    <Box>
      <Paper elevation={0} variant='outlined' square>
        <FilterByCategory onChange={handleCategoryChange} />
      </Paper>
      <Paper elevation={0} variant='outlined' square>
        <FilterByPrice filters={filters} onChange={handleChange} />
      </Paper>
      <Paper elevation={0} variant='outlined' square>
        <FilterByService filters={filters} onChange={handleChange} />
      </Paper>
    </Box>
  );
}

export default ProductFilters;