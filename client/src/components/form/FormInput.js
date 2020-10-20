import React, { useContext } from 'react'
import {
	TextField,
	makeStyles,
	Select,
	FormControl,
	MenuItem,
	InputLabel,
} from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { OrganisationsContext } from '../../context/organisations.context'
import { ProjectsContext } from '../../context/projects.context'

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

const FormInput = ({fields, handleFormInput, handleDateInput, formData}) => {
	const { organisations } = useContext(OrganisationsContext)
	const { projects } = useContext(ProjectsContext)
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
			case 'select-priority':
				const priorities = ['Low', 'Normal', 'High', 'Urgent']
				return (
							<FormControl
								variant='outlined'
								className={classes.formInput}
							>
								<InputLabel id={inputFor}>{label}</InputLabel>
								<Select
									labelId={`${inputFor}-label`}
									id={`${inputFor}-select`}
									label={label}
									onChange={handleFormInput}
									name={inputFor}
									required
									
								>
									{priorities.map((priority) => (
										<MenuItem key={priority} value={priority}>
											{priority}
										</MenuItem>
									))}
								</Select>
							</FormControl>
				)
				case 'select-date':
					return (
						<KeyboardDatePicker
							className={classes.formInput}
							label={label}
							placeholder='2018/10/10'
							format='yyyy/MM/dd'
							value={formData.taskDueDate ? formData.taskDueDate : new Date().setDate(new Date().getDate() + 1)}
							inputVariant='outlined'
							onChange={(date) => handleDateInput(inputFor, date)}
							disablePast={true}
							autoOk={true}
						/>
					)
				case 'select-organisation':	
					return (
						<FormControl
							variant='outlined'
							className={classes.formInput}
						>
							<InputLabel id={inputFor}>{label}</InputLabel>
							<Select
								labelId={`${inputFor}-label`}
								id={`${inputFor}-select`}
								label={label}
								onChange={handleFormInput}
								name={inputFor}
								required
							>
							{organisations.length > 0 ? organisations.map(({_id, organisationName}) => (
								<MenuItem key={_id} value={_id}>
									{organisationName}
								</MenuItem>
							)) : (
								<MenuItem disabled>
									Please create an organisation first.
								</MenuItem>
							)}
							</Select>
						</FormControl>
			)
			case 'select-project':
				return (
					<FormControl
						variant='outlined'
						className={classes.formInput}
					>
						<InputLabel id={inputFor}>{label}</InputLabel>
						<Select
							labelId={`${inputFor}-label`}
							id={`${inputFor}-select`}
							label={label}
							onChange={handleFormInput}
							name={inputFor}
							required
						>
						{projects.length > 0 ? projects.map(({_id, projectName}) => (
							<MenuItem key={_id} value={_id}>
								{projectName}
							</MenuItem>
						)) : (
							<MenuItem disabled>
								Please create a project first.
							</MenuItem>
						)}
						</Select>
					</FormControl>
		)
		case 'task-description':
			return (
				<TextField 
					rowsMin={3}
					key={inputFor}
					label={label}
					name={inputFor}
					className={classes.formInput}
					type={type}
					required
					value={formData[inputFor]}
					variant='outlined'
					onChange={handleFormInput}
					multiline={true}
					rows={3}
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