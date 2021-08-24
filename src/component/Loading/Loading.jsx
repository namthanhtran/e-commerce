import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';


const useStyles = makeStyles( theme => ({
  root: {
    position: 'absolute',
    display: 'block',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  }
}))


Loading.propTypes = {
  
};

function Loading(props) {
  const classes = useStyles();
  return (
    <div> 
      <CircularProgress color="primary" className={classes.root} />
    </div>
  );
}

export default Loading;