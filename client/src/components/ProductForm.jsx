import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BrandSelectList from './BrandSelectList';

const required = value => (value ? undefined : 'Required');
const maxValue = max => value =>
  value && value > max ? `Must be less than ${max}` : undefined;
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const maxValue100 = maxValue(100);

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
);

const ProductForm = ({ handleSubmit, errors }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          component={renderField}
          label="Name"
          name="name"
          type="text"
          validate={[required]}
        />
      </div>
      <div>
        <label>Brand</label>
        <div>
          <Field
            component="select"
            name="brand_id"
            label="Brand"
            placeholder="Brand"
          >
            <option />
            <BrandSelectList />
          </Field>
        </div>
      </div>
      <div>
        <Field
          component="textarea"
          name="description"
          label="Description"
          placeholder="Description"
        />
      </div>
      <div>
        <Field
          label="Price"
          component={renderField}
          name="price"
          type="number"
          validate={[number, maxValue100]}
        />
      </div>
      <input type="submit" value="Submit" />
    </form>
    <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>
  </div>
);

ProductForm.propTypes = {
  errors: PropTypes.array,
};

ProductForm.defaultProps = {
  errors: [],
};

const mapStateToProps = state => ({
  errors: state.errors,
});

export const Unwrapped = ProductForm;

export default connect(mapStateToProps)(
  reduxForm({ form: 'product' })(ProductForm)
);