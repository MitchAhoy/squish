  
import React from 'react'
import {
	CssBaseline,
	Paper,
	Typography,
	makeStyles,
	Button,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	cardContainer: {
		padding: '1rem 2rem',
		display: 'flex',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
        margin: '1rem',
        minWidth: 400,
        maxWidth: 500,
		boxShadow: theme.customShadow.lg,
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'flex-start',
			display: 'block'
        },
        
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
	}
}))

const ProjectCard = ({ project }) => {

    const classes = useStyles()
    const { projectDescription, projectName, _id } = project || ''

	return (
		<Paper className={classes.cardContainer} elevation={3}>
			<CssBaseline />
			<div>
            <Typography variant='h5' gutterBottom>{projectName}</Typography>
                <Typography variant='body1'>{projectDescription}</Typography>
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
