import React, { useContext } from 'react'
import {
	TextField,
	makeStyles,
	Select,
	FormControl,
	MenuItem,
	InputLabel,
	IconButton
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Add as AddIcon } from '@material-ui/icons'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { OrganisationsContext } from '../../context/organisations.context'
import { ProjectsContext } from '../../context/projects.context'
import validateEmails from '../utils/validateEmails'

const useStyles = makeStyles((theme) => ({
	title: {
		marginBottom: '1rem',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	formInput: {
		margin: '0.5rem 0',
		width: '100%'
	},
	formButtons: {
		display: 'flex',
		marginTop: '2rem',
		justifyContent: 'space-between',
	},
	datePicker: {
		width: '4rem',
	},
	selectContainer: {
		width: '100%',
		display: 'flex',
		alignItems: 'center'

	},
	selectInput: {
		minWidth: '10rem',
		flexGrow: 3,
		margin: '0.5rem 0',
	}
}))

const FormInput = ({fields, handleFormInput, handleDateInput, formData, setFormData}) => {
	const { organisations } = useContext(OrganisationsContext)
	const { projects } = useContext(ProjectsContext)
	const classes = useStyles()
	const renderFields = fields.map(({ label, inputFor, type }) => {
		const currentOrganisationSelected = formData.taskOrganisation
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
			case 'add-users':
				const incorrectEmails = (formData[inputFor] !== undefined && validateEmails(formData[inputFor]))
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
						error={incorrectEmails}
						helperText={incorrectEmails && validateEmails(formData[inputFor])}
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
							autoOk={true}
						/>
					)
				case 'select-organisation':	
					return (
						<div className={classes.selectContainer}>
						<FormControl
							variant='outlined'		
							className={classes.selectInput}					
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
						<Link to='/create/organisation' onClick={() => setFormData({})}><IconButton><AddIcon /></IconButton></Link>
						</div>
			)
			case 'select-project':
				const projectsToRender = formData.taskOrganisation && projects.filter(project => project.projectOrganisation === currentOrganisationSelected)
				console.log(projectsToRender)
				return (
					<div className={classes.selectContainer}>
					<FormControl
						variant='outlined'
						className={classes.selectInput}	
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
						{projectsToRender && projectsToRender.length > 0 ? projectsToRender.map(({_id, projectName}) => (
							<MenuItem key={_id} value={_id}>
								{projectName}
							</MenuItem>
						)) : (
							<MenuItem disabled>
								Please select an organisation first.
							</MenuItem>
						)}
						</Select>
					</FormControl>
					<Link to='/create/project' onClick={() => setFormData({})}><IconButton><AddIcon /></IconButton></Link>
					</div>
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
		case 'task-assignee':
			const [filteredOrganisation] = organisations.filter(({_id}) => _id === currentOrganisationSelected)
			const usersToRender = filteredOrganisation?.organisationUsers
			return (
				<div className={classes.selectContainer}>
				<FormControl
					variant='outlined'
					className={classes.selectInput}	
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
					{usersToRender ? usersToRender.map((userEmail) => (
						<MenuItem key={userEmail} value={userEmail}>
							{userEmail}
						</MenuItem>
					)) : (
						<MenuItem disabled>
							Add users or select an organisation
						</MenuItem>
					)}
					</Select>
				</FormControl>
				{!!usersToRender && <Link to={`/organisation/${filteredOrganisation._id}`}><IconButton><AddIcon /></IconButton></Link>}
				</div>
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