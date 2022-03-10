import React from 'react';
import { useGetIntradayQuery } from '../services/stockApi';
import LineChart from './LineChart';

const Stocks = () => {
  const { data, isFetching } = useGetIntradayQuery();

  if (isFetching) {
    return 'Loading...';
  }
  // console.log(data);
  // console.log(data['Meta Data']['1. Information']);
  // console.log(Object.keys(data['Meta Data']));
  console.log('hi');
  console.log(data[`Time Series (5min)`][`2022-03-09 09:05:00`][`4. close`]);
  return (
    <div>
      Stocks
      <LineChart stockName={'IBM'} stockHistory={data} />
    </div>
  );
};

export default Stocks;
