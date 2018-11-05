import React, { Component } from 'react';
import { Query } from "react-apollo";

import { PORTAL_QUERY } from '../_lib/queries'

import SearchPage from './SearchPage/SearchPage'
import CalendarPage from './CalendarPage/CalendarPage'

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
