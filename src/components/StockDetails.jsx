import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import { Col, Row, Typography, Select, Input, Card } from 'antd';
import {
  useGetIntradayQuery,
  useGetSearchEndpointQuery,
} from '../services/stockApi';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

const { Option } = Select;

const StockDetails = () => {
  const time = ['1min', '5min', '15min', '30min', '60min'];
  const [timePeriod, setTimePeriod] = useState('60min');
  //get state passed from link on stocks.jsx
  const location = useLocation();
  const { symbol } = location.state;

  //get intradaily data
  const { data, isFetching, isError } = useGetIntradayQuery({
    timePeriod,
    symbol,
  });

  console.log('data', data);
  console.log('isError', isError);
  console.log('time period', timePeriod);
  console.log('symbol', symbol);

  if (isFetching) {
    return (
      <TailSpin height="100" width="100" color="blue" ariaLabel="loading" />
    );
  }

  //not all stocks have intradaily data
  //if that stock does not have it an error message should be displayed
  //--PENDING-- a better error message
  if (data[`Error Message`]) {
    return <>Unable to fetch intradaily data for {symbol} stock</>;
  }

  return (
    <div>
      <Row justify="space-between">
        <Col span={10}>
          <Select
            defaultValue={timePeriod}
            style={{ width: '200px', marginTop: '20px' }}
            placeholder="Select Time Period"
            onChange={(value) => setTimePeriod(value)}
          >
            {time.map((date) => (
              <Option key={date}>{date}</Option>
            ))}{' '}
          </Select>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={22}>
          {' '}
          <LineChart stockHistory={data} timePeriod={timePeriod} />
        </Col>
      </Row>
    </div>
  );
};

export default StockDetails;
