import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import './Field.css';
import ListItem from './inputs/listItem.css';

class Field extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      focused: false,
    };
  }

  handleChange(event) {
    this.props.onFilterChange(this.props.field.id, event.target.value);
  }

  handleCheckboxChange(event) {
    this.props.onFilterChange(this.props.field.id, event.target.value);
  }

  createNumberArray(max_number) {
    return Array.apply(null, { length: max_number + 1 }).map(
      Number.call,
      Number
    );
  }

  createPriceArray(max_price) {
    let rounded = Math.ceil(max_price / 100);
    return Array.from({ length: rounded }, (v, k) => k * 100);
  }

  handleDateChange(date) {
    if (date) {
      this.props.onFilterChange(this.props.field.id, date.format('YYYY-MM-DD'));
    } else {
      this.props.onFilterChange(this.props.field.id, '');
    }
  }

  handlePropertyChange(event) {
    const value = Number(event.target.value);

    let properties = this.props.filters.properties || [];
    if (properties.includes(value)) {
      let index = properties.indexOf(value);
      properties.splice(index, 1);
    } else {
      properties.push(value);
    }
    this.props.onFilterChange('properties', properties);
  }

  render() {
    const field = this.props.field;
    const { PortalSite } = this.props;
    //   console.log({PortalSite})
    let options = [];
    if (['countries', 'cities', 'regions'].includes(field.id)) {
      options = PortalSite[field.id];
    } else if (field.id === 'persons_min' || field.id === 'persons_max') {
      options = this.createNumberArray(PortalSite.max_persons);
    } else if (field.id === 'bedrooms_min') {
      options = this.createNumberArray(PortalSite.max_bedrooms);
    } else if (field.id === 'bathrooms_min') {
      options = this.createNumberArray(PortalSite.max_bathrooms);
    } else if (field.id === 'weekprice_max') {
      options = this.createPriceArray(PortalSite.max_weekprice);
    } else {
      options = this.createNumberArray(PortalSite[field.id]);
    }
    let input;
    const value = this.props.value;
    const countries = this.props.filters.countries;
    const regions = this.props.filters.regions;
    //   const layouts = this.props.filters.layouts || [];
    const properties = this.props.filters.properties || [];

    moment.updateLocale('nl', {
      months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split(
        '_'
      ),
      weekdaysMin: 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
      week: {
        dow: 1,
      },
    });
    if (field.id === 'properties') {
      let requiredCategories = PortalSite.options.filtersForm.categories;
      input = [];
      PortalSite.categories.map(category => {
        if (requiredCategories.includes(category.id)) {
          input.push(
            <div className="bu-properties" key={category.id}>
              <strong>{category.name}</strong>
              <ul>
                {category.properties.map(property => (
                  <li key={property.id}>
                    <label htmlFor={property.id}>
                      <input
                        type="checkbox"
                        id={property.id}
                        value={property.id}
                        checked={properties.includes(property.id)}
                        onChange={this.handlePropertyChange}
                      />
                      {property.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      });
    } else if (field.type === 'select') {
      if (options && ['countries', 'cities', 'regions'].includes(field.id)) {
        input = (
          <select
            name={field.id}
            onBlur={this.handleChange}
            onChange={this.handleChange}
            value={value}
          >
            <option value="" />
            {options.map(opt => {
              let hidden = false;
              if (['cities', 'regions'].includes(field.id)) {
                if (countries && !countries.includes(opt.country_id)) {
                  hidden = true;
                }
                if (field.id === 'cities') {
                  if (regions && !regions.includes(opt.region)) {
                    hidden = true;
                  }
                }
              }

              return (
                <option
                  key={opt.id}
                  value={opt.id}
                  id={opt.region}
                  disabled={hidden}
                  hidden={hidden}
                >
                  {opt.name}
                </option>
              );
            })}
          </select>
        );
      } else {
        input = (
          <select
            name={field.id}
            onBlur={this.handleChange}
            onChange={this.handleChange}
            value={value}
          >
            <option value="" />
            {options.map(opt => {
              let hidden = false;

              return (
                <option key={opt} value={opt} disabled={hidden} hidden={hidden}>
                  {opt}
                </option>
              );
            })}
          </select>
        );
      }
    } else if (field.type === 'list') {
      input = (
        <ul className="radioList">
          {options.map(opt => (
            <ListItem
              key={opt.id}
              disabled={countries ? !countries.includes(opt.country_id) : false}
            >
              <input
                name={field.id}
                type="checkbox"
                id={opt.id}
                value={opt.id}
                disabled={
                  countries ? !countries.includes(opt.country_id) : false
                }
                checked={value === opt.id}
                onBlur={this.handleCheckboxChange}
                onChange={this.handleCheckboxChange}
              />
              <label htmlFor={opt.id}>{opt.name}</label>
            </ListItem>
          ))}
        </ul>
      );
    } else if (field.type === 'radio') {
      input = (
        <ul className="radioList">
          {options.map(opt => (
            <ListItem
              key={opt.id || opt}
              disabled={countries ? !countries.includes(opt.country_id) : false}
            >
              <input
                name={field.id}
                type="radio"
                id={opt.id || opt}
                value={opt.id || opt}
                disabled={
                  countries ? !countries.includes(opt.country_id) : false
                }
                // checked={value === opt.id || opt}
                onBlur={this.handleChange}
                onChange={this.handleChange}
              />
              <label htmlFor={opt.id || opt}>{opt.name || opt}</label>
            </ListItem>
          ))}
        </ul>
      );
    } else if (field.type === 'number') {
      input = (
        <input
          value={value}
          type="number"
          min="0"
          max={
            field.id === 'persons_min'
              ? PortalSite.max_persons
              : PortalSite[field.id]
          }
          onBlur={this.handleChange}
        />
      );
    } else if (field.type === 'date') {
      let tempval;
      if (value === '' || !value) {
        tempval = null;
      } else {
        tempval = moment(value);
      }
      input = (
        <SingleDatePicker
          date={tempval}
          onDateChange={this.handleDateChange}
          focused={this.state.focused}
          onFocusChange={({ focused }) =>
            this.setState({
              focused,
            })
          }
          id={field.id}
          displayFormat="DD-MM-YYYY"
          showClearDate={false}
          numberOfMonths={1}
          noBorder={true}
          placeholder=""
        />
      );
    } else {
      input = <input value={value} onBlur={this.handleChange} />;
    }
    return input;
  }
}

Field.propTypes = {
  field: PropTypes.object.isRequired,
  PortalSite: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Field;
