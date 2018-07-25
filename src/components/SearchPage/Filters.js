import React, { Component } from 'react';
import Field from './Field';


class Filters extends Component {
    constructor(props) {
        super(props)
        this.saveFilters = this.saveFilters.bind(this)
        this.state = {filters: {}}
    }

    saveFilters(field, input) {
        let newFilters = this.state.filters
        newFilters[field] = input
        this.setState({filters: newFilters})
        console.log(this.state.filters);
    }

  render() {
    const PortalSite = this.props.PortalSite
    const filters = this.state.filters

    return (
        <div
            style={{
                width: '20%'
            }}>
            {PortalSite.options.searchFields.map(field =>
                <div key={field.id}>
                    <label style={{
                            width: '100%',
                            display: 'block'
                        }}
                        >{field.label}</label>
                    <Field field={field} options={PortalSite[field.id]} filters={filters} onFilterChange={this.saveFilters} />
                </div>
            )}
        </div>
    )
  }
}

export default Filters;
