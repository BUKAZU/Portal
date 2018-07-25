import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SingleResult from './SingleResult'

export const HOUSES_QUERY = gql`
    query PortalSiteHousesQuery($id: ID!){
        PortalSite(id: $id) {
            houses {
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
    const id = this.props.PortalSite.portal_code

    return (
        <Query query={HOUSES_QUERY} variables={{ id }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const Houses = data.PortalSite.houses

              return (
                <div>
                {Houses.map(house =>
                    <SingleResult key={house.id} house={house} />
                )}
                </div>
              )
            }}
        </Query>
    )
  }
}

export default Results;
