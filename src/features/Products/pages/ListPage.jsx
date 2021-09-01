import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FilterViewer from '../component/FilterViewer';
import ProductFilters from '../component/ProductFilters';
import ProductList from '../component/ProductList';
import ProductSkeleton from '../component/ProductSkeleton';
import ProductSort from '../component/ProductSort';
import queryString from 'query-string';

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

  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => { 
    const params =  queryString.parse(location.search);  //parse from URL search to Object assign in params
    return {
      ...params, // get all old properties in params
      _page: Number.parseInt(params._page) || 1, // if params is empty, get default values
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]); //when search URL change, calc again object queryParams

  const [productList, setProductList] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  })

  useEffect(() => {
    (async() => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
        console.log({data, pagination});
      } catch (error) {
        console.log('Failed to fetch data', error);
      }

      setLoading(false);

    })();
  }, [queryParams]);


  // handle change pagination
  const handlePageChange = (e, page) => {

    const filters = {
      ...queryParams,
      _page: page
    }
    // Update queryParams
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters), //parse object filters to string, display in URL
    })
  }

  // handle sort value
  const handleSortChange = (sortValue) => {

    const filters = {
      ...queryParams,
      _sort: sortValue
    }
    
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters), //parse object filters to string, display in URL
    })
  }

  const handleFilterChange = (newFilters) => {

    const filters = {
      ...queryParams,
      ...newFilters
    }
    
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters), //parse object filters to string, display in URL
    })
  };

  const handleSetFilter = (newFilters) => { //set again all filter 
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters), //parse object filters to string, display in URL
    })
  }

  return (
    <Box >
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper>
              <ProductFilters filters={queryParams} onChange={handleFilterChange}/>
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0} variant='outlined' square >
              {/* Box sort value */}
              <Box>
                <Paper elevation={0} variant='outlined' square>
                  <ProductSort currentValue={queryParams._sort} onChange={handleSortChange}/>
                </Paper>
              </Box>
              <Box>
                <FilterViewer filters={queryParams} onChange={handleSetFilter}/>
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