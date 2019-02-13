import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filters from './Filters';
import Results from './Results';

// import './SearchPage.css'

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      activePage: 1,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(data) {
    let filters = data;
    this.setState({
      filters,
      activePage: 1,
    });
  }

  render() {
    let filters = this.state.filters;
    const { options } = this.props;

    return (
      <div
        id="search-page"
        className={
          options.filtersForm
            ? options.filtersForm.location === 'right'
              ? 'bu-reverse'
              : options.filtersForm.location === 'top'
              ? 'bu-column'
              : null
            : null
        }
      >
        <Filters
          PortalSite={this.props.PortalSite}
          filters={filters}
          onFilterChange={this.onFilterChange}
          options={options}
        />
        <Results
          PortalSite={this.props.PortalSite}
          currentPage={this.state.activePage}
          filters={filters}
        />
      </div>
    );
  }
}

SearchPage.propTypes = {
  PortalSite: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default SearchPage;
