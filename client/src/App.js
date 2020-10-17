import React, { useContext } from 'react'
import Dashboard from './components/Dashboard'
import { UserContext } from './context/user.context'
import { Switch, Route} from 'react-router-dom'
import NavBar from './components/nav/NavBar'
import ProjectsOverview from './components/projects/ProjectsOverview'
import Form from './components/form/Form'

const App = () => {

  const { user } = useContext(UserContext)

  return (
    <div>
      <NavBar user={user} />

      <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/projects-overview' component={ProjectsOverview} />
          <Route exact path='/create/:formFor' component={Form} />
      </Switch>
    </div>
  )
}

export default App