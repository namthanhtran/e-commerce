import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import categoryApi from 'api/categoryApi';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  textTitle: {
    textTransform: 'uppercase',
  },
  menu: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    '&>li': {
      marginTop: theme.spacing(1),
      transition: 'all ease 0.3s',
      fontSize: '16px',
      '&:hover':{
        cursor: 'pointer',
        color: theme.palette.primary.main,
        transition: 'all ease 0.3s',
      },
    }
  }
}))

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({onChange}) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async() => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(list.map(item => ({
          id: item.id,
          name: item.name
        })));
      } catch (error) {
        console.log('Failed to fetch category', error);
      }
    })()
  }, []);

  const handleCategoryClick = (category) => {
    if(onChange){
      onChange(category.id);
    }
  }

  return (
    <Box className={classes.root}>
      <Typography className={classes.textTitle}>Danh mục sản phẩm</Typography>
      <ul className={classes.menu}>
        {categoryList.map(category => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;