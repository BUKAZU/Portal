import React from 'react';
import PropTypes from 'prop-types';

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

InputFeedback.propTypes = {
  error: PropTypes.object,
};

// Radio input
export const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className="radio-button"
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

RadioButton.propTypes = {
  field: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.object,
};

// Radio group
export const RadioButtonGroup = ({
  //   value,
  error,
  touched,
  //   id,
  label,
  className,
  children,
}) => {
  return (
    <div className={className}>
      <div className="legend">{label}</div>
      {children}
      {touched && <InputFeedback error={error} />}
    </div>
  );
};

RadioButtonGroup.propTypes = {
  error: PropTypes.object,
  touched: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
};
