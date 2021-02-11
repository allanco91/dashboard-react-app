import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import App from './App';
import Grid from './Grid';
import EditChart from './EditChart';

ReactDOM.render(
  <React.StrictMode>
    {/* <Grid /> */}
    <EditChart />
  </React.StrictMode>,
  document.getElementById('root')
);
