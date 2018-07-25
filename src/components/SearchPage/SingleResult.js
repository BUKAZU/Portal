import React, { Component } from 'react';

class SingleResult extends Component {

  render() {
      const result = this.props.result
      return (
        <div className='object'>
            {result.name}
        </div>
      )
  }
}

export default SingleResult;
