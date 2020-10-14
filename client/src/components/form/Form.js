
import React, { useState } from 'react'
import { Paper, makeStyles, CssBaseline, Button, Typography } from '@material-ui/core'
import { projectForm } from './formInfo'
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

const Form = () => {

	const classes = useStyles()
    const [formData, setFormData] = useState({})
    const handleFormInput = (evt) => setFormData({...formData, [evt.target.name]: evt.target.value})
    const handleFormSubmit = (evt) => {
        evt.preventDefault()
        projectForm.submit(formData)
        setFormData({})
    }

	return (
		<div>
			<CssBaseline />
			<Paper elevation={1} className={classes.formContainer}>
            <Typography variant='h3'>{projectForm.cta}</Typography>
                <form onSubmit={handleFormSubmit}>
                <FormInput fields={projectForm.fields} handleFormInput={handleFormInput} formData={formData}/>
                    <div className={classes.formButtons}>
                        <Button variant='contained' color='primary'>
                            Cancel
                            </Button>
                        <Button variant='contained' color='secondary' type='submit'>
                            {projectForm.submitBtn}
                        </Button>
                    </div>
                </form>
			</Paper>
		</div>
	)
}

export default Form