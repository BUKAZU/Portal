import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filters from './Filters';
import Results from './Results';

// import './SearchPage.css'

class SearchPage extends Component {
  constructor(props) {
    super(props);
    let limit = this.props.options.filtersForm
      ? Number(this.props.options.filtersForm.no_results)
      : 20;
    this.state = {
      filters: this.props.filters,
      activePage: 1,
      limit,
      skip: 0,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }

  onFilterChange(data) {
    let filters = data;
    this.setState({
      filters,
    });
    this.pageChange(1);
  }

  pageChange(pageNumber) {
    const { limit } = this.state;
    let newSkip = pageNumber * limit - limit;

    this.setState({
      activePage: pageNumber,
      skip: newSkip,
    });
  }

  render() {
    const { filters, activePage, limit, skip } = this.state;
    const { options, locale } = this.props;

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
          filters={filters}
          activePage={activePage}
          locale={locale}
          onPageChange={this.pageChange}
          skip={skip}
          limit={limit}
        />
      </div>
    );
  }
}

SearchPage.propTypes = {
  PortalSite: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
};

export default SearchPage;
