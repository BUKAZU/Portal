import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Reload from '../icons/Reload.svg';
import { FormattedMessage } from 'react-intl';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.saveFilters = this.saveFilters.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      show: false,
    };
  }

  saveFilters(field, input) {
    let newFilters = this.props.filters;
    newFilters[field] = input;
    this.props.onFilterChange(newFilters);
  }

  toggle() {
    const { show } = this.state;
    let newShow = !show;
    this.setState({
      show: newShow,
    });
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
    let fixed = options.filtersForm
      ? options.filtersForm.fixedMobile
        ? 'fixed-mobile'
        : null
      : null;

    let filterClass = options.filtersForm
      ? options.filtersForm.show
        ? `filters filters-${options.filtersForm.location}`
        : 'filters-hidden'
      : 'filters';

    let show = this.state.show && 'showOnMobile';

    return (
      <React.Fragment>
        <button className={`filters-button ${fixed}`} onClick={this.toggle}>
          <FormattedMessage id="filters" />
        </button>
        <div className={`${filterClass} ${fixed} ${show}`}>
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
                {PortalSite[`${field.id}_label`]}
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
      </React.Fragment>
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
