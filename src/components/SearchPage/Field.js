import React, { Component } from 'react';


class Field extends Component {
  render() {
      const field = props.field
      const options = props.options;
      if (field.type === 'select') {
          console.log(options.constructor);
          if (options.constructor === Array) {
              return (<select name={field.id}>
                  {options.map(opt =>
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                  )}
                  </select>);
          }
          return (<input/>)
      } else {
          return (<input/>)
      }
}

export default Field;
