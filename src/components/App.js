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
          const options = data.PortalSite.options;

          let root = document.documentElement;


          root.style.setProperty("--bukazu-discount", `${options.colors ? options.colors.discount : "orange"}`);
          root.style.setProperty("--bukazu-cell", `${options.colors ? options.colors.cell : "#fff"}`);
          root.style.setProperty("--bukazu-arrival", `${options.colors ? options.colors.arrival : "#6eeb83"}`);
          root.style.setProperty("--bukazu-booked", `${options.colors ? options.colors.booked : "#ea2b1f"}`);
          root.style.setProperty("--bukazu-button", `${options.colors ? options.colors.button : "rgba(23, 190, 187, 0.75)"}`);
          root.style.setProperty("--bukazu-departure", `${options.colors ? options.colors.departure : "yellow"}`);

          if (objectCode !== null) {
            return <CalendarPage PortalSite={PortalSite} objectCode={objectCode} locale={locale} />;
          } else {
            return <SearchPage PortalSite={PortalSite} locale={locale} />;
          }
        }}
      </Query>;
  }
}

export default App;
