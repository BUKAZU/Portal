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
            {searchFields.map(field =>
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
