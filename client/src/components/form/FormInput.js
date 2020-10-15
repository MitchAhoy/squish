import React from 'react'
import { Link } from 'react-router-dom'
import {
	Typography,
	TextField,
	makeStyles,
	Button,
	CssBaseline,
	Select,
	FormControl,
	MenuItem,
	InputLabel,
	InputAdornment
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	title: {
		marginBottom: '1rem',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	formInput: {
		marginTop: '1rem',
		width: '100%'
	},
	formButtons: {
		display: 'flex',
		marginTop: '2rem',
		justifyContent: 'space-between',
	},
	createCustomerBtn: {
		marginTop: '0.75rem',
	},
	createCustomerLink: {
		textDecoration: 'none'
	},
	noCustomers: {
		width: '100%',
	},
	datePicker: {
		width: '4rem',
	},
}))

const FormInput = ({fields, handleFormInput, formData}) => {

	const classes = useStyles()
	const renderFields = fields.map(({ label, inputFor, type }) => {
		switch (type) {
			case 'text':
				return (
					<TextField
						key={inputFor}
						label={label}
						name={inputFor}
						className={classes.formInput}
						type={type}
						required
						value={formData[inputFor]}
						variant='outlined'
						onChange={handleFormInput}
					/>
				)
			case 'email':
				return (
					<TextField
						key={inputFor}
						label={label}
						name={inputFor}
						className={classes.formInput}
						type={type}
						required
						value={formData[inputFor]}
						variant='outlined'
						onChange={handleFormInput}
					/>
				)
			default:
				return 'unidentified input'
		}
	})

	return (
		<div>
			{renderFields}
		</div>
	)
}

export default FormInput