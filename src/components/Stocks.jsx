import React, { useState } from 'react';
import { useGetIntradayQuery } from '../services/stockApi';
import LineChart from './LineChart';
import { TailSpin } from 'react-loader-spinner';
import { Col, Row, Typography, Select } from 'antd';
const { Option } = Select;

const Stocks = () => {
  const time = ['1min', '5min', '15min', '30min', '60min'];
  const [timePeriod, setTimePeriod] = useState('60min');
  const { data, isFetching } = useGetIntradayQuery(timePeriod);

  console.log(data);

  // if (isFetching) {
  //   return (
  //     <TailSpin height="100" width="100" color="blue" ariaLabel="loading" />
  //   );
  // }

  return (
    <div>
      {isFetching ? (
        <TailSpin height="100" width="100" color="blue" ariaLabel="loading" />
      ) : (
        <LineChart
          stockName={'IBM'}
          stockHistory={data}
          timePeriod={timePeriod}
        />
      )}
      <Select
        defaultValue="60min"
        style={{ width: '200px', marginTop: '20px' }}
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}{' '}
      </Select>
    </div>
  );
};

export default Stocks;
