import React from "react";
import { Formik, Form, Field } from "formik";
import { FormattedMessage } from "react-intl";
import * as calc from "../../_lib/costs";

class FormCreator extends React.Component {
  state = {
    max_persons: this.props.house.persons,
    adults: 1
  };

  createPeronsArray(persons) {
    return Array.apply(null, { length: persons }).map(Number.call, Number);
  }

  validate = values => {
    let errors = {};

    const options = this.props.options;

    values.persons =
      Number(values.children) + Number(values.adults) + Number(values.babies);

      for(let field of options.bookingFields) {

          if(field.required) {
              if (!values[field.id]) {
                errors[field.id] = 'Required'
              }
          }
      }

    if (values.adults < 1) {
        errors.adults = <FormattedMessage id="at_least_1_adult" />;
    }
    if (values.persons > this.state.max_persons) {
      errors.max_persons = <FormattedMessage id="max_persons_reached" />;
    }

    return errors;
  };

  calculateCost(cost, values) {
    const bookingPrice = this.props.house.booking_price;
    return calc[cost.method](
      cost.amount,
      Number(values[cost.id]),
      Number(values.persons),
      bookingPrice.nights,
      bookingPrice.rent_price
    );
  }

  render() {
    const adults = this.createPeronsArray(this.state.max_persons);
    const children = this.createPeronsArray(this.state.max_persons - 1);
    const bookingPrice = this.props.house.booking_price;
    const options = this.props.options;

    let optionalCosts = {};

    for (const val of bookingPrice.optional_house_costs) {
      optionalCosts[val.id] = 0;
    }

    return (
      <Formik
        validate={this.validate}
        initialValues={{
          ...this.props.booking,
          ...optionalCosts,
          adults: 2,
          children: 0,
          babies: 0,
          persons: 2
        }}
        render={({
          errors,
          touched,
          values,
          status,
          isSubmitting,
          handleChange,
          handleBlur
        }) => (
          <Form className="form">
            <div className='form-section'>
              <div className="form-row inline">
                <label htmlFor="persons">
                  <FormattedMessage id="adults" />
                </label>
                <Field
                  component="select"
                  name="adults"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {adults.map(opt => {
                    return (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    );
                  })}
                </Field>
                {errors.adults && touched.adults && <div className="error-message">{errors.adults}</div>}
              </div>
              <div className="form-row inline">
                <label htmlFor="children">
                  <FormattedMessage id="children" />
                </label>
                <Field component="select" name="children">
                  {children.map(opt => {
                    return (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className="form-row inline">
                <label htmlFor="babies">
                  <FormattedMessage id="babies" />
                </label>
                <Field component="select" name="babies">
                  {children.map(opt => {
                    return (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div>
                {bookingPrice.optional_house_costs.map(cost => {
                  if (!["none", "total"].includes(cost.method)) {
                    return (
                      <div className="form-row inline" key={cost.id}>
                        <label htmlFor={cost.id}>
                          {cost[`name_${window.__localeId__}`]}
                        </label>
                        <Field type="number" name={cost.id} min={0} />
                      </div>
                    );
                  } else {
                    return "";
                  }
                })}
              </div>
                {errors.max_persons && (
                <div className="error-message">{errors.max_persons}</div>
                )}
            </div>
            <div className="form-section">
                {options.bookingFields.map(input => {
                    return (<div className="form-row" key={input.id}>
                        <label htmlFor={input.id}>
                            {input.label}
                        </label>
                        <Field type={input.type} name={input.id} />
                        {errors[input.id] && touched[input.id] && (
                            <div className="error-message">{errors[input.id]}</div>
                        )}
                    </div>)
                })}

            </div>


            <div className="form-sum">
              Cost list
              {bookingPrice.required_house_costs.map(cost => {
                return (
                  <div key={cost.id}>
                    {cost[`name_${window.__localeId__}`]}:{" "}
                    {this.calculateCost(cost, values)}
                  </div>
                );
              })}
              <br />
              {bookingPrice.optional_house_costs.map(cost => {
                return (
                  <li key={cost.id}>
                    {cost[`name_${window.__localeId__}`]}:{" "}
                    {this.calculateCost(cost, values)}
                  </li>
                );
              })}
            {status && status.msg && <div>{status.msg}</div>}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            </div>

          </Form>
        )}
      />
    );
  }
}

export default FormCreator;
