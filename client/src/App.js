import React, { useContext } from 'react'
import Dashboard from './components/Dashboard'
import { UserContext } from './context/user.context'
import { ProjectsContext } from './context/projects.context'
import { OrganisationsContext } from './context/organisations.context'
import { Switch, Route} from 'react-router-dom'
import NavBar from './components/nav/NavBar'
import ProjectsOverview from './components/projects/ProjectsOverview'
import Form from './components/form/Form'
import TasksTable from './components/tasks/TasksTable'
import IndividualTask from './components/tasks/IndividualTask'

const App = () => {

  const { organisations } = useContext(OrganisationsContext)
  const { user } = useContext(UserContext)
  const { projects } = useContext(ProjectsContext)


  return (
    <div>
      <NavBar user={user} />

      <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/projects-overview' component={ProjectsOverview} />
          <Route exact path='/project/:projectId' component={TasksTable} />
          <Route exact path='/project/:projectId/task/:taskId' component={IndividualTask} />
          <Route exact path='/create/:formFor' component={Form} />
      </Switch>
    </div>
  )
}

export default App