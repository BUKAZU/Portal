import React, { Component } from 'react';
import './App.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import SearchPage from './SearchPage/SearchPage'

export const PORTAL_QUERY = gql`
    query PortalSiteQuery($id: ID!) {
        PortalSite(id: $id) {
            portal_code
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

              const PortalSite = data.PortalSite

              return (
                <div>
                  <SearchPage PortalSite={PortalSite} />
                </div>
              )
            }}
        </Query>
    )
  }
}

export default App;
