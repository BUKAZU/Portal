import React, { Component } from 'react';

class Field extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {value: ''}
    }

    handleChange(e) {
        this.props.onFilterChange(this.props.field.id, e.target.value);
    }

  render() {
      const field = this.props.field
      const options = this.props.options;
      let input;
      const value = this.state.value;

      if (field.type === 'select') {
          if (options.constructor === Array) {
              input = <select  name={field.id} onChange={this.handleChange}>
                  {options.map(opt =>
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                  )}
                  </select>
          } else {
              input = <input value={value} onChange={this.handleChange} />
          }
      } else {
          input = <input value={value} onChange={this.handleChange} />
      }
      return input
  }
}

export default Field;
