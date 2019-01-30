import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Reload from '../icons/Reload.svg';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.saveFilters = this.saveFilters.bind(this);
  }

  saveFilters(field, input) {
    let newFilters = this.props.filters;
    newFilters[field] = input;
    this.props.onFilterChange(newFilters);
  }

  render() {
    const { PortalSite, filters, options } = this.props;
    const searchFields = PortalSite.options.searchFields || [
      {
        label: 'Land',
        id: 'countries',
        type: 'select',
        required: false,
        mandatory: true,
        options: ['select', 'list', 'radio', 'text'],
      },
    ];

    return (
      <div
        className={
          options.filtersForm
            ? options.filtersForm.show
              ? `filters filters-${options.filtersForm.location}`
              : 'filters-hidden'
            : 'filters'
        }
      >
        <button
          onClick={() => {
            let filters = {};
            for (var property in this.props.filters) {
              filters[property] = '';
            }
            this.props.onFilterChange(filters);
          }}
          className="filters-reload"
        >
          <Reload />
        </button>
        {searchFields.map(field => (
          <div key={field.id} className="bu-field">
            <label
              style={{
                width: '100%',
                display: 'block',
              }}
              htmlFor={field.id}
            >
              {field.label}
            </label>
            <Field
              field={field}
              PortalSite={PortalSite}
              filters={filters}
              value={filters[field.id]}
              onFilterChange={this.saveFilters}
            />
          </div>
        ))}
      </div>
    );
  }
}

Filters.propTypes = {
  PortalSite: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
