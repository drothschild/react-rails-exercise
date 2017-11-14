import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { requestProduct, updateProduct } from '../redux/actionCreators';
import ProductForm from './ProductForm';

class Product extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.requestProduct(id);
  }
  initialValues = {
    name: this.props.product.name,
    brand_id: this.props.product.brand_id,
    description: this.props.product.description,
    price: this.props.product.price,
  };
  render() {
    const { product, handleProductSubmit } = this.props;
    const id = this.props.match.params.id;
    const initialValues = {
      name: product.name,
      brand_id: product.brand_id,
      description: product.description,
      price: product.price,
    };
    if (this.props.completed) {
      return <Redirect push to={'/products'} />;
    }
    return (
      <div>
        <h3>Edit Product: {product.name}</h3>
        <ProductForm
          initialValues={initialValues}
          onSubmit={values => {
            handleProductSubmit({ ...values, id });
          }}
        />
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object,
  completed: PropTypes.bool,
  requestProduct: PropTypes.func,
};

Product.defaultProps = {
  product: {},
  completed: false,
  requestProduct: () => ''
};

const mapStateToProps = state => ({
  product: state.product,
  completed: state.completed,
});

const mapDispatchToProps = dispatch => ({
  requestProduct(id) {
    dispatch(requestProduct(id));
  },
  handleProductSubmit(values) {
    dispatch(updateProduct(values));
  },
});

export const Unwrapped = Product;

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Product)
);
