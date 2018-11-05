import React from "react";
import { Formik, Form, Field } from "formik";
import { FormattedMessage, FormattedNumber } from "react-intl";
import * as calc from "../../_lib/costs";
import { Countries } from "../../_lib/countries";

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

    for (let field of options.bookingFields) {
      if (field.required) {
        if (!values[field.id]) {
          errors[field.id] = "Required";
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
    const { options, house } = this.props;

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
            <div className="form-section">
              <h2>
                <FormattedMessage id="stay_details" />
              </h2>
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
                {errors.adults &&
                  touched.adults && (
                    <div className="error-message">{errors.adults}</div>
                  )}
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
              {errors.max_persons && (
                <div className="error-message">{errors.max_persons}</div>
              )}
            </div>
            <div className="form-section">
              <h2>
                <FormattedMessage id="extra_costs_bookable" />
              </h2>
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
            </div>
            <div className="form-section">
              <h2>
                <FormattedMessage id="personal_details" />
              </h2>
              {options.bookingFields.map(input => {
                if (input.id === "country") {
                  return (
                    <div className="form-row" key={input.id}>
                      <label htmlFor={input.id}>{input.label}</label>
                      <Field component="select" name={input.id}>
                        {Countries[window.__localeId__].map(country => {
                          return (
                            <option value={country.alpha2} key={country.alpha2}>
                              {country.name}
                            </option>
                          );
                        })}
                      </Field>
                      {errors[input.id] &&
                        touched[input.id] && (
                          <div className="error-message">
                            {errors[input.id]}
                          </div>
                        )}
                    </div>
                  );
                } else {
                  return (
                    <div className="form-row" key={input.id}>
                      <label htmlFor={input.id}>{input.label}</label>
                      <Field type={input.type} name={input.id} />
                      {errors[input.id] &&
                        touched[input.id] && (
                          <div className="error-message">
                            {errors[input.id]}
                          </div>
                        )}
                    </div>
                  );
                }
              })}
            </div>

            <div className="form-sum">
              <h2>
                <FormattedMessage id="booking_details" />
              </h2>
              <div className="house-details">
                <div>{house.name}</div>
                <img src={house.image_url} alt="" />
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <FormattedMessage id="arrival_date" />
                      </th>
                      <td />
                    </tr>
                    <tr>
                      <th>
                        <FormattedMessage id="departure_date" />
                      </th>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="costs-section">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <FormattedMessage id="rent_price" />
                      </td>
                      <td className="price">
                        €{" "}
                        <FormattedNumber
                          value={bookingPrice.rent_price}
                          minimumFractionDigits={2}
                          maximumFractionDigits={2}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FormattedMessage id="discount" />
                      </td>
                      <td className="price">
                        <FormattedNumber value={bookingPrice.discount} /> %
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FormattedMessage id="price_after_discount" />
                      </td>
                      <td className="price">
                        €{" "}
                        <FormattedNumber
                          value={bookingPrice.discounted_price}
                          minimumFractionDigits={2}
                          maximumFractionDigits={2}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="costs-section">
                <table>
                  <tbody>
                    {bookingPrice.required_house_costs.map(cost => {
                      return (
                        <tr key={cost.id}>
                          <td>{cost[`name_${window.__localeId__}`]}</td>
                          <td className="price">
                            €{" "}
                            <FormattedNumber
                              value={this.calculateCost(cost, values)}
                              minimumFractionDigits={2}
                              maximumFractionDigits={2}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="costs-section">
                <table>
                  <tbody>
                    {bookingPrice.optional_house_costs.map(cost => {
                      return <tr key={cost.id}>
                          <td>
                            {
                              cost[
                                `name_${
                                  window.__localeId__
                                }`
                              ]
                            }
                          </td>
                          <td className="price">
                            € <FormattedNumber value={this.calculateCost(cost, values)} minimumFractionDigits={2} maximumFractionDigits={2} />
                          </td>
                        </tr>;
                    })}
                  </tbody>
                </table>
              </div>
              {status && status.msg && <div>{status.msg}</div>}
              <button type="submit">
                <FormattedMessage id="book" />
              </button>
            </div>
          </Form>
        )}
      />
    );
  }
}

export default FormCreator;
