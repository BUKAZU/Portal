import React, { Component } from 'react';
import './Field.css'
import ListItem from './inputs/listItem.css'

class Field extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.onFilterChange(this.props.field.id, event.target.value);
    }

  render() {
      const field = this.props.field
      const options = this.props.options;
      let input;
      const value = this.props.value;
      const countries = this.props.filters.countries
      const regions = this.props.filters.regions;
      const layouts = this.props.filters.layouts || [];
      const properties = this.props.filters.properties || [];

      if (field.type === 'select') {
          if (options.constructor === Array) {

              input = (
                  <select name={field.id} onChange={this.handleChange} value={value}>
                      <option value=""></option>
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
              input = <input value={value} onChange={this.handleChange} />
          }
      } else if(field.type === 'list')  {
          input = <ul className='radioList'>
            {options.map(opt =>
                <ListItem key={opt.id} disabled={countries ? !countries.includes(opt.country_id) : false }>
                    <input name={field.id} type='radio' id={opt.id} value={opt.id} disabled={countries ? !countries.includes(opt.country_id) : false } checked={value === opt.id} onChange={this.handleChange}/>
                    <label htmlFor={opt.id}>{opt.name}</label>
                </ListItem>

            )}
          </ul>
      } else {
          input = <input value={value} onChange={this.handleChange} />
      }
      return input
  }
}

export default Field;
