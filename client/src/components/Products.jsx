import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { postProduct, requestProducts } from '../redux/actionCreators';
import ProductForm from './ProductForm';
import ProductListItem from './ProductListItem';

const style = {
  width: 400,
};
class Products extends Component {
  componentDidMount() {
    this.props.requestProducts();
  }

  render() {
    const { products, handleProductSubmit } = this.props;
    const productsList = products.map(product => (
      <ProductListItem id={product.id} key={product.id} name={product.name} />
    ));

    return (
      <div>
        <h1>Products</h1>
        <List style={style}>{productsList}</List>
        <ProductForm onSubmit={values => handleProductSubmit(values)} />
      </div>
    );
  }
}

Products.propTypes = {
  isFetching: PropTypes.bool,
  products: PropTypes.array,
  requestProducts: PropTypes.func,
};

Products.defaultProps = {
  isFetching: false,
  products: [],
  requestProducts: () => '',
  handleProductSubmit: () => '',
};

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  requestProducts() {
    dispatch(requestProducts());
  },
  handleProductSubmit(values) {
    dispatch(postProduct(values));
  },
});

export const Unwrapped = Products;

export default connect(mapStateToProps, mapDispatchToProps)(Products);
