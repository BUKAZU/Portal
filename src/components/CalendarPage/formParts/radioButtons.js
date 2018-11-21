import React from 'react'

// Input feedback
const InputFeedback = ({ error }) =>
    error ? <div className="input-feedback">{error}</div> : null;

// Radio input
export const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
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

// Radio group
export const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    className,
    children
}) => {

    return <div className={className}>

          <div className="legend">{label}</div>
          {children}
          {touched && <InputFeedback error={error} />}

      </div>;
};