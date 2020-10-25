import React, { useState } from 'react'
import { Add as AddIcon } from '@material-ui/icons'
import { Fab, makeStyles, MenuItem, Popover } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        right: theme.spacing(2),
        bottom: theme.spacing(2),
    },
    popoverText: {
        padding: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    }
}))

const CreateButton = () => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (evt) => {
        setAnchorEl(evt.currentTarget)
    }

    const handleClose = (evt) => setAnchorEl(null)

    const open = Boolean(anchorEl)
    const popoverId = open ? 'priority-popover' : undefined

    const menuItems = [
        { label: 'Create Organisation', linkTo: '/create/organisation' },
        { label: 'Create Project', linkTo: '/create/project' },
        { label: 'Create Task', linkTo: '/create/task' }
    ]

    return (
        <div>
            <Fab
                onClick={handleClick}
                className={classes.fab}
                aria-label='create-button'
                color='primary'
            >
                <AddIcon />
            </Fab>
            <Popover
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {menuItems.map(({ label, linkTo }) => (
                    <Link to={linkTo} className={classes.link} key={label}>
                        <MenuItem className={classes.popoverText} onClick={handleClose}>
                            {label}
                        </MenuItem>
                    </Link>
                ))}
            </Popover>
        </div>
    )
}

export default CreateButton
