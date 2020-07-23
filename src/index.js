import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Nosupported from './no_supported'
import * as serviceWorker from './serviceWorker';
import is from 'is_js'

if(is.chrome())
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
else
  ReactDOM.render(
    <React.StrictMode>
      <Nosupported />
    </React.StrictMode>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
