import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import { Box } from '@material-ui/core';

ProductFeature.propTypes = {
  
};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.path} exact component={ListPage}/>
        <Route path={`${match.path}/:productId`} exact component={DetailPage}/>
      </Switch>
    </Box>
  );
}

export default ProductFeature;