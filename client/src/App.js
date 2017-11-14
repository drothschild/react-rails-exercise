import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import store from './redux/store';
import Brands from './components/Brands';
import Brand from './components/Brand';
import Products from './components/Products';
import Product from './components/Product';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router>
            <div>
              <Header />
              <Route exact path="/brands" component={Brands} />
              <Route path="/brands/:id" component={Brand} />
              <Route exact path="/products" component={Products} />
              <Route path="/products/:id" component={Product} />
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
