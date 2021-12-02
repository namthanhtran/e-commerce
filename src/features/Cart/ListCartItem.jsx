import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { formatPrice } from 'utils';
import * as yup from 'yup';
import { addToCart, setQuantity, increaseQuantity, decreaseQuantity, changeQuantity, removeCartItem } from './cartSlice';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import InputField from 'component/FormControls/InputField/InputField';
import useProductDetail from '../Products/hooks/useProductDetail';
import QuantityField from 'component/FormControls/QuantityField/QuantityField';

const useStyles = makeStyles( theme => ({
  root: '',
  flexItem: {
    width: '100%',
    display: 'flex',
  },
  product: {
    display: 'flex',
    alignItems: 'center',
  },
  quantity: {
    width: '50px',
    height: '20px',
    padding: '3px 5px',
    border: '1px solid #000',
    borderRadius: '5px'
  },
  paper: {
    width: '100%',
  },
  back: {
    width: '100%',
    height: '100vh',
    textAlign: 'center',
  },
  text: {
    margin: '20px 0',
  },
  thumbnail: {
    width: '100px',
    height: '100px',
  },
  proName: {
    marginLeft: '20px',
  },
  buton: {
    color: '#000',
    background: '#fff',
    border: '2px solid #3f51b5',
    '&:hover': {
      color: '#fff',
      background: '#3f51b5'
    }
  },
  btnDelete: {
    color: '#3f51b5',
    '&:hover':{
      cursor: 'pointer'
    }
  },
  changeQuantity: {
    width: '100px',
    border: '1px solid #000',
    display: 'flex',
    justifyContents: 'space-between',
    alignItems: 'center',
  },
  inputChange: {
    textAlign: 'center',
    border: 'none',
    padding: '5px',
    width: '50px',
    height: '20px',
  },
  btnChange: {
    display: 'inline-block',
    background: '#fff',
    border: 'none',
    '&:hover':{
      cursor: 'pointer',
    }
  }
}))

ListCartItem.propTypes = {
  
};

function ListCartItem(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const listItem = useSelector(state => state.cart.cartItems);


  const handleRemove = (id) => {
    const action = removeCartItem(id);
    dispatch(action);
  }

  const handleIncrease = (id, quantity) => {
    const action = increaseQuantity({id, quantity});
    dispatch(action);
  }

  const handleDecrease = (id, quantity) => {
    console.log(id, quantity);
    if(quantity <= 1){
      const action = removeCartItem(id);
      dispatch(action);
      return;
    }
    const action = decreaseQuantity({id, quantity});
    dispatch(action);
  }

  const handleBuy = () => {
    history.push("/products")
  }

  return (
    <Box>
      <Grid container>
        {listItem.length === 0 &&
          <Box className={classes.back}>
            <Typography className={classes.text}>Không có sản phẩm nào trong giỏ hàng</Typography>
            <Button onClick={handleBuy} className={classes.buton} >
              Mua sắm ngay
            </Button>
          </Box>
        }
        {listItem.length !== 0 &&
          <Paper className={classes.paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell>Đơn giá</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Thành tiền</TableCell>
                  <TableCell>Xóa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listItem.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className={classes.product}>
                      <img src={item.product.thumbnail ? `${STATIC_HOST}${item.product.thumbnail.url}` : THUMBNAIL_PLACEHOLDER} className={classes.thumbnail} alt="" />
                      <Typography className={classes.proName}>{item.product.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{formatPrice(item.product.salePrice)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box className={classes.changeQuantity}>
                        <button onClick={() => handleDecrease(item.id, item.quantity)} className={classes.btnChange}> - </button>
                        <input type="text" value={item.quantity} className={classes.inputChange}/>
                        <button onClick={() => handleIncrease(item.id, item.quantity)} className={classes.btnChange}> + </button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography>{formatPrice(item.product.salePrice * item.quantity)}</Typography>
                    </TableCell>
                    <TableCell>
                      <DeleteOutlineIcon onClick={() => handleRemove(item.id)} className={classes.btnDelete}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        }
      </Grid> 
    </Box>
  );
}

export default ListCartItem;