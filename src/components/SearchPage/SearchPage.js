import React, { Component } from 'react';
import Filters from './Filters'
import Results from './Results'

import './SearchPage.css'

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: {
        countries: "1",
        cities: "",
        regions: "",
        max_persons: "",
        max_weekprice: "",
        max_nights: "",
        max_bedrooms: "",
        max_bathrooms: "",
        extra_search: "",
        max_price: ""
      }
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
