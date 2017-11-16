import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BrandSelectList from './BrandSelectList';
import { renderTextField } from './fields';

const required = value => (value ? undefined : 'Required');
const maxValue = max => value =>
  value && value > max ? `Must be less than ${max}` : undefined;
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const maxValue100 = maxValue(100);



const ProductForm = ({ handleSubmit, errors }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          component={renderTextField}
          label="Name"
          name="name"
          type="text"
          validate={[required]}
        />
      </div>
      <div />
      <div>
        <Field component="select" name="brand_id" label="Brand">
          <option />
          <BrandSelectList />
        </Field>
      </div>
      <div>
        <Field
          component={renderTextField}
          name="description"
          label="Description"
          multiLine={true}
          rows={2}
        />
      </div>
      <div>
        <Field
          label="Price"
          component={renderTextField}
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
