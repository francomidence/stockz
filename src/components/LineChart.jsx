import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

import { Line } from 'react-chartjs-2';

const LineChart = ({ stockName, stockHistory }) => {
  const stockPriceClosed = [];
  const stockTimeStamp = [];

  // 1. open: "127.5300"
  // 2. high: "127.5300"
  // 3. low: "127.5300"
  // 4. close: "127.5300"
  // 5. volume: "652"

  //   console.log('Length');
  //   console.log(Object.keys(stockHistory[`Time Series (5min)`]).length);

  console.log(stockHistory);

  let stockHistoryLength = Object.keys(
    stockHistory[`Time Series (5min)`]
  ).length;

  let sh = Object.keys(stockHistory[`Time Series (5min)`]);

  for (let i = 0; i < stockHistoryLength; i++) {
    // coinPrice.push(coinHistory.data.history[i].price);
    // coinTimeStamp.push(coinHistory.data.history[i].timestamp);
    let date = sh[i];
    stockPriceClosed.push(
      stockHistory[`Time Series (5min)`][`${date}`][`4. close`]
    );
    stockTimeStamp.push(date);
  }

  console.log('timestamp');
  console.log(stockTimeStamp);
  console.log('prices');
  console.log(stockPriceClosed);

  const data = {
    labels: stockTimeStamp,
    datasets: [
      {
        label: 'Price in USD',
        data: stockPriceClosed,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      LineChart
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
