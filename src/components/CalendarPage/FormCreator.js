import React from "react";
import { Formik, Form, Field } from "formik";
import { FormattedMessage } from "react-intl";
import * as calc from "../../_lib/costs";

class FormCreator extends React.Component {
   state = {
        max_persons: this.props.house.persons,
        adults: 1
   }

   createPeronsArray(persons) {
       return Array.apply(null, { length: persons }).map(Number.call, Number)
   }

    validate = (values) => {
        let errors = {};

        values.persons = Number(values.children) + Number(values.adults) + Number(values.babies);

        if (values.adults < 1) {
            errors.adults = 'Required';
        }
        if (values.persons > this.state.max_persons) {
            errors.max_persons = <FormattedMessage id="max_persons_reached" />;
        }

        return errors;
    };

    calculateRequiredCosts(values) {
        const bookingPrice = this.props.house.booking_price


        bookingPrice.required_house_costs.map(cost => {
            return <div>
                    {cost[`name_${window.__localeId__}`]}: {calc[cost.method](cost.amount, values[cost.id], values.persons, bookingPrice.nights, bookingPrice.rent_price)}
                </div>;
        })
    }

    calculateCost(cost, values) {
        const bookingPrice = this.props.house.booking_price
        return calc[cost.method](cost.amount, Number(values[cost.id]), Number(values.persons), bookingPrice.nights, bookingPrice.rent_price)
    }

  render() {
    const adults = this.createPeronsArray(this.state.max_persons);
    const children = this.createPeronsArray(this.state.max_persons - 1)
    const bookingPrice = this.props.house.booking_price
    let optionalCosts = {};

    for (const val of bookingPrice.optional_house_costs) {
        optionalCosts[val.id] = 0;
    }

    return (

    <Formik
      validate={this.validate}
      initialValues={{ ...this.props.booking, ...optionalCosts, adults: 2, children: 0, babies: 0, persons: 0}}
      render={({ errors, touched, values, status, isSubmitting, handleChange, handleBlur}) => (
        <Form className="form">
            <div className='form-row inline'>
                <label htmlFor="persons">
                    <FormattedMessage id="adults" />
                </label>
                  <Field component="select" name="adults"
                      onChange={handleChange}
                      onBlur={handleBlur}
                  >
                    {adults.map(opt => {
                        return <option key={opt} value={opt}>{opt}</option>
                    })}
                </Field>
                {errors.adults && touched.adults && <div>{errors.adults}</div>}
            </div>
            <div className='form-row inline'>
                <label htmlFor="children">
                    <FormattedMessage id="children" />
                </label>
                  <Field component="select" name="children">
                    {children.map(opt => {
                        return <option key={opt} value={opt}>{opt}</option>
                    })}
                </Field>
            </div>
            <div className='form-row inline'>
                <label htmlFor="babies">
                    <FormattedMessage id="babies" />
                </label>
                  <Field component="select" name="babies">
                    {children.map(opt => {
                        return <option key={opt} value={opt}>{opt}</option>
                    })}
                </Field>
            </div>
            <div>
                {bookingPrice.optional_house_costs.map(cost => {
                    if (!['none', 'total'].includes(cost.method)) {
                        return (
                            <div className='form-row inline' key={cost.id}>
                                <label htmlFor={cost.id}>
                                    {cost[`name_${window.__localeId__}`]}
                                </label>
                                <Field type="number" name={cost.id} />
                            </div>
                        )
                     } else {
                         return ''
                     }
                })}
            </div>


            {errors.max_persons && <div className='error-message'>{errors.max_persons}</div>}

            <div className="costlist">
                Cost list
                {bookingPrice.required_house_costs.map(cost => {
                      return <div key={cost.id}>
                          {cost[`name_${window.__localeId__}`]}: {this.calculateCost(cost, values)}
                        </div>;
                })}
                <br></br>
                {bookingPrice.optional_house_costs.map(cost => {
                      return <li key={cost.id}>{cost[`name_${window.__localeId__}`]}: {this.calculateCost(cost, values)}</li>
                })}
            </div>

          {status && status.msg && <div>{status.msg}</div>}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    />
    )
  }
}

export default FormCreator;
