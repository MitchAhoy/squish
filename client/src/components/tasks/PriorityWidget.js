import React, { useState } from 'react'
import { Chip, makeStyles, Popover, MenuItem, IconButton, Typography } from '@material-ui/core'
import {FlagRounded as FlagRoundedIcon} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    priority: {
        cursor: 'pointer'
    },
    priorityurgent: {
        color: theme.priorityColour.urgent
    },
    priorityhigh: {
        color: theme.priorityColour.high
    },
    prioritynormal: {
        color: theme.priorityColour.normal
    },
    prioritylow: {
        color: theme.priorityColour.low
    },
    popoverText: {
        padding: theme.spacing(2)
    }
}))

const PriorityWidget = ({ priority, _id }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'priority-popover' : undefined

    const prioritySelection = [{label: 'urgent', priorityClass: 'priorityurgent'}, {label: 'high', priorityClass: 'priorityhigh'}, {label: 'normal', priorityClass: 'prioritynormal'}, {label: 'low', priorityClass: 'prioritylow'}]
    return (
        <div>
            <IconButton onClick={handleClick} className={classes.priority}>
                <FlagRoundedIcon className={`${classes[`priority${priority.toLowerCase()}`]} ${classes.priority}`} />
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
                {prioritySelection.map(({label, priorityClass}) => (
                    <MenuItem onClick={handleClose} key={label} className={`${classes.popoverText} ${classes.priority}`}>
                        <FlagRoundedIcon className={`${classes[priorityClass]} ${classes.priority}`} />
                        <Typography variant='body1' className={`${classes[priorityClass]} ${classes.priority}`}>{label}</Typography>
                    </MenuItem>
                ))}
            </Popover>
        </div>
    )
}

export default PriorityWidget
