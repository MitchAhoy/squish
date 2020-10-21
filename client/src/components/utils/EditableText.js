import React, { useState } from 'react'
import { TextField, IconButton, InputAdornment, makeStyles, Typography } from '@material-ui/core'
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
    text: {
        margin: '1rem',
        '&:hover': {
            outline: '1px #000 solid'
        }
    },
    textareaRoot: {
        fontSize: '3rem',
        width: '100%'
    }
}))

const EditableText = ({ text, name, multiline, handleEditChange }) => {
    const classes = useStyles()

    const [isEditing, setIsEditing] = useState(false)
    const [mouseOver, setMouseOver] = useState(false)

    const handleEditClick = () => setIsEditing(!isEditing)
    const handleMouseOver = () => setMouseOver(!mouseOver)

    if (!isEditing) {
        return (

                <TextField
                    className={classes.text}
                    disabled
                    multiline={multiline}
                    value={text}
                    name={name}
                    onClick={handleEditClick}
                    onMouseEnter={handleMouseOver}
                    onMouseLeave={handleMouseOver}
                    InputProps={{
                        classes: {
                            disabled: classes.disabled,
                            root: classes.textareaRoot
                        },
                        // endAdornment:
                        //     mouseOver &&
                        //     <InputAdornment position="end">
                        //         <IconButton onClick={handleEditClick}><EditIcon /></IconButton>
                        //     </InputAdornment>,
                    }}
                />

        )
    }

    if (isEditing) {
        return (
                <TextField
                    className={classes.text}
                    defaultValue={text}
                    multiline={multiline}
                    name={name}
                    onChange={handleEditChange}
                    InputProps={{
                        classes: {
                            disabled: classes.disabled,
                            root: classes.textareaRoot
                        },
                        // endAdornment:
                        //     mouseOver &&
                        //     <InputAdornment position="end">
                        //         <IconButton onClick={handleEditClick}><EditIcon /></IconButton>
                        //     </InputAdornment>,
                    }}
                />
        )
    }



}

export default EditableText
