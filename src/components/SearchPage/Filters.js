import React, { Component } from 'react';
import Field from './Field';


class Filters extends Component {
    constructor(props) {
        super(props)
        this.saveFilters = this.saveFilters.bind(this)
        this.state = {filters: []}
    }

    saveFilters(field, input) {
        this.setState(prevState => ({
            filters: [this.state.filters.array, {[field]: input} ]
        }))
    }

  render() {
    const PortalSite = this.props.PortalSite

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
                    <Field field={field} options={PortalSite[field.id]} onFilterChange={this.saveFilters} />
                </div>
            )}
        </div>
    )
  }
}

export default Filters;
