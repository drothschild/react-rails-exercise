import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { requestBrand, setFormBrandName } from '../redux/actionCreators';
import BrandForm from './BrandForm';

class Brand extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.requestBrand(id);
  }

  render() {
    const { brand } = this.props;
    const initialValues = { name: brand.name };
    if (this.props.completed) {
      return <Redirect push to={'/brands'} />;
    }
    return (
      <div>
        <h3>Edit Brand: {brand.name}</h3>
        <BrandForm id={brand.id} initialValues={initialValues} />
      </div>
    );
  }
}

Brand.propTypes = {
  brand: PropTypes.object,
  completed: PropTypes.bool,
  requestBrand: PropTypes.func,
};

Brand.defaultProps = {
  brand: {},
  completed: false,
  requestBrand: () => ''
};

const mapStateToProps = state => ({
  brand: state.brand,
  completed: state.completed,
});

const mapDispatchToProps = dispatch => ({
  setName(name) {
    dispatch(setFormBrandName(name));
  },
  requestBrand(id) {
    dispatch(requestBrand(id));
  },
});

export const Unwrapped = Brand;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Brand));
