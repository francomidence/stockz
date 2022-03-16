import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Toaster } from 'react-hot-toast';
import {
  Navbar,
  Homepage,
  Stocks,
  Forex,
  Cryptocurrencies,
  StockDetails,
} from './components';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Toaster />
        <Layout>
          <Routes>
            <Route exact path="/" element={<Homepage />}></Route>
            <Route exact path="/stock" element={<Stocks />}></Route>
            <Route exact path="/forex" element={<Forex />}></Route>
            <Route exact path="/crypto" element={<Cryptocurrencies />}></Route>
            <Route
              exact
              path="/stock/:symbol"
              element={<StockDetails />}
            ></Route>
          </Routes>
        </Layout>
      </div>
    </div>
  );
}

export default App;
