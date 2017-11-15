import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './fields';

import {
  postBrand,
  setFormBrandName,
  updateBrand,
} from '../redux/actionCreators';

const required = value => (value ? undefined : 'Required');

class BrandForm extends Component {
  handleSubmit(e) {
    const { formBrandName, id } = this.props;
    e.preventDefault();
    if (!id) {
      this.props.postBrand(formBrandName);
    } else {
      this.props.updateBrand({ id, name: formBrandName });
    }
  }
  render() {
    const { errors, formBrandName, setName } = this.props;
    const errorList = (
      <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>
    );
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Field
            name="name"
            label="Name"
            component={renderTextField}
            value={formBrandName}
            onChange={setName}
            validate={[required]}
          />
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
        {errorList}
      </div>
    );
  }
}

BrandForm.propTypes = {
  formBrandName: PropTypes.string,
  id: PropTypes.number,
  errors: PropTypes.array,
  setName: PropTypes.func,
  postBrand: PropTypes.func,
  updateBrand: PropTypes.func,
};

BrandForm.defaultProps = {
  formBrandName: '',
  errors: [],
  setName: () => {},
  postBrand: () => {},
  updateBrand: () => {},
};

const mapStateToProps = state => ({
  formBrandName: state.formBrandName,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  setName(event) {
    dispatch(setFormBrandName(event.target.value));
  },
  postBrand(name) {
    dispatch(postBrand(name));
  },
  updateBrand({ name, id }) {
    dispatch(updateBrand({ name, id }));
  },
});

export const Unwrapped = BrandForm;

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'brand' })(BrandForm)
);
