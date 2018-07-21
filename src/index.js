import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import 'moment-timezone';
import 'moment-business-time';
import registerServiceWorker from './registerServiceWorker';
import data from './data.json';

ReactDOM.render(<App {...data} />, document.getElementById('root'));
registerServiceWorker();
