import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Loading from './icons/loading.svg';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { PORTAL_QUERY } from '../_lib/queries';

import SearchPage from './SearchPage/SearchPage';
import CalendarPage from './CalendarPage/CalendarPage';

class App extends Component {
  render() {
    const { portalCode, objectCode, locale } = this.props;

    return (
      <Query query={PORTAL_QUERY} variables={{ id: portalCode }}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div>
                <Loading />
              </div>
            );
          if (error) return <div>Error</div>;

          const PortalSite = data.PortalSite;
          const options = data.PortalSite.options;

          let root = document.documentElement;

          if (!options.bookingForm) {
            options.bookingForm = {
              children: true,
              babies: true,
            };
          }
          if (!options.filtersForm) {
            options.filtersForm = {
              show: true,
              location: 'left',
              fixedMobile: true,
            };
          }

          root.style.setProperty(
            '--bukazu-discount',
            `${options.colors ? options.colors.discount : 'orange'}`
          );
          root.style.setProperty(
            '--bukazu-cell',
            `${options.colors ? options.colors.cell : '#fff'}`
          );
          root.style.setProperty(
            '--bukazu-arrival',
            `${options.colors ? options.colors.arrival : '#6eeb83'}`
          );
          root.style.setProperty(
            '--bukazu-booked',
            `${options.colors ? options.colors.booked : '#ea2b1f'}`
          );
          root.style.setProperty(
            '--bukazu-departure',
            `${options.colors ? options.colors.departure : 'yellow'}`
          );

          root.style.setProperty(
            '--bukazu-button',
            `${
              options.colors
                ? options.colors.button
                : 'rgba(23, 190, 187, 0.75)'
            }`
          );
          root.style.setProperty(
            '--bukazu-button_cta',
            `${options.colors ? options.colors.buttonCta : '#e28413'}`
          );

          if (objectCode !== null) {
            return (
              <CalendarPage
                PortalSite={PortalSite}
                objectCode={objectCode}
                locale={locale}
              />
            );
          } else {
            return (
              <SearchPage
                PortalSite={PortalSite}
                locale={locale}
                options={options}
              />
            );
          }
        }}
      </Query>
    );
  }
}

export default App;
