import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

ProductFeature.propTypes = {
  
};

function ProductFeature(props) {
  const match = useRouteMatch();
  
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.path} exact component={ListPage}/>
        <Route path={`${match.path}/:productId`} component={DetailPage}/>
      </Switch>
    </Box>
  );
}

export default ProductFeature;