import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));



Loading.propTypes = {
  
};

function Loading(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}> 
      <CircularProgress color="secondary" />
    </div>
  );
}

export default Loading;