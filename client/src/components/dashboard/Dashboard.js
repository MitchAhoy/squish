import React, { useContext, useState } from 'react'
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, makeStyles, Chip, Paper } from '@material-ui/core'
import { DeleteForeverRounded as DeleteIcon, EditRounded as EditIcon } from '@material-ui/icons'
import { TasksContext } from '../../context/tasks.context'
import { UserContext } from '../../context/user.context'
import { Link } from 'react-router-dom'
import formatDate from '../utils/formatDate'
import AlertModal from '../utils/AlertModal'

const useStyles = makeStyles((theme) => ({
    dashboardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    cardContainer: {
        boxShadow: theme.customShadow.lg,
        maxWidth: '10rem',
        margin: '1rem',
        padding: '0.3rem 1rem',
        cursor: 'pointer',
        '&:hover': {
            background: '#FAFAFA'
        }

    },
    cardStatusContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: '1rem'
    },
    link: {
        textDecoration: 'none',
        maxWidth: '15rem'
    },
    tableContainer: {
        boxShadow: theme.customShadow.lg,
    },
    tableHead: {
        background: theme.palette.secondary.main

    },
    tableHeadCell: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    tableBodyCell: {
        textAlign: 'center'
    },
    tableActions: {
        display: 'flex',
        alignItems: 'center'
    },
    open: {
        background: theme.statusColour.open,
        color: theme.palette.text.light,
    },
    inprogress: {
        background: theme.statusColour.inProgress,
        color: theme.palette.text.light,
    },
    completed: {
        background: theme.statusColour.completed,
        color: theme.palette.text.light,
    }
}))



const Dashboard = () => {

    const { tasks, deleteTask } = useContext(TasksContext)
    const { user } = useContext(UserContext)
    const [filter, setFilter] = useState('open')
    const [confirmationModal, setConfirmationModal] = useState('')
    const taskCards = ['open', 'in progress', 'completed']
    const tableHeaders = [{ label: 'Task', labelFor: 'taskName' }, { label: 'Due Date', labelFor: 'taskDueDate' }, { label: 'Assigned To', labelFor: 'taskAssignee' }, { label: 'Priority', labelFor: 'taskPriority' }, { label: 'Status', labelFor: 'taskStatus' }, { label: '', labelFor: '' }]
    const listToRender = tasks.filter(task => task.taskAssignee === user.email && task.taskStatus === filter)
    const classes = useStyles()
    const handleFilter = (status) => setFilter(status)
    const showConfirmationModal = () => setConfirmationModal(!confirmationModal)

    return (
        <Container className={classes.dashboardContainer}>
            <Typography variant='h3' gutterBottom>My Tasks</Typography>
            <div className={classes.cardStatusContainer}>
                {taskCards.map(status => (
                    <Paper className={classes.cardContainer} key={status} onClick={() => handleFilter(status)}>
                        <Typography variant='caption'>
                            {status} tasks
                    </Typography>
                        <Typography variant='h6'>
                            {tasks.filter(task => task.taskStatus === status && task.taskAssignee === user.email).length}
                        </Typography>
                    </Paper>
                ))}

            </div>

            {listToRender.length > 0 ? (
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                {tableHeaders.map(({ label, labelFor }) => <TableCell key={labelFor} className={classes.tableHeadCell}>{label}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listToRender.map(({ taskName, taskDueDate, taskAssignee, taskPriority, taskStatus, taskProject, _id }) => {
                                return (
                                    <TableRow hover key={_id}>
                                        <TableCell className={classes.tableBodyCell}>{taskName}</TableCell>
                                        <TableCell className={classes.tableBodyCell}>{formatDate(taskDueDate)}</TableCell>
                                        <TableCell className={classes.tableBodyCell}>{taskAssignee}</TableCell>
                                        <TableCell className={classes.tableBodyCell}>{taskPriority}</TableCell>
                                        <TableCell className={classes.tableBodyCell}><Chip label={taskStatus} className={`${classes[`${taskStatus.toLowerCase().replace(/ /g, '')}`]}`} /></TableCell>
                                        <TableCell className={classes.tableBodyCell}>
                                            <div className={classes.tableActions}>
                                                <Link className={classes.linkCell} to={`/project/${taskProject}/task/${_id}`}>
                                                    <IconButton variant='contained' color='secondary'><EditIcon /></IconButton>
                                                </Link>
                                                <AlertModal id={_id} onClick={showConfirmationModal} state={confirmationModal === _id} confirmedAction={() => deleteTask(_id)} Icon={DeleteIcon} title='Are you sure you would like to delete this task?' setModalState={setConfirmationModal} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                    <Typography variant='h3'>You have no tasks {filter}.</Typography>
                )}
        </Container>
    )
}

export default Dashboard