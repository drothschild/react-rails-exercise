import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { requestBrands } from '../redux/actionCreators';

class BrandSelectList extends Component {
  componentDidMount() {
    this.props.requestBrands();
  }

  render() {
    const { brands } = this.props;
    return brands.map(brand => (
      <option key={brand.id} value={brand.id}>
        {brand.name}
      </option>
    ));
  }
}

BrandSelectList.propTypes = {
  requestBrands: PropTypes.func,
};

BrandSelectList.defaultProps = {
  brands: [],
  requestBrands: () => '',
};

const mapStateToProps = state => ({
  brands: state.brands,
});
const mapDispatchToProps = dispatch => ({
  requestBrands() {
    dispatch(requestBrands());
  },
});

export const Unwrapped = BrandSelectList;

export default connect(mapStateToProps, mapDispatchToProps)(BrandSelectList);
