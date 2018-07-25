import React, { Component } from 'react';

class SingleResult extends Component {

  render() {
      const result = this.props.result
      return (
        <div>
            {result.name}
            {result.image_url}
        </div>
      )
  }
}

export default SingleResult;
