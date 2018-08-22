import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import bcstLogo from '../assets/images/logo-wide.png'
import NavTopBar from './header'
import MenuList from './menu-list'
import SwitchLanguages from './switch-languages'


const styles = theme => ({
	root: {
		flexGrow: 1,
		zIndex: 1,
		overflow: 'hidden',
		display: 'flex',
	},
	logo: {
        backgroundImage: `url(${bcstLogo})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        width: 135,
        height: 50,
		position: 'absolute',
		left: 24,
		top: 7
    },
	drawerPaper: {
		position: 'fixed',
		whiteSpace: 'nowrap',
		width: theme.custom.drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: 0,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		marginLeft: 0,
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit * 9,
		},
		paddingTop: theme.spacing.unit * 9,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin-left', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		})
	},
	contentDrawerOpen: {
		marginLeft: theme.custom.drawerWidth,
		transition: theme.transitions.create('margin-left', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	}
})

class MiniDrawer extends React.Component {
	state = { open: false }
	handleDrawerOpen = () => this.setState({ open: true })
	handleDrawerClose = () => this.setState({ open: false })
	
	render() {
		const { classes } = this.props

		return (
		<div className={classes.root}>
			<NavTopBar 
				handleDrawerOpen={this.handleDrawerOpen}
				isDrawerOpen={this.state.open} />
			<Drawer
				variant="permanent"
				classes={{
					paper: classNames(
						classes.drawerPaper, 
						!this.state.open && classes.drawerPaperClose)}}
				open={this.state.open}>
				<div className={classes.logo}></div>
				<div className={classes.toolbar}>
					<IconButton onClick={this.handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<MenuList />
			</Drawer>
			<main className={classNames(
				classes.content,
				this.state.open && classes.contentDrawerOpen)}>
				{this.props.children}
			</main>
			<SwitchLanguages />
		</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(MiniDrawer)
