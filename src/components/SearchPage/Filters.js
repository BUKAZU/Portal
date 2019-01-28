import React, { Component } from 'react';
import Field from './Field';
import Reload from '../icons/Reload.svg'

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
    const { PortalSite, filters }= this.props
    const searchFields = PortalSite.options.searchFields || [
        {
            "label": "Land",
            "id": "countries",
            "type": "select",
            "required": false,
            "mandatory": true,
            "options": [
                "select",
                "list",
                "radio",
                "text"
            ]
        }
    ]

    return (
        <div className="filters"
            >
            <button onClick={() => {this.props.onFilterChange({})}} className='filters-reload'><Reload /></button>
            {searchFields.map(field =>
                <div key={field.id}>
                    <label style={{
                            width: '100%',
                            display: 'block'
                        }}
                        >{field.label}</label>
                    <Field field={field} PortalSite={PortalSite} filters={filters} value={filters[field.id]} onFilterChange={this.saveFilters} />
                </div>
            )}
        </div>
    )
  }
}

export default Filters;
