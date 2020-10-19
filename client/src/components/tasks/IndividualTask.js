import React, { useContext, useEffect, useState } from 'react'
import { Typography, Toolbar, Container, makeStyles } from '@material-ui/core'
import StatusWidget from './StatusWidget'
import PriorityWidget from './PriorityWidget'
import DateWidget from './DateWidget'
import AssigneeWidget from './AssigneeWidget'
import { TasksContext } from '../../context/tasks.context'
const useStyles = makeStyles((theme) => ({

}))

const IndividualTask = ({ match: { params: { projectId, taskId } } }) => {
    const { tasks } = useContext(TasksContext)
    const [taskToRender, setListToRender] = useState([])

    useEffect(() => {
        const currentTask = tasks.filter((task) => task._id === taskId)
        setListToRender(currentTask)
    }, [tasks])

    console.log(taskToRender)

    return (
        <>
            {taskToRender.map(({ taskStatus, taskAssignee, taskPriority, taskName, taskDescription, taskDueDate }) => (
                <Container>
                        <Toolbar>
                            <StatusWidget status={taskStatus} />
                            <PriorityWidget priority={taskPriority} />
                            <DateWidget taskDueDate={taskDueDate} />
                            <AssigneeWidget />
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
