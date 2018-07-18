import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import NavTopBar from './header'
import MenuList from './menu-list'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
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
    width: theme.spacing.unit * 7,
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
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 9,
    padding: theme.spacing.unit * 3,
  },
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
            <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <MenuList />
        </Drawer>
        <main className={classes.content}>
            {this.props.children}
        </main>
      </div>
    )
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(MiniDrawer)
