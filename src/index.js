import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App3 from './App3';
import * as serviceWorker from './serviceWorker';

console.log('Chrome')
ReactDOM.render(
  <React.StrictMode>
    <App3 />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
