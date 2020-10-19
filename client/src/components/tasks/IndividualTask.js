import React, { useContext, useEffect, useState } from 'react'
import { Typography, Toolbar, Container, makeStyles } from '@material-ui/core'
import StatusWidget from './StatusWidget'
import PriorityWidget from './PriorityWidget'
import DateWidget from './DateWidget'
import AssigneeWidget from './AssigneeWidget'
import { TasksContext } from '../../context/tasks.context'
import { OrganisationsContext } from '../../context/organisations.context'
const useStyles = makeStyles((theme) => ({

}))

const IndividualTask = ({ match: { params: { projectId, taskId } } }) => {
    const { tasks } = useContext(TasksContext)
    const { organisations } = useContext(OrganisationsContext)
    
    const [taskToRender, setListToRender] = useState([])
    const [organisationalUsers, setorganisationalUsers] = useState([])
    


    useEffect(() => {
        const currentTask = tasks.filter((task) => task._id === taskId)
        setListToRender(currentTask)
    }, [tasks])

    useEffect(() => {
        if (organisations && taskToRender) {
            const organisationalUsers = organisations.filter(organisation => organisation._id == taskToRender.taskOrganisation)
            setorganisationalUsers(organisationalUsers)
            console.log(organisations)
        }


    }, [taskToRender, organisations])

    return (
        <>
            {taskToRender.map(({ taskStatus, taskAssignee, taskPriority, taskName, taskDescription, taskDueDate, _id }) => (
                <Container key={_id}>
                        <Toolbar>
                            <StatusWidget status={taskStatus} />
                            <PriorityWidget priority={taskPriority} />
                            <DateWidget taskDueDate={taskDueDate} />
                            {/* <AssigneeWidget organisationalUsers={} /> */}
                        </Toolbar>
                        <Container>
                            <Typography variant='h3'>{taskName}</Typography>
                            <Typography variant='h6'>{taskDescription}</Typography>
                        </Container>
                </Container>
            ))}

        </>
    )

}

export default IndividualTask
