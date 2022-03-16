import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

import { Line } from 'react-chartjs-2';

const LineChart = ({ stockHistory, timePeriod }) => {
  const stockPriceClosed = [];
  const stockTimeStamp = [];

  let stockHistoryLength = 0;

  if (stockHistory != undefined) {
    stockHistoryLength = Object?.keys(
      stockHistory[`Time Series (${timePeriod})`]
    )?.length;

    let sh = Object?.keys(stockHistory[`Time Series (${timePeriod})`]);

    for (let i = 0; i < stockHistoryLength; i++) {
      let date = sh[i];
      stockPriceClosed.push(
        stockHistory[`Time Series (${timePeriod})`][`${date}`][`4. close`]
      );
      stockTimeStamp.push(date);
    }
  } else if (stockHistory == undefined) {
    console.log('unable to retrieve stock data');
  }

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
    <div style={{ marginTop: '20px' }}>
      <h5>{timePeriod}</h5>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
