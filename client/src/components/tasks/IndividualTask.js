import React, { useContext, useEffect, useState } from 'react'
import { Typography, Toolbar, Container, makeStyles } from '@material-ui/core'
import StatusChip from './StatusChip'
import PriorityWidget from './PriorityWidget'
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
            {taskToRender.map(({ taskStatus, taskAssignee, taskPriority }) => (
                <Container>
                        <Toolbar>
                            <StatusChip status={taskStatus} />
                            <Typography variant='caption'>{taskAssignee}</Typography>
                            <PriorityWidget priority={taskPriority} />
                        </Toolbar>
                </Container>
            ))}

        </>
    )

}

export default IndividualTask
