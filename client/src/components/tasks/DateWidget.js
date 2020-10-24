import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'

const DateWidget = ({ taskDueDate, update, id }) => {
    return (
        <KeyboardDatePicker
        label='Due Date'
        placeholder=''
        format='dd/MM/yyyy'
        value={taskDueDate}
        inputVariant="outlined"
        onChange={(date) => update(id, {taskDueDate: date})}
        disablePast={true}
        autoOk={true}
    />
    )
}

export default DateWidget
