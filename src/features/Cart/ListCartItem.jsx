import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { formatPrice } from 'utils';
import * as yup from 'yup';
import { removeCartItem } from './cartSlice';

const useStyles = makeStyles( theme => ({
  root: '',
  flexItem: {
    width: '100%',
    display: 'flex',
  },
  img: {
    width: '100px',
    height: '100px',
    margin: theme.spacing(0, 2),
    padding: theme.spacing(1 , 1),
    border: '1px solid #000'
  },
  boxText: {
    width: '150px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    justifyContent: 'left',
    margin: theme.spacing(0, 1.5),
  },
  name: {
    fontSize: '18px',
    color: theme.palette.grey[800],
    margin: theme.spacing(0, 1)
  },
  sku: {
    fontSize: '14px',
    color: theme.palette.grey[500],
    margin: theme.spacing(0, 1)
  },
  quantity: {
    width: '100px',
    margin: theme.spacing(0, 2)
  },
  price: {
    width: '150px',
    margin: theme.spacing(0, 2),
    fontSize: '18px',
    fontWeight: 'semi-bold',
    color: theme.palette.primary.main,
  },
  button: {
    margin: theme.spacing(0, 2),
    height: '30px',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.dark}`
  },
  boxBack: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}))

ListCartItem.propTypes = {
  
};

function ListCartItem(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const listItem = useSelector(state => state.cart.cartItems);

  const schema = yup.object().shape({
    
    quantity: yup
            .number()
            .min(1, 'Please enter at least 1') 
            .required('Please enter quantity')
            .typeError('Please enter a number'),    
  });

  const form = useForm({
    defaultValues: {
      quantity: '1'
    },
    resolver: yupResolver(schema),
  });

  const handleRemove = (id) => {
    const action = removeCartItem(id);
    console.log(action);
    dispatch(action);
  } 

  const handleBuy = () => {
    history.push("/products")
  }

  return (
    <Box>
      <Grid container>
        {listItem.length === 0 &&
          <Box className={classes.boxBack}>
            <Button onClick={handleBuy} className={classes.button} >
              Mua sắm ngay
            </Button>
          </Box>
        }
        {listItem.map(item => (
          <li key={item.id} className={classes.flexItem}>
            <Box>
              <img src={item.product.thumbnail ? `${STATIC_HOST}${item.product.thumbnail.url}` : THUMBNAIL_PLACEHOLDER } className={classes.img} alt="" />
            </Box>
            <Box className={classes.boxText}>
              <Typography className={classes.name}>{item.product.name}</Typography>
              <Typography className={classes.sku}>SKU : {item.id}</Typography>
            </Box>
            <Box className={classes.quantity}>
              Số lượng: {item.quantity}
            </Box>
            <Box className={classes.price}>
              {formatPrice(item.product.salePrice * item.quantity)}
            </Box>
            <Button onClick={() => handleRemove(item.id)} className={classes.button}>Xóa</Button>
          </li>
        ))}
      </Grid>
    </Box>
  );
}

export default ListCartItem;