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
    context: {
        width: '100%'
    }
}))

const IndividualTask = ({ match: { params: { taskId } } }) => {
    const classes = useStyles()

    const { tasks, updateTask } = useContext(TasksContext)
    const { organisations } = useContext(OrganisationsContext)

    const [taskToRender, setTaskToRender] = useState([])
    const [organisationUsers, setorganisationUsers] = useState([])

    // const handleEditChange = (evt) => setTaskToRender([{ ...taskToRender[0], [evt.target.name]: evt.target.value }])

    useEffect(() => {
        const currentTask = tasks.filter((task) => task._id === taskId)
        setTaskToRender(currentTask)
    }, [tasks])

    useEffect(() => {
        if (organisations && taskToRender) {
            let [currentOrganisation] = organisations.filter(organisation => organisation._id === taskToRender[0]?.taskOrganisation)
            setorganisationUsers(currentOrganisation?.organisationUsers)
        }
    }, [organisations, taskToRender])

    return (
        <>
            {taskToRender?.map(({ taskStatus, taskAssignee, taskPriority, taskName, taskDescription, taskDueDate, _id }) => (
                <Container key={_id}>
                    <Paper>
                        <Toolbar className={classes.toolbar}>
                            <StatusWidget status={taskStatus} update={updateTask} id={_id} />
                            <PriorityWidget priority={taskPriority} update={updateTask} id={_id} />
                            <DateWidget taskDueDate={taskDueDate} update={updateTask} id={_id} />
                            <AssigneeWidget organisationUsers={organisationUsers} currentUser={taskAssignee} update={updateTask} id={_id} />
                        </Toolbar>
                    </Paper>
                    <Container>
                        <EditableText className={classes.content} value={taskName} name='taskName' multiline={false} variant='title' id={_id} update={updateTask} />
                        <EditableText className={classes.content} value={taskDescription} name='taskDescription' multiline={true} variant='description' id={_id} update={updateTask} />
                    </Container>
                </Container>
            ))}

        </>
    )

}

export default IndividualTask
