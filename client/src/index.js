import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import globalTheme from './globalTheme'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { UserContextProvider } from './context/user.context'
import { ProjectsContextProvider } from './context/projects.context'
import { OrganisationsContextProvider } from './context/organisations.context'
import { TasksContextProvider } from './context/tasks.context'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <OrganisationsContextProvider>
              <UserContextProvider>
                <ProjectsContextProvider>
                  <TasksContextProvider>
                    <App />
                  </TasksContextProvider>
                </ProjectsContextProvider>
              </UserContextProvider>
            </OrganisationsContextProvider>
          </MuiPickersUtilsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

