import React, { Component } from "react";
import { Query } from "react-apollo";
import Loading from "../icons/loading.svg";
import SingleResult from "./SingleResult";
import "./Results.css";
import { HOUSES_QUERY } from '../../_lib/SearchQueries'

class Results extends Component {
  render() {
    let variables = {
      id: this.props.PortalSite.portal_code,
      country_id: this.props.filters.countries || ''
    };
    // console.log(this.props);

    return (
      <Query query={HOUSES_QUERY} variables={variables}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div>
                <Loading />
              </div>
            );
          if (error) return <div>Error</div>;

          const Results = data.PortalSite.houses;

          return (
            <div id="results">
              {Results.map(result => (
                <SingleResult key={result.id} result={result} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Results;
