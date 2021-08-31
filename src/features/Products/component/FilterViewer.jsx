import { Box, Chip, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    margin: theme.spacing(1, 1),
    listStyle: 'none',
    '& > li': {
      margin: theme.spacing(0, 0.5),
      pading: theme.spacing(2),
    }
  }
}));

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemoveAble: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = {...filters };
      if(newFilters.isFreeShip){
        delete newFilters.isFreeShip;
      }else{
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Khuyến mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemoveAble: true,
    onRemove: (filters) => {
      const newFilters = {...filters};
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) => `Từ ${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(filters.salePrice_gte)} 
                            đến ${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(filters.salePrice_lte)}`,
    isActive: () => true,
    isVisible: (filters) => Object.keys(filters).includes('salePrice_gte') && Object.keys(filters).includes('salePrice_lte'),
    isRemoveAble: true,
    onRemove: (filters) => {
      const newFilters = {...filters};
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: () => {},
  },
]

function FilterViewer(props) {
  const classes = useStyles();
  const { filters = {}, onChange = null } = props;

  // if props filters change, calculator again.
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => (x.isVisible(filters)))
  }, [filters])

  return (
    <Box className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemoveAble}
            onClick={
              x.isRemoveAble
              ? null
              : () => {
                if(!onChange) return;
                const newFilters = x.onToggle(filters);
                onChange(newFilters);
              }
            }
            onDelete={
              x.isRemoveAble
              ? () => {
                if(!onChange) return;
                const newFilters = x.onRemove(filters);
                onChange(newFilters);
              } 
              : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;