import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
  currentValue : PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort(props) {
  const {currentValue, onChange} = props;

  const handleSortChange = (e, newValue) => {
    if(onChange) onChange(newValue); 
  }
  return (
    <Tabs value={currentValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleSortChange}
          aria-label="disabled tabs example">
      <Tab label="Giá tăng dần" value="salePrice:ASC"></Tab>
      <Tab label="Giá giảm dần" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

export default ProductSort;