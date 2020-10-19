import React, { useState } from 'react'
import { Popover, MenuItem, IconButton, makeStyles, Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	formInput: {
		width: '10rem'
	}
}))

const AssigneeWidget = ({ currentUser, organisationalUsers }) => {
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
            <IconButton onClick={handleClick} className={classes.chip}>
                <Avatar>N</Avatar>
            </IconButton>
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
                {organisationalUsers.map(({ email }) => (
                    <MenuItem onClick={handleClose} key={email}>
                        <Avatar>{email[0]}</Avatar>
                    </MenuItem>
                ))}
            </Popover>
        </div>
    )
}


export default AssigneeWidget
