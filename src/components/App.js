import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import SearchPage from './SearchPage/SearchPage'
import CalendarPage from './CalendarPage/CalendarPage'

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
    const { portalCode, objectCode, locale} = this.props

    return <Query query={PORTAL_QUERY} variables={{ id: portalCode }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const PortalSite = data.PortalSite;

          if (objectCode !== null) {
            console.log(objectCode);

            return <CalendarPage PortalSite={PortalSite} objectCode={objectCode} locale={locale} />;
          } else {
            return <SearchPage PortalSite={PortalSite} locale={locale} />;
          }
        }}
      </Query>;
  }
}

export default App;
