import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import globalTheme from './globalTheme'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import BundledContext from './context/bundled.context'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
        <BundledContext>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </BundledContext>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

