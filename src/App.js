import Footer from 'component/Footer/Footer';
import ProductFeature from 'features/Products';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './component/Header/Header';
import NotFound from './component/NotFound/NotFound';

function App() {
  return (
    <div className="app">
      <Header />
      
      <Switch>
        <Redirect from="/home" to="/" exact/>
        <Route path="/products" component={ProductFeature}/>
        <Route component={NotFound} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
