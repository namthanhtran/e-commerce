import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
  item: {
    padding: '12px',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.02,1.02)',
      background: '#F5F5F5',
    }
  }
}))

ProductItem.propTypes = {
  product: PropTypes.object,
};

function ProductItem({product}) {
  const classes = useStyles();
  const thumbnailURL = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;

  const history = useHistory();
  const handleClick = () => {
    history.push(`/products/${product.id}`)
  }

  return (
    <Box onClick={handleClick} className={classes.item}>
      <Box padding={1}>
        <img src={thumbnailURL} alt={product.name} width='100%'/>
      </Box>
      <Typography variant='body2'>{product.name}</Typography>
      <Typography variant='body2'>
        <Box fontSize='16px' fontWeight='bold' component='span' marginRight={1}>
          {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default ProductItem;