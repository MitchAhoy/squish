import React, { useState } from 'react'
import { Popover, MenuItem, Button, makeStyles, Avatar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	formInput: {
		width: '10rem'
    },
    avatarIcon: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        margin: '0.2rem'
    }
}))

const AssigneeWidget = ({ currentUser, organisationUsers, update, id }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = (evt) => {
        if (evt.target.getAttribute('value') !== null) {
            update(id, {taskAssignee: evt.target.getAttribute('value')})
        }

        setAnchorEl(null)
    };

    const open = Boolean(anchorEl);
    const popoverId = open ? 'assignee-popover' : undefined
    return (
        <div>
            <Button onClick={handleClick} className={classes.chip}>
                <Avatar className={classes.avatarIcon}>{currentUser[0].toUpperCase()}</Avatar><Typography variant='body1'>{currentUser}</Typography>
            </Button>
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
                {organisationUsers?.map((email) => (
                    <MenuItem onClick={handleClose} value={email} key={email}>
                        <Avatar onClick={handleClose} value={email} className={classes.avatarIcon}>{email[0].toUpperCase()}</Avatar><Typography onClick={handleClose} value={email} variant='body1'>{email}</Typography>
                    </MenuItem>
                ))}
            </Popover>
        </div>
    )
}


export default AssigneeWidget
