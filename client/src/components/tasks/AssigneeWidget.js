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

const AssigneeWidget = ({ currentUser, organisationUsers }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'assignee-popover' : undefined
    return (
        <div>
            <Button onClick={handleClick} className={classes.chip}>
                <Avatar className={classes.avatarIcon}>{currentUser[0].toUpperCase()}</Avatar><Typography variant='body1'>{currentUser}</Typography>
            </Button>
            <Popover
                id={id}
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
                    <MenuItem onClick={handleClose} key={email}>
                        <Avatar className={classes.avatarIcon}>{email[0].toUpperCase()}</Avatar><Typography variant='body1'>{email}</Typography>
                    </MenuItem>
                ))}
            </Popover>
        </div>
    )
}


export default AssigneeWidget
