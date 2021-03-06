import React from 'react';

const URL = 'https://api.coindesk.com/v1/bpi/historical/close.json'


export default class Bittrex extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        BTC_USD: 0,
        BTC_ETH: 0,
        BTC_LTC: 0,
        BTC_DASH: 0,
        currency: this.props.currency,
        btcPrices: {}
      }

    }

    componentDidMount() {

      /////API CALLS
      // const ASKS_URL = 'http://localhost:3000/api/sendasks';
      // $(() => {
      //     $.get(ASKS_URL).then(data => {
      //         // console.log(data);
      //           btcRate = data.[0]
      //
      //           //   this.setState(() => ({
      //           //     BTC_USD: btcRate  // api data.data.rate.[]  ==> btcRate
      //           //   }) )
      //           // }
      //     })
      // })
      this.getBTCPrice();
      this.showGraph();

      this.setState(() => ({
        BTC_USD: 8321  // api data.data.rate.[]  ==> btcRate
      }) )
    }

    showGraph() {
        // bitcoin price object
        let btcPrices = this.state.btcPrices

        // label array for using in Chart.js
        let tmp_label = []
        // data array for using in Chart.js
        let tmp_data = []
        Object.keys(btcPrices).forEach(d => {
            tmp_label.push(d)
            tmp_data.push(btcPrices[d])
        })

        const canvas = this.refs.myChart
        const ctx = canvas.getContext('2d')

        return new Chart(ctx, {
            // line type chart
            type: 'line',
            data: {
                // adapt tmp_label here
                labels: tmp_label,
                datasets: [{
                    label: 'Last 30days BTC Price',
                    // adapt tmp_label here
                    data: tmp_data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                tooltips: {
                    callbacks: {
                        // we custom tooltip that will show we point mouse data node in chart
                        label: (tooltipItem, data) => {
                            return 'Price: ' + tooltipItem.yLabel + ' USD';
                        }
                    }
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }

    getBTCPrice() {
        return fetch(URL)
            .then(r => r.json())
            .then(data => {
                // show response data in console
                console.log('data: ', data)
                this.setState({ btcPrices: data.bpi })
								// add here to update Graph chart when finish fetching data
                this.showGraph()
            })
            .catch(err => {
                console.log(err)
            })
    }

  render(){
    return(
      <div className="single-chart">
        {
          this.state.currency === 'ETH' &&
          <div>
            <p> BTC_ETH: {this.state.BTC_ETH}</p>
            <div className="App">
                    <h2>Coin Cap 30 Days BTC-ETH Price History Chart</h2>
                    <br/>
                    <canvas id="myChart" ref="myChart" />
                </div>
          </div>

      }
        {
          this.state.currency === 'LTC' &&
          <div>
            <p> BTC_LTC: {this.state.BTC_LTC}</p>
            <div className="App">
                    <h2>Coin Cap 30 Days BTC-LTC Price History Chart</h2>
                    <br/>
                    <canvas id="myChart" ref="myChart" />
                </div>
          </div>

        }
        {
          this.state.currency === 'DASH' &&
          <div>
            <p> BTC_DASH: {this.state.BTC_DASH}</p>
            <div className="App">
                    <h2>Coin Cap 30 Days BTC-DASH Price History Chart</h2>
                    <br/>
                    <canvas id="myChart" ref="myChart" />
                </div>
          </div>

        }
        <p>Coin Cap BTC_USD: {this.state.BTC_USD}</p>

      </div>


    )
  }

}
