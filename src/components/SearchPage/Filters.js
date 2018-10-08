import React, { Component } from 'react';
import Field from './Field';

class Filters extends Component {
    constructor(props) {
        super(props)
        this.saveFilters = this.saveFilters.bind(this)
    }

    saveFilters(field, input) {
        let newFilters = this.props.filters
        newFilters[field] = input
        this.props.onFilterChange(newFilters)
    }

  render() {
    const PortalSite = this.props.PortalSite
    const filters = this.props.filters

    return (
        <div className="filters"
            >
            {PortalSite.options.searchFields.map(field =>
                <div key={field.id}>
                    <label style={{
                            width: '100%',
                            display: 'block'
                        }}
                        >{field.label}</label>
                    <Field field={field} options={PortalSite[field.id]} filters={filters} value={filters[field.id]} onFilterChange={this.saveFilters} />
                </div>
            )}
        </div>
    )
  }
}

export default Filters;
