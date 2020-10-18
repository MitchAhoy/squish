import React, { useState } from 'react'
import { Chip, makeStyles, Popover, MenuItem, IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    chip: {
        cursor: 'pointer'
    },
    chipopen: {
        background: theme.statusColour.open,
        color: theme.palette.text.light,
    },
    chipinprogress: {
        background: theme.statusColour.inProgress,
        color: theme.palette.text.light,
    },
    chipcompleted: {
        background: theme.statusColour.completed,
        color: theme.palette.text.light,
    },
    popoverText: {
        padding: theme.spacing(2)
    }
}))

const StatusChip = ({ status, _id }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'status-popover' : undefined

    const statusSelection = [{label: 'open', statusClass: 'chipopen'}, {label: 'in progress', statusClass: 'chipinprogress'}, {label: 'completed', statusClass: 'chipcompleted'}]
    return (
        <div>
            <IconButton onClick={handleClick} className={classes.chip}>
                <Chip label={status} className={`${classes[`chip${status.toLowerCase()}`]} ${classes.chip}`} />
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
                {statusSelection.map(({label, statusClass}) => (
                    <MenuItem onClick={handleClose} key={label} className={`${classes.popoverText} ${classes.chip}`}>
                        <Chip label={label} className={ `${classes.chip} ${classes[statusClass]}` } />
                    </MenuItem>
                ))}
            </Popover>
        </div>
    )
}

export default StatusChip
