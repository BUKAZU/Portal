import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Countries } from '../../../_lib/countries';

export const OptionalBookingFields = ({
  bookingFields,
  errors,
  Field,
  PortalSite,
}) => (
  <div className="form-section">
    <h2>
      <FormattedMessage id="personal_details" />
    </h2>
    {bookingFields.map(input => {
      if (input.id === 'country') {
        return (
          <div className="form-row" key={input.id}>
            <label htmlFor={input.id}>{PortalSite[`${input.id}_label`]}</label>
            <Field component="select" name={input.id}>
              {Countries[window.__localeId__].map(country => {
                return (
                  <option value={country.alpha2} key={country.alpha2}>
                    {country.name}
                  </option>
                );
              })}
            </Field>
            {errors[input.id] && (
              <div className="error-message">{errors[input.id]}</div>
            )}
          </div>
        );
      } else {
        return (
          <div className="form-row" key={input.id}>
            <label htmlFor={input.id}>{PortalSite[`${input.id}_label`]}</label>
            <Field type={input.type} name={input.id} />
            {errors[input.id] && (
              <div className="error-message">{errors[input.id]}</div>
            )}
          </div>
        );
      }
    })}
  </div>
);

OptionalBookingFields.propTypes = {
  bookingFields: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  PortalSite: PropTypes.object.isRequired,
  Field: PropTypes.node.isRequired,
};
