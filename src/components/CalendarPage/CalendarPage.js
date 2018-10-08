import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Calendar from "./Calendar";

export const HOUSE_QUERY = gql`
    query PortalSiteHousesQuery($id: ID!, $house_id: ID!){
        PortalSite(id: $id) {
            houses(
              id: $house_id
            ) {
                id
                name
            }
        }
    }
`

class CalendarPage extends Component {
  render() {
      const variables = {
          id: this.props.PortalSite.portal_code,
          house_id: '4'
      }

      return <Query query={HOUSE_QUERY} variables={variables}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;

            const Results = data.PortalSite.houses;

            return <div id="calendar-container">
                {Results.map(result => <div key={result.id}>
                    <div>{result.name}</div>
                    <Calendar portal_code={variables.id} house_id={variables.house_id} />
                  </div>)}
              </div>;
          }}
        </Query>;
  }
}

export default CalendarPage;
