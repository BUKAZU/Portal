import React, { Component } from 'react';
// import Field from './Field';


class Filters extends Component {
    constructor(props) {
        super.props
    }
  render() {
    const PortalSite = this.props.PortalSite
    console.log(PortalSite['cities']);

    return (
        <div>
            {PortalSite.options.searchFields.map(field =>
                <div key={field.id}>
                    <label>{field.label}</label>
                    <Field field={field} options={PortalSite[field.id]} />
                </div>
            )}
        </div>
    )
  }
}

function Field(props) {
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
        return <input/>
    } else {
        return <input/>
    }
}

export default Filters;
