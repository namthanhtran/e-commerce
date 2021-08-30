import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    margin: theme.spacing(2, 1),
    listStyle: 'none',
    '& > li': {
      margin: 0,
      pading: theme.spacing(2),
    }
  }
}));

FilterViewer.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => Boolean(filters.isFreeShip),
    isVisible: () => true,
    isRemoveable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = {...filters};
      if(newFilters.isFreeShip){
        // newFilters.isFreeShip = false;
        delete newFilters.isFreeShip;
      }else{
        newFilters.isFreeShip = true;
      }
      return newFilters;
    }
  },
]

function FilterViewer(props) {
  const classes = useStyles();
  const { filters = {}, onChange = null } = props;
  return (
    <Box className={classes.root}>
      {FILTER_LIST.filter(x => x.isVisible(filters)).map(x => (
        <li key={x.id}>
          <Chip label={x.getLabel(filters)}
                color={x.isActive(filters) ? "primary" : "default"}
                clickable={!x.isRemoveable}
                onClick={x.isRemoveable 
                          ? null 
                          : () => {
                            if(!onChange) return;
                            const newFilters = x.onToggle(filters);
                            onChange(newFilters)
                          }}
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;