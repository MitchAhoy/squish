import React, { useState } from 'react'
import { TextField, Button, makeStyles, IconButton, InputAdornment } from '@material-ui/core'
import { EditRounded as EditIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    disabled: {
        color: theme.palette.text.dark,
        borderBottom: 0,
        "&:before": {
            borderBottom: 0
        },
        "&:focus": {
            borderBottom: 0
        }
    },
    textFieldContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textFieldContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        margin: '1rem 0',
        zIndex: 100,
        width: '100%',
        padding: '0.2rem',
        flex: 1
    },
    title: {
        fontSize: '3rem',
        width: '100%',
    },
    description: {
        fontSize: '1rem',
        width: '100%',
        border: 'none'
    },
    cardTitle: {
        fontSize: '1.2rem',
        width: '100%',
        border: 'none'
    },
    btn: {
        margin: '0 0.2rem'
    }

}))

const EditableText = ({ value, name, multiline, variant, id, update }) => {
    const classes = useStyles()

    const [isEditing, setIsEditing] = useState(false)
    const [mouseOver, setMouseOver] = useState(false)
    const [tempEditingValue, setTempEditingValue] = useState(value)
    
    const handleEditClick = () => {
        setIsEditing(!isEditing)
    }
    const handleMouseEnter = () => setMouseOver(true)
    const handleMouseLeave = () => setMouseOver(false)
    const handleEditChange = (evt) => setTempEditingValue(evt.target.value)
    const resetTempEditingValue = () => {
        setTempEditingValue(value)
        setIsEditing(false)
        setMouseOver(!mouseOver)
    }
    const submitEdit = async (evt) => {
        evt.preventDefault()
        update(id, {[name]: tempEditingValue})
        setIsEditing(false)
        setMouseOver(!mouseOver)
    }


    if (!isEditing) {
        return (
            <div 
                className={classes.textFieldContainer} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <TextField
                    className={classes.text}
                    onClick={handleEditClick}
                    disabled
                    multiline={multiline}
                    value={value}
                    name={name}
                    InputProps={{
                        classes: {
                            disabled: classes.disabled,
                            root: classes[variant]
                        }

                    }}
                />
                {mouseOver && <IconButton onClick={handleEditClick}><EditIcon /></IconButton>}
            </div>
        )
    }

    if (isEditing) {
        return (
            <form onSubmit={submitEdit}>
                <TextField
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    autoFocus
                    className={classes.text}
                    value={tempEditingValue}
                    onChange={handleEditChange}
                    multiline={multiline}
                    name={name}
                    InputProps={{
                        classes: {
                            disabled: classes.disabled,
                            root: classes[variant]
                        }
                    }}
                    onFocus={(evt) => {
                        let val = evt.target.value;
                        evt.target.value = '';
                        evt.target.value = val;
                    }}
                />
                <div>
                <Button className={classes.btn} variant='contained' color='secondary' type='submit' >Save</Button>
                <Button className={classes.btn} variant='contained' color='primary' onClick={resetTempEditingValue}>Cancel</Button>
                </div>
            </form>
        )
    }



}

export default EditableText
