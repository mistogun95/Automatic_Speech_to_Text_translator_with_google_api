import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App2 from './App2';
import Nosupported from './no_supported'
import * as serviceWorker from './serviceWorker';

if('webkitSpeechRecognition' in window){
  console.log('Chrome')
  ReactDOM.render(
    <React.StrictMode>
      <App2 />
    </React.StrictMode>,
    document.getElementById('root')
  );}
else{
  console.log('not chrome')
  ReactDOM.render(
    <React.StrictMode>
      <Nosupported />
    </React.StrictMode>,
    document.getElementById('root')
  );}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
