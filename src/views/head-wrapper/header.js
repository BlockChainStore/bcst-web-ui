import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SimpleModalWrapped from './unlock-walltet' 

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: theme.custom.drawerWidth,
        width: `calc(100% - ${theme.custom.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    flex: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
})


const NavTopBar = ({
    classes,
    handleDrawerOpen, 
    isDrawerOpen,
    router
}) => {
    const path = router.location.pathname.replace('/', '> ')
    return (
        <AppBar 
            position="absolute"
            className={classNames(
                classes.appBar, 
                isDrawerOpen && classes.appBarShift)}>
            <Toolbar disableGutters={!isDrawerOpen}>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleDrawerOpen}
                    className={classNames(
                        classes.menuButton, 
                        isDrawerOpen && classes.hide)}>
                    <MenuIcon />
                </IconButton>
                <Typography color="inherit" className={classes.flex}>
                    BCST {path}
                </Typography>
                <SimpleModalWrapped/>
            </Toolbar>
        </AppBar>
    )
}

NavTopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired,
    isDrawerOpen: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    debugger
    return {
        router : state.router
    }
}
  
export default connect(
    mapStateToProps,
    null
)(withStyles(styles, { withTheme: true })(NavTopBar))