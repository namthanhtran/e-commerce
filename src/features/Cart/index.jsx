import { Box, Button, Container, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import ListCartItem from './ListCartItem';
import { cartItemCountSelector, cartTotalSelector } from './selector';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    margin: '50px 0'
  },
  title: {
    margin: '20px auto',
    textAlign: 'center',
    width: '100%',
    textTransform: 'uppercase',
    fontSize: '22px',
    color: '#3f51b5',
  },
  boxPay: {
    margin: '20px 0',
    padding: '10px 20px',
  },
  titlePay: {
    fontSize: '22px',
    color: '#3f51b5',
  },
  moneyBox: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temporaryMoney: {
    fontSize: '16px',
    color: '#878787',
  },
  payMoney: {
    fontSize: '22px',
    color: 'red',
  },
  btnPay: {
    width: '100%',
    height: '50px',
    display: 'flex',
    justifyContent:'center',
    background: '#3f51b5',
    color: '#fff',
    '&:hover': {
      background: '#3f51b5',
    }
  }
}))

CartFeature.propTypes = {
  
};

function CartFeature(props) {
  const classes = useStyles();
  const cartTotalPrice = useSelector(cartTotalSelector);
  const cartItemCount = useSelector(cartItemCountSelector);

  return (
    <Box className={classes.root}>
      <Container>
        <Box>
          <Typography className={classes.title}>giỏ hàng</Typography>
        </Box>
        <ListCartItem />
        {cartItemCount !== 0 && 
          <Paper elevation={0} variant="outlined" square className={classes.boxPay}>
            <Typography className={classes.titlePay}>Thanh toán</Typography>
            <Box className={classes.moneyBox}>
              <Typography>Tạm tính</Typography>
              <Typography className={classes.temporaryMoney}>{formatPrice(cartTotalPrice)}</Typography>
            </Box>
            <Box className={classes.moneyBox}>
              <Typography>Thành tiền</Typography>
              <Typography className={classes.payMoney}>{formatPrice(cartTotalPrice)}</Typography>
            </Box>
            <Box>
              <Button className={classes.btnPay}>thanh toán</Button>
            </Box>
          </Paper>
        }
      </Container>
    </Box>
  );
}

export default CartFeature;