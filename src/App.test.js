import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

//https://medium.com/@george.norberg/how-to-use-jsdom-for-react-unit-testing-in-node-using-enzyme-mocha-localstorage-and-5918adf4f3be
