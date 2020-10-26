import React, { useState } from 'react'
import { Typography, Chip, makeStyles, Popover, MenuItem, IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    chip: {
        cursor: 'pointer'
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
    },
    popoverText: {
        padding: theme.spacing(2)
    }
}))

const StatusWidget = ({ status, id, update }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = (evt) => {
        if (evt.target.getAttribute('value') !== null) {
            update(id, {taskStatus: evt.target.getAttribute('value')})
        }
        setAnchorEl(null)
    };

    const open = Boolean(anchorEl);
    const popoverId = open ? 'status-popover' : undefined

    const statusSelection = [{label: 'open', statusClass: 'open'}, {label: 'in progress', statusClass: 'progress'}, {label: 'completed', statusClass: 'completed'}]
    return (
        <div>
            <IconButton onClick={handleClick} className={classes.chip}>
                <Chip label={status} className={`${classes[`${status.toLowerCase().replace(/ /g, '')}`]} ${classes.chip}`} />
            </IconButton>
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
                {statusSelection.map(({label, statusClass}) => (
                    <MenuItem value={label} onClick={handleClose} key={label} className={`${classes.popoverText} ${classes.chip}` }>
                        <Typography value={label} onClick={handleClose} label={label}>{label}</Typography>
                    </MenuItem>
                ))}
            </Popover>
        </div>
    )
}

export default StatusWidget
