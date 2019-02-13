import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

const Discount = ({ errors, house }) => {
  if (house.discounts) {
    let discounts = house.discounts.split(',');
    return (
      <div className="form-section">
        <div className="form-row inline">
          <label htmlFor="discount">
            <FormattedMessage id="discount" />
          </label>
          <Field component="select" name="discount">
            {discounts.map(discount => (
              <option value={discount} key={discount}>
                {discount}%
              </option>
            ))}
          </Field>
        </div>
        <div className="form-row inline">
          <label htmlFor="discount_reason">
            <FormattedMessage id="discount_reason" />
          </label>
          <Field name="discount_reason" />
          {errors.discount_reason && (
            <div className="error-message">{errors.discount_reason}</div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

Discount.propTypes = {
  house: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default Discount;
