import React, { Component } from 'react';
import Result from './SingleResult.css'

class SingleResult extends Component {

  render() {
      const result = this.props.result
      return <Result>
          <div className="inner">
            <img src={result.image_url} alt={result.name} />
            {result.name}
          </div>
        </Result>;
  }
}

export default SingleResult;
