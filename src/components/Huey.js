import React from 'react';
import Exchanges from './Exchanges';

export default class Huey extends React.Component {
  constructor() {
    super()
    this.state = {
      addressShown: false
    }
  }

  showAddress = () => {
    if(this.state.addressShown === false) {
      this.setState({ addressShown: true });
    } else {
      this.setState({ addressShown: false })
    }
  };

  render() {
    return (
      <div>
        <h1> Huey's Page </h1>

        <Exchanges currency='ETH' />
        <p className="address" onClick={this.showAddress}> {this.state.addressShown ? '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2' : 'Click to show public wallet address'}</p>
      </div>
    )
  }
}
