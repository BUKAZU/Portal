import React from "react";
import { FormattedMessage } from "react-intl";
import { Field } from "formik";

const Discount = ({ errors }) => (
  <div className="form-section">
    <div className="form-row inline">
      <label htmlFor="discount">
        <FormattedMessage id="discount" />
      </label>
      <Field component="select" name="discount">
        <option value="0">0%</option>
        <option value="5">5%</option>
        <option value="10">10%</option>
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

export default Discount;
