import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../component/AddToCartForm';
import DetailAdditional from '../component/DetailAdditional';
import DetailDescription from '../component/DetailDescription';
import DetailMenu from '../component/DetailMenu';
import DetailReview from '../component/DetailReview';
import ProductInfo from '../component/ProductInfo';
import ProductThumbnail from '../component/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingBottom: theme.spacing(3),
  },
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    marginBottom: theme.spacing(3)
  },
  flexPage: {
    paddingTop: '20px',
    paddingBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading:{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  }
}))

DetailPage.propTypes = {
  
};

function DetailPage(props) {
  const classes = useStyles();  

  const { params: {productId}, url } = useRouteMatch()
  const {product, loading} = useProductDetail(productId);

  if(loading) {
    return(
      <Box className={classes.loading}  >
      <LinearProgress/>
      </Box>
    )
  }

  const handleAddToCartSubmit = (formValues) => {
    console.log('Form submit',formValues);
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <Paper elevation={0} variant="outlined" square>
                <ProductThumbnail product={product}/>
              </Paper>
            </Grid>
            <Grid item className={classes.right}>
              <Box>
                <ProductInfo product={product}/>
              </Box>
              <Box>
                <AddToCartForm onSubmit={handleAddToCartSubmit}/>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <DetailMenu />

        <Switch>
          <Route path={url} exact>
            <DetailDescription product={product} />
          </Route>
          <Route path={`${url}/additional`} exact>
            <DetailAdditional />
          </Route>
          <Route path={`${url}/reviews`} exact>
            <DetailReview />
          </Route>
        </Switch> 

      </Container>
    </Box>
  );
}

export default DetailPage;