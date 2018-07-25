import React, { Component } from 'react';

class SingleResult extends Component {

  render() {
      const house = this.props.house
      return (
        <div>
            {house.name}
            {house.image_url}
        </div>
      )
  }
}

export default SingleResult;
