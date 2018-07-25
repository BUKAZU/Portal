import React, { Component } from 'react';
import Filters from './Filters'
import Results from './Results'



class SearchPage extends Component {
  render() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row'
            }}
            >
            <Filters PortalSite={this.props.PortalSite} />
            <Results PortalSite={this.props.PortalSite} />
        </div>
    )
  }
}

export default SearchPage;
