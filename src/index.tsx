import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SwitchHost } from 'components/switch-host';
import GlobalContextRoot from 'models/global-context';

import './styles/normalize.css';
import './styles/index.scss';

// Disable the context menu of browser.
document.addEventListener('contextmenu', (e) => e.preventDefault());

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextRoot>
      <SwitchHost>
        <App />
      </SwitchHost>
    </GlobalContextRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
