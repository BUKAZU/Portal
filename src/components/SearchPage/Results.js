import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import Loading from '../icons/loading.svg';
import SingleResult from './SingleResult';
import Paginator from './Paginator';

import { HOUSES_QUERY } from '../../_lib/SearchQueries';

class Results extends Component {
  constructor(props) {
    super(props);

    this.pageChange = this.pageChange.bind(this);

    this.state = {
      limit: 10,
      skip: 0,
      activePage: this.props.activePage,
      totalAmount: 10,
    };
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
    const { filters, PortalSite } = this.props;
    const { limit, skip } = this.state;

    let min_nights = null;
    if (filters.departure_date && filters.arrival_date) {
      min_nights = differenceInCalendarDays(
        filters.departure_date,
        filters.arrival_date
      );
    }
    let filterProperties = filters.properties || [];
    filterProperties = filterProperties.map(e => {
      return JSON.stringify(e);
    });

    let properties = filterProperties.join(',');

    let variables = {
      id: PortalSite.portal_code,
      country_id: filters.countries || null,
      region_id: filters.regions || null,
      city_id: filters.cities,
      persons_min: Number(filters.persons_min),
      persons_max: Number(filters.persons_max),
      bedrooms_max: Number(filters.bedrooms_max),
      bathrooms_max: Number(filters.bathrooms_max),
      arrival_date: filters.arrival_date,
      no_nights: Number(min_nights) || null,
      extra_search: filters.extra_search,
      properties,
      weekprice_max: Number(filters.weekprice_max) || null,
      limit,
      skip,
    };

    return (
      <Query query={HOUSES_QUERY} variables={variables}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div>
                <Loading />
              </div>
            );
          if (error) return <div>Error</div>;

          const Results = data.PortalSite.houses;

          return (
            <div
              id="results"
              className={
                PortalSite.options.filtersForm
                  ? PortalSite.options.filtersForm.mode
                  : null
              }
            >
              <Paginator
                variables={variables}
                activePage={this.state.activePage}
                onPageChange={this.pageChange}
              />{' '}
              {Results.length === 0 ? (
                <div className="bu-noresults">
                  <FormattedMessage id="no_results" />
                </div>
              ) : null}
              {Results.map(result => (
                <SingleResult key={result.id} result={result} />
              ))}
              <Paginator
                variables={variables}
                activePage={this.state.activePage}
                onPageChange={this.pageChange}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

Results.propTypes = {
  PortalSite: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  activePage: PropTypes.number.isRequired,
};

export default Results;
