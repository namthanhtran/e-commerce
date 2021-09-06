import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from 'utils';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(1.5),
    fontSize: '24px',
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  desc: {
    padding: theme.spacing(2, 1),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  box: {
    background: 'red'
  },
  salePrice: {
    padding: theme.spacing(1.5),
    fontSize: '28px',
    fontWeight: 'bold',
  },
  boxPrice: {
    display: 'flex',
    background: theme.palette.grey[200]
  },
  originalPrice: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textDecoration: 'line-through',
    display: 'flex',
    alignItems: 'center',
  },
  promotion: {
    display: 'flex',
    alignItems: 'center',
  }
}))

ProductInfo.propTypes = {
  product: PropTypes.object,
};

function ProductInfo({product}) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="body1" className={classes.title}>{product.name}</Typography>
      <Typography variant='body2' className={classes.desc}>{product.shortDescription}</Typography>
      <Box className={classes.boxPrice}>
        <Typography className={classes.salePrice}>
          {`Giá: ${formatPrice(product.salePrice)}`}
        </Typography>
        
        {product.promotionPercent > 0 && (
          <>
            <Box className={classes.originalPrice}>
              {formatPrice(product.originalPrice)}
            </Box>
            <Box className={classes.promotion}>
              {`-${product.promotionPercent}%`}
            </Box>
          </>
        )
        }
      </Box>
    </Box>  
  );
}

export default ProductInfo;