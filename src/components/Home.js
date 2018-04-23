import React from 'react';
import Charts from './Charts';

const URL = 'https://api.coindesk.com/v1/bpi/historical/close.json'

const Home = () => (
  <div>
    <div className="two-chart-row">
      <Charts chartTitle="30 days BTC Price History Chart" />
      <Charts chartTitle="30 days ETH Price History Chart" />
    </div>
    <div className="two-chart-row">
      <Charts chartTitle="30 days LTC Price History Chart" />
      <Charts chartTitle="30 days DASH Price History Chart" />
    </div>
  </div>
);

export default Home;
