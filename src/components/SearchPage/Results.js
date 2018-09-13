import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SingleResult from './SingleResult'
import './Results.css'

export const HOUSES_QUERY = gql`
    query PortalSiteHousesQuery($id: ID!, $country_id: ID!){
        PortalSite(id: $id) {
            houses(
                country_id: $country_id
            ) {
                id
                name
                persons
                description
                image_url
                house_url
                minimum_week_price
            }
        }
    }
`


class Results extends Component {
  render() {
    let variables =  {
            id: this.props.PortalSite.portal_code,
            country_id: this.props.filters.countries
    }

    return (
        <Query query={HOUSES_QUERY} variables={variables}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const Results = data.PortalSite.houses

              return (
                <div id='results'>
                {Results.map(result =>
                    <SingleResult key={result.id} result={result} />
                )}
                </div>
              )
            }}
        </Query>
    )
  }
}

Results.defaultProps = {
    countries: "",
    city_id: "",
}

export default Results;
