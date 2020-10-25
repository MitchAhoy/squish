import React, { useContext } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import { UserContext } from './context/user.context'
import { Switch, Route } from 'react-router-dom'
import NavBar from './components/nav/NavBar'
import ProjectsOverview from './components/projects/ProjectsOverview'
import Form from './components/form/Form'
import TasksTable from './components/tasks/TasksTable'
import IndividualTask from './components/tasks/IndividualTask'
import CreateButton from './components/utils/CreateButton'





const App = () => {

  const { user } = useContext(UserContext)

  return (
    <div>
    <NavBar user={user} />

      {user.length > 0 && (
        <>

                <Switch>
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route exact path='/projects-overview' component={ProjectsOverview} />
                    <Route exact path='/project/:projectId' component={TasksTable} />
                    <Route exact path='/project/:projectId/task/:taskId' component={IndividualTask} />
                    <Route exact path='/create/:formFor' component={Form} />
                </Switch>
          
                <CreateButton />
           </>
      )}

     


    </div>
  )
}

export default App