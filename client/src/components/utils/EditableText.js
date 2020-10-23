import React, { useState } from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'

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
    text: {
        margin: '1rem 0',
        '&:hover': {
            outline: '1px #C2C2C2 solid',
            cursor: 'text'
        },
        width: '100%',
        padding: '0.2rem',
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
    btn: {
        margin: '0 0.2rem'
    }

}))

const EditableText = ({ value, name, multiline, variant, id, update }) => {
    const classes = useStyles()

    const [isEditing, setIsEditing] = useState(false)
    const [mouseOver, setMouseOver] = useState(false)
    const [formValue, setFormValue] = useState(value)

    const handleEditClick = () => setIsEditing(!isEditing)
    const handleMouseOver = () => setMouseOver(!mouseOver)
    const handleEditChange = (evt) => setFormValue(evt.target.value)
    const submitEdit = async (evt) => {
        evt.preventDefault()
        update(id, {[name]: formValue})
        setIsEditing(!isEditing)
    }

    if (!isEditing) {
        return (
                <TextField
                    className={classes.text}
                    disabled
                    multiline={multiline}
                    value={formValue}
                    name={name}
                    onClick={handleEditClick}
                    onMouseEnter={handleMouseOver}
                    onMouseLeave={handleMouseOver}
                    InputProps={{
                        classes: {
                            disabled: classes.disabled,
                            root: classes[variant]
                        }
                    }}
                />

        )
    }

    if (isEditing) {
        return (
            <form onSubmit={submitEdit}>
                <TextField
                    autoFocus
                    className={classes.text}
                    value={formValue}
                    onChange={handleEditChange}
                    defaultValue={value}
                    multiline={multiline}
                    name={name}
                    InputProps={{
                        classes: {
                            disabled: classes.disabled,
                            root: classes[variant]
                        }
                    }}
                />
                <div>
                <Button className={classes.btn} variant='contained' color='secondary' type='submit'>Save</Button>
                <Button className={classes.btn} variant='contained' color='primary' onClick={handleEditClick}>Cancel</Button>
                </div>
            </form>
        )
    }



}

export default EditableText
