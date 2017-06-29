import React, { Component } from 'react';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.dataInformation);
    return (
      <div className='App-content'>
        Content
      </div>
    );
  }
}

export default Content;
