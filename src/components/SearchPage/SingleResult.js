import React, { Component } from 'react';

class SingleResult extends Component {

  render() {
      const result = this.props.result
      return <div className='bukazu-result'>
        <div className="bukazu-result-inner">
            <img src={result.image_url} alt={result.name} />
            {result.name}
          </div>
        </div>;
  }
}

export default SingleResult;
