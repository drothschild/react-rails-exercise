import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  postBrand,
  setFormBrandName,
  updateBrand,
} from '../redux/actionCreators';

const required = value => (value ? undefined : 'Required');

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
);

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
          <label>
            Name
            <Field
              name="name"
              type="text"
              component={renderField}
              value={formBrandName}
              onChange={setName}
              validate={[required]}
            />
            <input type="submit" value="Submit" />
          </label>
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
