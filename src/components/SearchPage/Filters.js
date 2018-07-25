import React, { Component } from 'react';


class Filters extends Component {
  render() {

    return (
        <div>
            {this.props.PortalSite.options.searchFields.map(field => <div key={field.id}>{field.label}</div>)}
        </div>
    )
  }
}

export default Filters;
