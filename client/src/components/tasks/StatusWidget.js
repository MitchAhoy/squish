import React, { useState } from 'react'
import { Typography, Chip, makeStyles, Popover, MenuItem, IconButton } from '@material-ui/core'

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

    const statusSelection = [{label: 'open', statusClass: 'chipopen'}, {label: 'in progress', statusClass: 'chipinprogress'}, {label: 'completed', statusClass: 'chipcompleted'}]
    return (
        <div>
            <IconButton onClick={handleClick} className={classes.chip}>
                <Chip label={status} className={`${classes[`chip${status.toLowerCase()}`]} ${classes.chip}`} />
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
                        <Typography clickable value={label} onClick={handleClose} label={label} className={ `${classes.chip} ${classes[statusClass]}` }>{label}</Typography>
                    </MenuItem>
                ))}
            </Popover>
        </div>
    )
}

export default StatusWidget
