import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import Loading from '../icons/loading.svg';
import SingleResult from './SingleResult';
import './Results.css';
import { HOUSES_QUERY } from '../../_lib/SearchQueries';

class Results extends Component {
  render() {
    const { filters, PortalSite } = this.props;

    let min_nights = null;
    if (filters.departure_date && filters.arrival_date) {
      min_nights = differenceInCalendarDays(
        filters.departure_date,
        filters.arrival_date
      );
    }

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
      weekprice_max: Number(filters.weekprice_max),
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
            <div id="results">
              {Results.map(result => (
                <SingleResult key={result.id} result={result} />
              ))}
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
};

export default Results;
