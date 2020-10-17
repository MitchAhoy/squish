import React, { useState, useReducer } from 'react'
import { Paper, makeStyles, CssBaseline, Button, Typography } from '@material-ui/core'
import formInfo, { formReducer } from './formInfo'
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

const Form = ({ match: {params: {formFor}}}) => {

    const classes = useStyles()
    const { fields, cta, submitBtn, submit } = formInfo[formFor]
    const [formData, setFormData] = useState({})
    const handleDateInput = (inputFor, date) => {setFormData({...formData, [inputFor]: date})}
    const handleFormInput = (evt) => setFormData({...formData, [evt.target.name]: evt.target.value})
    const handleFormSubmit = (evt) => {
        evt.preventDefault()
        submit(formData)
        setFormData({})
    }

	return (
		<div>
			<CssBaseline />
			<Paper elevation={1} className={classes.formContainer}>
            <Typography variant='h3'>{cta}</Typography>
                <form onSubmit={handleFormSubmit}>
                <FormInput fields={fields} setFormData={setFormData} handleFormInput={handleFormInput} handleDateInput={handleDateInput} formData={formData} />
                    <div className={classes.formButtons}>
                        <Button variant='contained' color='primary'>
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