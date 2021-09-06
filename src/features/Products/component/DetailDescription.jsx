import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Paper } from '@material-ui/core';

DetailDescription.propTypes = {
  product: PropTypes.object,
};

function DetailDescription({ product }) {
  const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper dangerouslySetInnerHTML={{__html: safeDescription}} elevation={0} style={{padding: '20px'}}/>
  );
}

export default DetailDescription;