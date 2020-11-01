  
import React, { useContext, useState } from 'react'
import { ProjectsContext } from '../../context/projects.context'
import {
	CssBaseline,
	Paper,
	makeStyles,
	Button
} from '@material-ui/core'
import { Clear as ClearIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import EditableText from '../utils/EditableText'
import AlertModal from '../utils/AlertModal'

const useStyles = makeStyles((theme) => ({
	cardContainer: {
		padding: '1rem 2rem',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
        margin: '1rem',
        minWidth: 200,
        maxWidth: 300,
		boxShadow: theme.customShadow.lg,
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
			display: 'block'
		},
		position: 'relative'
        
	},
	cardRight: {
		display: 'flex',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'row-reversed',
			justifyContent: 'space-between',
			alignItems: 'center'
		}
	},
	cardStatus: {
		margin: 'auto',
		padding: '0 12px',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			margin: '0.5rem 0rem',
			padding: '0rem'
		}
	},
	moreBtn: {
		textDecoration: 'none'
	},
	deleteProject: {
		position: 'absolute',
		top: 0,
		right: 0
	}
}))

const ProjectCard = ({ project }) => {

    const classes = useStyles()
	const { projectDescription, projectName, _id } = project || ''
	const [confirmationModual, setConfirmationModual] = useState(false)
	const showConfirmationModal = () => setConfirmationModual(true)
	
	const { updateProject, deleteProject } = useContext(ProjectsContext)

	return (
		<Paper className={classes.cardContainer} elevation={3}>
			<CssBaseline />
			<AlertModal className={classes.deleteProject} onClick={showConfirmationModal} state={confirmationModual} confirmedAction={() => deleteProject(_id)} Icon={ClearIcon} title='Are you sure you would like to delete this project?' setModalState={setConfirmationModual} position='absolute' />
			<div>
            <EditableText value={projectName} name='projectName' multiline={true} variant='title' id={_id} update={updateProject} position/>
            <EditableText value={projectDescription} name='projectDescription' multiline={true} variant='description' id={_id} update={updateProject}/>
			</div>
			<div  className={classes.cardRight}>
				<div>
					<Link className={classes.moreBtn} to={`project/${_id}`}><Button variant='contained' color='secondary'>View More</Button></Link>
				</div>
			</div>
		</Paper>
	)
}

export default ProjectCard
