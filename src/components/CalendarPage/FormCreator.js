import React from "react";
import { Formik, Form, Field } from "formik";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { Mutation } from "react-apollo";
import { CREATE_BOOKING_MUTATION } from "../../_lib/queries";
import * as calc from "../../_lib/costs";
import { Countries } from "../../_lib/countries";
import { Insurances } from "./formParts/insurances";
import { Summary } from "./formParts/summary";
import { RadioButton, RadioButtonGroup } from "./formParts/radioButtons";
import Icon from "../icons/info.svg";
import Modal from "./formParts/Modal";
import DefaultBookingFields from "./formParts/DefaultBookingFields";
import SuccessMessage from "./formParts/SuccessMessage";

class FormCreator extends React.Component {
  state = {
    max_persons: this.props.house.persons,
    adults: 1,
    rentPrice: this.props.house.booking_price.rent_price,
    discountedPrice: this.props.house.booking_price.discounted_price,
    formValues: {},
    formSubmit: false,
    bookingFields: this.props.options.bookingFields || DefaultBookingFields
  };

  createPeronsArray(persons) {
    return Array.apply(null, { length: persons + 1 }).map(Number.call, Number);
  }

  validate = values => {
    let errors = {};

    values.persons =
      Number(values.children) + Number(values.adults) + Number(values.babies);

    for (let field of this.state.bookingFields) {
      if (field.required) {
        if (!values[field.id]) {
          errors[field.id] = <FormattedMessage id="required" />;
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
      Number(values.costs[cost.id]),
      Number(values.persons),
      bookingPrice.nights,
      this.calculateRentPrice(values).discounted_price
    );
  }

  calculateInsurances(values) {
    const house = this.props.house;
    const prices = this.calculateRentPrice(values);
    const {
      damage_insurance,
      cancel_insurance,
      travel_insurance,
      persons
    } = values;

    let insurances = [];
    if (house.damage_insurance_required || damage_insurance === 1) {
      let ins = {};
      ins.name = "damage_insurance";
      ins.price = prices.discounted_price * (1.81 / 100);
      insurances.push(ins);
    }
    if (cancel_insurance === "1" || cancel_insurance === "2") {
      let perc = cancel_insurance === "1" ? 5.5 : 7;
      let ins = {};
      ins.name = "cancel_insurance";
      ins.price = prices.discounted_price * (perc / 100);
      insurances.push(ins);
    }
    if (travel_insurance === "1") {
      let ins = {};
      ins.name = "travel_insurance";
      ins.price = persons * (house.booking_price.nights + 1) * 2.8;
      insurances.push(ins);
    }
    if (
      house.damage_insurance_required ||
      values.damage_insurance === 1 ||
      values.cancel_insurance === 1 ||
      values.cancel_insurance === 2 ||
      values.travel_insurance === 1
    ) {
      let ins = {};
      ins.name = "insurance_costs";
      ins.price = 6.95;
      insurances.push(ins);
    }
    return insurances;
  }

  translatedOption(id, value) {
    return (
      <FormattedMessage
        id={id}
        children={formattedMessage => (
          <option value={value}>{formattedMessage}</option>
        )}
      />
    );
  }

  calculateRentPrice(values) {
    const {
      base_price,
      discount,
      person_percentages
    } = this.props.house.booking_price;
    const { persons } = values;
    let percentage = {
      persons: 5000
    };
    for (let perc of person_percentages) {
      if (persons < perc.persons && perc.persons < percentage.persons) {
        percentage = perc;
      }
    }

    let price = base_price * (percentage.percentage / 100);

    let new_rent = {
      rent_price: price,
      discounted_price: price - price * (discount / 100)
    };

    return new_rent;
  }

  calculateTotal(values) {
    const bookingPrice = this.props.house.booking_price;
    let total = 0;
    total += this.calculateRentPrice(values).discounted_price;

    for (let ins of this.calculateInsurances(values)) {
      total += ins.price;
    }

    for (let cost of bookingPrice.required_house_costs) {
      total += parseFloat(this.calculateCost(cost, values));
    }
    for (let cost of bookingPrice.optional_house_costs) {
      total += parseFloat(this.calculateCost(cost, values));
    }

    return total;
  }

  render() {
    const adults = this.createPeronsArray(this.state.max_persons);
    const children = this.createPeronsArray(this.state.max_persons - 1);
    const bookingPrice = this.props.house.booking_price;
    const { house, locale } = this.props;

    let costs = {};

    for (const val of bookingPrice.optional_house_costs) {
      costs[val.id] = "0";
    }
    return (
      <Mutation mutation={CREATE_BOOKING_MUTATION}>
        {(createBooking, { loading, error, data }) => (
          <Formik
            validate={this.validate}
            initialValues={{
              ...this.props.booking,
              costs,
              adults: 2,
              children: 0,
              babies: 0,
              persons: 2
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log({ costs: JSON.stringify(values.costs) });

              let variables = {
                first_name: values.first_name,
                last_name: values.last_name,
                is_option: JSON.parse(values.is_option),
                address: values.address || "",
                zipcode: values.zipcode || "",
                city: values.city || "",
                phone: values.phone || "",
                email: values.email,
                house_code: values.objectCode,
                portal_code: values.portalCode,
                language: locale,
                country: values.country.toUpperCase(),
                adults: Number(values.adults),
                children: Number(values.children) || 0,
                babies: Number(values.babies) || 0,
                pets: Number(values.pets) || 0,
                discount: values.discount || 0,
                damage_insurance: Number(values.damage_insurance) || 0,
                cancel_insurance: Number(values.cancel_insurance) || 0,
                travel_insurance: Number(values.travel_insurance) || 0,
                discount_reason: values.discount_reason || "",
                arrival_date: values.arrivalDate.date,
                departure_date: values.departureDate.date,
                costs: JSON.stringify(values.costs)
              };
              createBooking({ variables });

              setTimeout(() => {
                setSubmitting(false);
              }, 1000);
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
                {loading && <div className="return-message">Loading...</div>}
                {error && (
                  <Modal show={true}>
                    <FormattedMessage id="something_went_wrong_please_try_again" />
                  </Modal>
                )}
                {data && (
                  <Modal show={true}>
                    <SuccessMessage />
                  </Modal>
                )}

                <div className="form-content">
                  <div className="form-section">
                    <a
                      className="return-link"
                      onClick={() => {
                        this.props.onReturn();
                      }}
                    >
                      <FormattedMessage id="return_to_calendar" />
                    </a>
                    <h2>
                      <FormattedMessage id="stay_details" />
                    </h2>
                    <div className="form-row inline">
                      <label htmlFor="adults">
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
                      {errors.adults && touched.adults && (
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
                  <Insurances
                    house={house}
                    Field={Field}
                    FormattedMessage={FormattedMessage}
                  />
                  <div className="form-section">
                    <h2>
                      <FormattedMessage id="extra_costs_bookable" />
                    </h2>
                    <div>
                      {bookingPrice.optional_house_costs.map(cost => {
                        if (
                          !["none", "total"].includes(cost.method) &&
                          cost.max_available > 0
                        ) {
                          return (
                            <div className="form-row inline" key={cost.id}>
                              <label htmlFor={cost.id}>{cost.name}</label>
                              <Field
                                component="select"
                                name={`costs[` + cost.id + `]`}
                              >
                                {this.createPeronsArray(cost.max_available).map(
                                  opt => {
                                    return (
                                      <option key={opt} value={opt}>
                                        {opt}
                                      </option>
                                    );
                                  }
                                )}
                              </Field>

                              <div className="price_per">
                                €{" "}
                                <FormattedNumber
                                  value={cost.amount}
                                  minimumFractionDigits={2}
                                  maximumFractionDigits={2}
                                />{" "}
                                {cost.method_name}
                              </div>
                              <div>
                                {cost.description ? (
                                  <div>
                                    <Modal buttonText={<Icon />}>
                                      <p>{cost.description}</p>
                                    </Modal>
                                  </div>
                                ) : null}
                              </div>
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
                    {this.state.bookingFields.map(input => {
                      if (input.id === "country") {
                        return (
                          <div className="form-row" key={input.id}>
                            <label htmlFor={input.id}>{input.label}</label>
                            <Field component="select" name={input.id}>
                              {Countries[window.__localeId__].map(country => {
                                return (
                                  <option
                                    value={country.alpha2}
                                    key={country.alpha2}
                                  >
                                    {country.name}
                                  </option>
                                );
                              })}
                            </Field>
                            {errors[input.id] && (
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
                            {errors[input.id] && (
                              <div className="error-message">
                                {errors[input.id]}
                              </div>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>

                <div className="form-sum">
                  <Summary house={house} bookingPrice={bookingPrice} />

                  <div>
                    <RadioButtonGroup id="is_option" className="booking_option">
                      <Field
                        component={RadioButton}
                        name="is_option"
                        id="true"
                        label={<FormattedMessage id="option" />}
                      />
                      <Field
                        component={RadioButton}
                        name="is_option"
                        id="false"
                        label={<FormattedMessage id="booking" />}
                      />
                    </RadioButtonGroup>
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
                              value={this.calculateRentPrice(values).rent_price}
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
                            €{"  "}
                            <FormattedNumber
                              value={
                                this.calculateRentPrice(values).discounted_price
                              }
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
                        {this.calculateInsurances(values).map(ins => {
                          return (
                            <tr key={ins.name}>
                              <td>
                                <FormattedMessage id={ins.name} />
                              </td>
                              <td className="price">
                                €{"  "}
                                <FormattedNumber
                                  value={ins.price}
                                  minimumFractionDigits={2}
                                  maximumFractionDigits={2}
                                />
                              </td>
                            </tr>
                          );
                        })}
                        {bookingPrice.required_house_costs.map(cost => {
                          if (cost.method === "none") {
                            return (
                              <tr key={cost.id}>
                                <td>{cost.name}</td>
                                <td className="price">{cost.method_name}</td>
                              </tr>
                            );
                          } else {
                            return (
                              <tr key={cost.id}>
                                <td>{cost.name}</td>
                                <td className="price">
                                  €{"  "}
                                  <FormattedNumber
                                    value={this.calculateCost(cost, values)}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                  />
                                </td>
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="costs-section">
                    <table>
                      <tbody>
                        {bookingPrice.optional_house_costs.map(cost => {
                          if (cost.method === "none") {
                            return (
                              <tr key={cost.id}>
                                <td>{cost.name}</td>
                                <td className="price">{cost.method_name}</td>
                              </tr>
                            );
                          } else {
                            return (
                              <tr key={cost.id}>
                                <td>{cost.name}</td>
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
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="costs-section">
                    <table>
                      <tbody>
                        <tr>
                          <th
                            style={{
                              textAlign: "left",
                              testTransform: "capitalize"
                            }}
                          >
                            <FormattedMessage id="total" />
                          </th>
                          <td className="price">
                            €{" "}
                            <FormattedNumber
                              value={this.calculateTotal(values)}
                              minimumFractionDigits={2}
                              maximumFractionDigits={2}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {status && status.msg && <div>{status.msg}</div>}
                  <div className="terms">
                    <FormattedMessage id="agree_with" />
                    <FormattedMessage
                      id="terms"
                      children={fm => (
                        <Modal buttonText={fm}>
                          <iframe
                            scr={house.rental_terms}
                            title={fm}
                            width="100%"
                            height="100%"
                            frameborder="0"
                          />
                        </Modal>
                      )}
                    />
                  </div>
                  <button className="button" type="submit" disabled={isSubmitting}>
                    <FormattedMessage id="book" />
                  </button>
                </div>
              </Form>
            )}
          />
        )}
      </Mutation>
    );
  }
}

export default FormCreator;
