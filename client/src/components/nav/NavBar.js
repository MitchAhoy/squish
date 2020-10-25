import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as MUILink } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { 
    BugReport as BugReportIcon, 
    DashboardRounded as DashboardRoundedIcon,
    AccountTreeRounded as AccountTreeRoundedIcon,
    AssignmentRounded as AssignmentRoundedIcon,
    SettingsApplicationsRounded as SettingsApplicationsRoundedIcon,
    ExitToAppRounded as ExitToAppRoundedIcon,
    GroupRounded as GroupIcon
} from '@material-ui/icons'
import Login from './Login'
import NavProfile from './NavProfile'
import { Link } from 'react-router-dom'

const drawerWidth = 240;

const menuOptions = [
    {label: 'Dashboard', linkTo: '/dashboard', icon: <DashboardRoundedIcon />},
    {label: 'Organisations', linkTo: '/organisations-overview', icon: <AccountTreeRoundedIcon />},
    {label: 'Projects', linkTo: '/projects-overview', icon: <AccountTreeRoundedIcon />},
    {label: 'Tasks', linkTo: '/tasks-overview', icon: <AccountTreeRoundedIcon />},
    ]

const userOptions = [
    {label: 'Users', linkTo: '/users', icon: <GroupIcon />}
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'none'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
},  
    button: {
    color: theme.palette.text.light
},
    link: {
        textDecoration: 'none',
        color: theme.palette.text.dark
    }
}));

const NavBar = ({ user }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
          <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                  [classes.appBarShift]: open,
              })}
          >
              <Toolbar className={classes.toolbar}>
                  <div>
                    {user.length > 0 && (
                        <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    )}

                  <Link to='/' className={classes.link}>
                    <Button className={classes.button}>
                        <BugReportIcon color='inherit' /> <Typography variant='h6' component='h1' color='inherit'>SQUISH</Typography>
                    </Button>
                  </Link>
                  </div>
                  {user.length > 0 ? <NavProfile img={user.profileImage} name={`${user.firstName} ${user.lastName}`} /> : <Login />}
              </Toolbar>
          </AppBar>

      {user && (
        <>
              <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                {menuOptions.map(({ label, linkTo, icon }) => (
                  <Link to={linkTo} className={classes.link} key={label}>
                      <ListItem button>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={label} />
                      </ListItem>
                  </Link>
                ))}
              </List>
              <Divider />
              <List>
              {userOptions.map(({ label, linkTo, icon }) => (
                  <Link to={linkTo} className={classes.link} key={label}>
                      <ListItem button>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={label} />
                      </ListItem>
                  </Link>
                ))}
              {<MUILink 
               underline='none'
               href='/api/logout'
               color='inherit'
               className={classes.link}>
                      <ListItem button key='logout'>
                        <ListItemIcon><ExitToAppRoundedIcon /></ListItemIcon>
                      <ListItemText primary='Logout' />
                    </ListItem>
                  </MUILink>}
              </List>
            </Drawer>

            <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
            >
            <div className={classes.drawerHeader} />

            </main>
            </>
      )}

    </div>
  );
}

export default NavBar