import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { STATIC_HOST } from 'constants/index';
import { THUMBNAIL_PLACEHOLDER } from 'constants/common';

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumbnail({product = {}}) {
  const thumbnail_URL = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : `${THUMBNAIL_PLACEHOLDER}`; 
  return (
    <Box>
      <img src={thumbnail_URL} alt="" />
    </Box>
  );
}

export default ProductThumbnail;