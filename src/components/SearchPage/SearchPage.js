import React, { Component } from 'react';
import Filters from './Filters'
import Results from './Results'

import './SearchPage.css'



class SearchPage extends Component {
  render() {
    return (
        <div id='search-page'
            >
            <Filters PortalSite={this.props.PortalSite} />
            <Results PortalSite={this.props.PortalSite} />
        </div>
    )
  }
}

export default SearchPage;
