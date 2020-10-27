import React, { useContext, useEffect, useState } from 'react'
import { Toolbar, Container, makeStyles, Paper, IconButton } from '@material-ui/core'
import { DeleteForeverRounded as DeleteIcon} from '@material-ui/icons'
import StatusWidget from './StatusWidget'
import PriorityWidget from './PriorityWidget'
import DateWidget from './DateWidget'
import AssigneeWidget from './AssigneeWidget'
import EditableText from '../utils/EditableText'
import { TasksContext } from '../../context/tasks.context'
import { OrganisationsContext } from '../../context/organisations.context'

const useStyles = makeStyles((theme) => ({
    toolbarContainer: {
        boxShadow: theme.customShadow.xl
    },
    toolbar: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '1rem 0'
    },
    content: {
        width: '100%'
    }
}))

const IndividualTask = ({ history, match: { params: { taskId, projectId } } }) => {
    const classes = useStyles()

    const { tasks, updateTask, deleteTask } = useContext(TasksContext)
    const { organisations } = useContext(OrganisationsContext)

    const [taskToRender, setTaskToRender] = useState([])
    const [organisationUsers, setorganisationUsers] = useState([])

    useEffect(() => {
        const currentTask = tasks.filter((task) => task._id === taskId)
        setTaskToRender(currentTask)
    }, [tasks])

    useEffect(() => {
        if (organisations && taskToRender) {
            let currentOrganisation = organisations.filter(organisation => organisation._id === taskToRender[0]?.taskOrganisation)[0]
            setorganisationUsers(currentOrganisation?.organisationUsers)
        }
    }, [organisations, taskToRender])

    const deleteTaskAndRedirect = (id) => {
        deleteTask(id)
        history.push(`/project/${projectId}`)
    }

    return (
        <>
            {taskToRender?.map(({ taskStatus, taskAssignee, taskPriority, taskName, taskDescription, taskDueDate, _id }) => (
                <Container key={_id}>
                    <Paper className={classes.toolbarContainer}>
                        <Toolbar className={classes.toolbar}>
                            <StatusWidget status={taskStatus} update={updateTask} id={_id} />
                            <PriorityWidget priority={taskPriority} update={updateTask} id={_id} />
                            <DateWidget taskDueDate={taskDueDate} update={updateTask} id={_id} />
                            <AssigneeWidget organisationUsers={organisationUsers} currentUser={taskAssignee} update={updateTask} id={_id} />
                            <IconButton onClick={() => deleteTaskAndRedirect(_id)} variant='contained' color='secondary'><DeleteIcon /></IconButton>
                        </Toolbar>
                    </Paper>
                    <Container>
                        <EditableText className={classes.content} value={taskName} name='taskName' multiline={true} variant='title' id={_id} update={updateTask} />
                        <EditableText className={classes.content} value={taskDescription} name='taskDescription' multiline={true} variant='description' id={_id} update={updateTask} />
                    </Container>
                </Container>
            ))}

        </>
    )

}

export default IndividualTask
