import React, { useState, useEffect } from 'react';
import {
  useGetIntradayQuery,
  useGetSearchEndpointQuery,
} from '../services/stockApi';
import LineChart from './LineChart';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { Col, Row, Typography, Select, Input, Card } from 'antd';
const { Option } = Select;

const Stocks = () => {
  const time = ['1min', '5min', '15min', '30min', '60min'];
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermCompleted, setSearchTermCompleted] = useState('');
  const [loader, setLoader] = useState(false);
  const [skip, setSkip] = useState(true);

  let searchComplete = '';
  const { data: dataCompanies, isFetchingSearch } = useGetSearchEndpointQuery(
    searchTermCompleted,
    { skip }
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTermCompleted(searchTerm);
      setSkip(false);
      setLoader(false);
    }, 1200);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchTerm]);

  if (isFetchingSearch) {
    return (
      <TailSpin height="100" width="100" color="blue" ariaLabel="loading" />
    );
  }

  return (
    <div>
      <div>{searchComplete}</div>
      <Row justify="center">
        <Col span={10}>
          <Input
            autoFocus
            type="text"
            placeholder="Search Company..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value != '') {
                setLoader(true);
              }
            }}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          />
        </Col>
      </Row>

      <Row gutter={[32, 32]} className="crypto-card-container">
        {dataCompanies?.bestMatches?.map((company) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card">
            <Link
              to={`/stock/${company[`1. symbol`]}`}
              state={{ symbol: `${company[`1. symbol`]}` }}
            >
              <Card
                title={`${company[`1. symbol`]}. ${company[`2. name`]}`}
                hoverable
              >
                <p>Type: {company[`3. type`]}</p>
                <p>Region: {company[`4. region`]}</p>
                <p>
                  Market Schedule: {company[`5. marketOpen`]} -{' '}
                  {company[`6. marketClose`]}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {loader ? (
        <TailSpin height="100" width="100" color="blue" ariaLabel="loading" />
      ) : (
        <></>
      )}
    </div>
  );
};
// --PENDING-- center loaders on stockdetails and stock
// --PENDING-- deal with alpha vantage api call limit
export default Stocks;
