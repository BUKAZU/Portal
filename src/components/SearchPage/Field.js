import React, { Component } from 'react';
import './Field.css'

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
      const value = this.props.filters[field.id];

      switch (field.type) {
          case 'select':
              if (options.constructor === Array) {
                  input = <select  name={field.id} onChange={this.handleChange}>
                      <option value=''>Maak een keuze</option>
                      {options.map(opt =>
                          <option key={opt.id} value={opt.id}>{opt.name}</option>
                      )}
                  </select>
              } else {
                  input = <input value={value} onChange={this.handleChange} />
              }
              break

          default:
              input = <input value={value} onChange={this.handleChange} />
      }
      return input
  }
}

export default Field;
