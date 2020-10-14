import React, { useContext } from 'react'
import NavBar from './components/nav/NavBar'
import Dashboard from './components/Dashboard'
import { UserContext } from './context/user.context'
import { Switch, Route} from 'react-router-dom'

const App = () => {

  const { user } = useContext(UserContext)

  return (
    <div>
      <NavBar user={user} />

      <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  )
}

export default App