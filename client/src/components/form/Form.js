import React, { useState, useContext } from 'react'
import { ProjectsContext } from '../../context/projects.context'
import { TasksContext } from '../../context/tasks.context'
import { Paper, makeStyles, CssBaseline, Button, Typography } from '@material-ui/core'
import formInfo from './formInfo'
import FormInput from './FormInput'

const useStyles = makeStyles((theme) => ({
	formContainer: {
		padding: '2rem 2rem',
		maxWidth: '700px',
		margin: '2rem auto',
    },
    formButtons: {
		display: 'flex',
		marginTop: '2rem',
		justifyContent: 'space-between',
	},
}))

const Form = ({ history, match: {params: {formFor}}}) => {
    const { createProject } = useContext(ProjectsContext)
    const { createTask } = useContext(TasksContext)
    const classes = useStyles()
    const { fields, cta, submitBtn } = formInfo[formFor]

    const submitAction = {
        project: createProject,
        task: createTask
    }

    const submit = submitAction[formFor]

    const [formData, setFormData] = useState({})
    const handleDateInput = (inputFor, date) => {setFormData({...formData, [inputFor]: date})}
    const handleFormInput = (evt) => setFormData({...formData, [evt.target.name]: evt.target.value})
    const handleFormSubmit = (evt) => {
        evt.preventDefault()
        submit(formData)
        setFormData({})
        history.goBack()
    }

	return (
		<div>
			<CssBaseline />
			<Paper elevation={1} className={classes.formContainer}>
            <Typography variant='h3' gutterBottom>{cta}</Typography>
                <form onSubmit={handleFormSubmit}>
                <FormInput fields={fields} setFormData={setFormData} handleFormInput={handleFormInput} handleDateInput={handleDateInput} formData={formData} />
                    <div className={classes.formButtons}>
                        <Button variant='contained' color='primary' onClick={() => history.goBack()}>
                            Cancel
                            </Button>
                        <Button variant='contained' color='secondary' type='submit'>
                            {submitBtn}
                        </Button>
                    </div>
                </form>
			</Paper>
		</div>
	)
}

export default Form