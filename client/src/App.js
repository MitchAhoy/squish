import React, { useContext } from 'react'
import Dashboard from './components/Dashboard'
import { UserContext } from './context/user.context'
import { Switch, Route} from 'react-router-dom'
import NavBar from './components/nav/NavBar'
import Projects from './components/projects/Projects'

const App = () => {

  const { user, projects, tasks } = useContext(UserContext)

  return (
    <div>
      <NavBar user={user} />

      <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/projects' component={Projects} />
      </Switch>
    </div>
  )
}

export default App