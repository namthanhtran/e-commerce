import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import FilterViewer from '../component/FilterViewer';
import ProductFilters from '../component/ProductFilters';
import ProductList from '../component/ProductList';
import ProductSkeleton from '../component/ProductSkeleton';
import ProductSort from '../component/ProductSort';

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
  const {loading, setLoading} = useState(false);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12,
    _sort: "salePrice:ASC"
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

  // handle sort value
  const handleSortChange = (sortValue) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      _sort: sortValue
    }))
  }

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilter => ({
      ...prevFilter,
      ...newFilters,
    }))
  };

  const handleSetFilter = (newFilters) => {
    setFilters(newFilters);
  }

  return (
    <Box >
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper>
              <ProductFilters filters={filters} onChange={handleFilterChange}/>
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0} variant='outlined' square >
              {/* Box sort value */}
              <Box>
                <Paper elevation={0} variant='outlined' square>
                  <ProductSort currentValue={filters._sort} onChange={handleSortChange}/>
                </Paper>
              </Box>
              <Box>
                <FilterViewer filters={filters} onChange={handleSetFilter}/>
              </Box>
              {/* Loading productlist */}
              {loading ? <ProductSkeleton /> : <ProductList data={productList}/>}

              {/* Box handle page */}
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