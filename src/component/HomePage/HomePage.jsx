import { Box } from '@material-ui/core';
import bannerImg from 'assets/img/banner-hp.png';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

HomePage.propTypes = {
  
};

function HomePage(props) {
  return (
    <Box className='homepage'>

      <Box className="banner">
        <Box className="banner__text">
          <h1>E-Commerce Shop</h1>
          <p>sự an tâm của khách hàng được chúng tôi đưa lên hàng đầu</p>
          <Box className="btn-over">
            <NavLink to="/products">khám phá</NavLink>
          </Box>
        </Box>
        <Box className="banner__img">
          <img src={bannerImg} alt="" />
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;