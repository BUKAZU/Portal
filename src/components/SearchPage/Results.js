import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SingleResult from './SingleResult'

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
    const variables = {
        id: this.props.PortalSite.portal_code,
        country_id: 1
    }

    return (
        <Query query={HOUSES_QUERY} variables={variables}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const Results = data.PortalSite.houses

              return (
                <div>
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

export default Results;