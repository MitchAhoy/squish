import React, { useContext, useEffect, useState } from 'react'
import { Typography, Toolbar, Container, makeStyles, Paper, CssBaseline } from '@material-ui/core'
import StatusWidget from './StatusWidget'
import PriorityWidget from './PriorityWidget'
import DateWidget from './DateWidget'
import AssigneeWidget from './AssigneeWidget'
import EditableText from '../utils/EditableText'
import { TasksContext } from '../../context/tasks.context'
import { OrganisationsContext } from '../../context/organisations.context'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem 0'
    },
    taskTitle: {
        margin: '1.5rem 0'
    }
}))

const IndividualTask = ({ match: { params: { taskId } } }) => {
    const classes = useStyles()
    const { tasks } = useContext(TasksContext)
    const { organisations } = useContext(OrganisationsContext)
    
    const [taskToRender, setTaskToRender] = useState([])
    const [organisationUsers, setorganisationUsers] = useState([])

    let initRender = []

    const handleEditChange = (evt) => setTaskToRender([{...taskToRender, [evt.target.name]: evt.target.value}])

    useEffect(() => {
        const currentTask = tasks.filter((task) => task._id === taskId)
        setTaskToRender(currentTask)
    }, [tasks])
    
    useEffect(() => {
        if (organisations && taskToRender) {
            let [currentOrganisation] = organisations.filter(organisation => organisation._id === taskToRender[0]?.taskOrganisation)
            setorganisationUsers(currentOrganisation?.organisationUsers)
        }
    }, [organisations])

    return (
        <>
            {taskToRender.map(({ taskStatus, taskAssignee, taskPriority, taskName, taskDescription, taskDueDate, _id }) => (
                <Container key={_id}>
                    <Paper>
                        <Toolbar className={classes.toolbar}>
                            <StatusWidget status={taskStatus} />
                            <PriorityWidget priority={taskPriority} />
                            <DateWidget taskDueDate={taskDueDate} />
                            <AssigneeWidget organisationUsers={organisationUsers} currentUser={taskAssignee}/>
                        </Toolbar>
                        </Paper>
                        <Container>
                            <EditableText text={taskName} name={taskName} handleEditChange={handleEditChange}/>
                            <Typography variant='h6'>{taskDescription}</Typography>
                        </Container>
                </Container>
            ))}

        </>
    )

}

export default IndividualTask
