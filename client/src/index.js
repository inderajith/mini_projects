import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Authprovider from './contexts/Authcontext'

ReactDOM.render(
  <Authprovider>
    <App />
  </Authprovider>
   ,
  document.getElementById('root')
);

