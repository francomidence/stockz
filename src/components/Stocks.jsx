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
  const [timePeriod, setTimePeriod] = useState('60min');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermCompleted, setSearchTermCompleted] = useState('');
  const [skip, setSkip] = useState(true);

  let searchComplete = '';
  //flag that allows us to prevent useGetSearchEndpointQuery to run automatically when component is mounted

  const { data, isFetching } = useGetIntradayQuery(timePeriod, searchTerm);
  const { data: dataCompanies, isFetchingSearch } = useGetSearchEndpointQuery(
    searchTermCompleted,
    { skip }
  );

  console.log('data companies', dataCompanies);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTermCompleted(searchTerm);
      setSkip(false);
    }, 3000);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchTerm]);

  // if (isFetching) {
  //   return (
  //     <TailSpin height="100" width="100" color="blue" ariaLabel="loading" />
  //   );
  // }

  console.log('this function');
  let x = mapCompanies(dataCompanies);
  x.bestMatches?.map((company) => {
    console.log(company);
  });
  console.log(x.bestMatches);

  return (
    <div>
      <div>{searchComplete}</div>
      <Row justify="space-between">
        <Col span={10} offset={4}>
          <Input
            autoFocus
            type="text"
            placeholder="Search Company..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: '20px' }}
          />
        </Col>
        <Col span={10}>
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
        </Col>
      </Row>

      {isFetchingSearch ? (
        <>fetching</>
      ) : (
        <Row gutter={[32, 32]} className="crypto-card-container">
          {dataCompanies.bestMatches?.map((company) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card">
              <Link to={`/`}>
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
      )}

      {isFetching ? (
        <TailSpin height="100" width="100" color="blue" ariaLabel="loading" />
      ) : (
        // <LineChart stockHistory={data} timePeriod={timePeriod} />
        <>line chart 2</>
      )}
    </div>
  );
};

function mapCompanies(companies) {
  return companies;
}

export default Stocks;
