import React, { Component } from 'react';
import Filters from './Filters'
import Results from './Results'

// import './SearchPage.css'

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: {}
    }
    this.onFilterChange = this.onFilterChange.bind(this)
  }

  onFilterChange(data) {
    let filters = data
    this.setState({filters})
  }

  render() {
    let filters = this.state.filters

    return (
        <div id='search-page'
            >
            <Filters PortalSite={this.props.PortalSite} filters={filters} onFilterChange={this.onFilterChange} />
            <Results PortalSite={this.props.PortalSite} filters={filters}/>
        </div>
    )
  }
}

export default SearchPage;
