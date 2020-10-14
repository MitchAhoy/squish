import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import globalTheme from './globalTheme'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/user.context'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

