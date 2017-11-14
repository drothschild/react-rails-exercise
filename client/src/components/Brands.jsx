import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { requestBrands } from '../redux/actionCreators';
import BrandForm from './BrandForm';
import BrandListItem from './BrandListItem';

const style = {
  width: 400,
};
class Brands extends Component {
  componentDidMount() {
    this.props.requestBrands();
  }

  render() {
    const { brands } = this.props;
    const brandsList = brands.map(brand => (
      <BrandListItem id={brand.id} key={brand.id} name={brand.name} />
    ));

    return (
      <div>
        <h1>Brands</h1>
        <List style={style}>{brandsList}</List>
        <h3>New Brand</h3>
        <BrandForm />
      </div>
    );
  }
}

Brands.propTypes = {
  isFetching: PropTypes.bool,
  brands: PropTypes.array,
  requestBrands: PropTypes.func,
};

Brands.defaultProps = {
  isFetching: false,
  brands: [],
  requestBrands: () => ''
};

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  brands: state.brands,
});

const mapDispatchToProps = dispatch => ({
  requestBrands() {
    dispatch(requestBrands());
  },
});

export const Unwrapped = Brands;

export default connect(mapStateToProps, mapDispatchToProps)(Brands);
