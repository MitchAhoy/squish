import React, { useState, useContext, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, makeStyles, Button, Paper, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { TasksContext } from '../../context/tasks.context'
import StatusWidget from './StatusWidget'


const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '2rem'
    },
    tableContainer: {
        boxShadow: theme.customShadow.lg,
    },
    tableHead: {
        background: theme.palette.secondary.main,

    },
    tableHeadCell: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    linkCell: {
        textDecoration: 'none'
    },
    taskStatus: {
        margin: 'auto',
        padding: '0 12px',
        flexDirection: 'row',
        [theme.breakpoints.down('xs')]: {
            margin: '0.5rem 0rem',
            padding: '0rem',
            display: 'block'
        }
    }

   

}))

const tableHeaders = [{ label: 'Task', labelFor: 'taskName' }, { label: 'Due Date', labelFor: 'taskDueDate' }, { label: 'Assigned To', labelFor: 'taskAssignee' }, { label: 'Priority', labelFor: 'taskPriority' }, { label: 'Status', labelFor: 'taskStatus' }, { label: '', labelFor: '' }]

const TasksTable = ({ match: { params: { projectId }} }) => {
    const { tasks } = useContext(TasksContext)

    const [listToRender, setListToRender] = useState([])

    useEffect(() => {
        const initState = tasks.filter(task => task.taskProject === projectId)
        setListToRender(initState)
    }, [tasks])
    
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            {tableHeaders.map(({ label, labelFor }) => <TableCell key={labelFor} className={classes.tableHeadCell}>{label}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listToRender.map(({ taskName, taskDueDate, taskAssignee, taskPriority, taskStatus, _id }) => {
                            return (
                                <TableRow hover key={_id}>
                                    <TableCell>{taskName}</TableCell>
                                    <TableCell>{taskDueDate}</TableCell>
                                    <TableCell>{taskAssignee}</TableCell>
                                    <TableCell>{taskPriority}</TableCell>
                                    <TableCell><StatusWidget status={taskStatus} /></TableCell>
                                    <TableCell><Link className={classes.linkCell} to={`/project/${projectId}/task/${_id}`}><Button variant='contained' color='secondary'>More</Button></Link></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default TasksTable