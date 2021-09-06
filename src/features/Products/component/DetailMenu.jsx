import { makeStyles } from '@material-ui/core';
import { Box, Link } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

DetailMenu.propTypes = {
  
};

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'no wrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyleType: 'none',

    '& > li' : {
      padding: theme.spacing( 2, 4)
    }, 

    '& > li > a': {
      color: theme.palette.grey[700],
      fontWeight: 'bold',

      '&.active' : {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      }
    },
  },
}))

function DetailMenu(props) {
  const classes = useStyle()

  const {url} = useRouteMatch();

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>Description</Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>Additional Infomation</Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>Reviews</Link>
      </li>
    </Box>
  );
}

export default DetailMenu;