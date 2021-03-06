import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('content'));

if (module.hot) {
  module.hot.accept();
}
