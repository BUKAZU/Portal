import React, { Component } from 'react';
import './App.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const PORTAL_QUERY = gql`
    query PortalSiteQuery($id: ID!) {
        PortalSite(id: $id) {
            options
            countries {
                id
                name
            }
            regions {
                id
                name
                country_id
            }
            cities {
                id
                name
                region
                country_id
            }
            extra_search
            max_bathrooms
            max_bedrooms
            max_nights
            max_persons
            max_weekprice
            country_label
            country_placeholder
            region_label
        }
    }
`

class App extends Component {
  render() {
      const id = this.props.portalCode
    return (
        <Query query={PORTAL_QUERY} variables={{ id }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const linksToRender = data.feed

              return (
                <div>
                  {linksToRender}
                </div>
              )
            }}
        </Query>
    )
  }
}

export default App;
