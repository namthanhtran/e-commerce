import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import productApi from 'api/productApi';
import ProductSkeleton from '../component/ProductSkeleton';
import ProductList from '../component/ProductList';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {

  },
  left: {
    width: '250px',
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
  }
}))

ListPage.propTypes = {
  
};

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const {loading, setLoading} = useState(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12
  });
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  })

  useEffect(() => {
    (async() => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPagination(pagination);
        console.log({data, pagination});
      } catch (error) {
        console.log('Failed to fetch data', error);
      }

    })();
  }, [filters]);


  // handle change pagination
  const handlePageChange = (e, page) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      _page: page,
    }))
  }

  return (
    <Box >
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper>
            Left collumn
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {loading ? <ProductSkeleton /> : <ProductList data={productList}/>}

              <Box>
                <Pagination className={classes.flexPage} 
                            color='primary' 
                            count={Math.ceil(pagination.total / pagination.limit)} 
                            page={pagination.page}
                            onChange={handlePageChange}/>
              </Box>
            </Paper>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;