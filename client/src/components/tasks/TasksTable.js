import React, { useState, useContext, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, makeStyles, Chip, Paper, Container } from '@material-ui/core'
import { DeleteForeverRounded as DeleteIcon, EditRounded as EditIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { TasksContext } from '../../context/tasks.context'
import formatDate from '../utils/formatDate'


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
    tableBodyCell: {
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
    const { tasks, deleteTask } = useContext(TasksContext)

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
                                    <TableCell className={classes.tableBodyCell}>{taskName}</TableCell>
                                    <TableCell className={classes.tableBodyCell}>{formatDate(taskDueDate)}</TableCell>
                                    <TableCell className={classes.tableBodyCell}>{taskAssignee}</TableCell>
                                    <TableCell className={classes.tableBodyCell}>{taskPriority}</TableCell>
                                    <TableCell className={classes.tableBodyCell}><Chip label={taskStatus} /></TableCell>
                                    <TableCell className={classes.tableBodyCell}><Link className={classes.linkCell} to={`/project/${projectId}/task/${_id}`}><IconButton variant='contained' color='secondary'><EditIcon /></IconButton></Link><IconButton onClick={() => deleteTask(_id)} variant='contained' color='secondary'><DeleteIcon /></IconButton></TableCell>
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