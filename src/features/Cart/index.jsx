import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import ListCartItem from './ListCartItem';
import { cartItemCountSelector, cartTotalSelector } from './selector';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(3),
  },
  left: {
    width: '750px',
    padding: theme.spacing(1.5),
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(3),
  },
}))

CartFeature.propTypes = {
  
};

function CartFeature(props) {
  const classes = useStyles();
  const cartItemCounts = useSelector(cartItemCountSelector);
  const cartItemTotal = useSelector(cartTotalSelector);
  
  return (
    <Box className={classes.root}>
      <Container>
        GIỎ HÀNG ( {cartItemCounts} sản phẩm)
        <Paper elevation={0} variant="outlined" square>
          <Grid container>
            <Grid item className={classes.left}>
              <ListCartItem />
            </Grid>
            <Grid item className={classes.right}>
              <Box>
                <Paper elevation={1} variant="outlined" square>
                  Địa chỉ giao hàng
                </Paper>
              </Box>              
              <Box>
                <Paper elevation={1} variant="outlined" square>
                  <Typography>THANH TOÁN</Typography>
                  <Typography>Thành tiền: {formatPrice(cartItemTotal)}</Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default CartFeature;