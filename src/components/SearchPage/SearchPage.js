import React, { Component } from 'react';
import Filters from './Filters'



class SearchPage extends Component {
  render() {
      console.log(this.props.PortalSite);

    return (
        <div>
            <Filters PortalSite={this.props.PortalSite} />
        </div>
    )
  }
}

export default SearchPage;
