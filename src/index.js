import React from 'react';
import ReactDOM from 'react-dom';

// Router
import { BrowserRouter as Router } from 'react-router-dom';

// Component
import App from './App';

// Context
import MovierProvider from './Context'

ReactDOM.render(
  <MovierProvider>
    <Router>
      <App />
    </Router>
  </MovierProvider>,
  document.getElementById('root')
);

