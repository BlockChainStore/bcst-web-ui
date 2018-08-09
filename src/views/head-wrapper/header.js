import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import SimpleModalWrapped from './unlock-walltet' 
import bcstLogo from '../assets/images/logo-wide-white.png'
import SwitchLanguages from './switch-languages'


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
        marginLeft: 4,
        marginRight: 4,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 12,
            marginRight: 12,
        },
    },
    flex: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    logo: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            backgroundImage: `url(${bcstLogo})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            display: 'block',
            width: 135,
            height: 50,
            marginRight: 10
        }
    },
    keyboardArrowRight: {
        fontSize: 40,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    textPath: {
        fontSize: 20,
        textTransform: 'capitalize'
    }
})

const NavTopBar = ({
    classes,
    handleDrawerOpen, 
    isDrawerOpen,
    router
}) => {
    const path = router.location.pathname.replace('/', '')
    return (
        <AppBar 
            position="fixed"
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
                {!isDrawerOpen &&
                    <div className={classes.logo}></div>
                }
                
                {!!path && !isDrawerOpen && 
                    <KeyboardArrowRight className={classes.keyboardArrowRight} />
                }
                <Typography className={classes.textPath} color="inherit" >
                    {path}
                </Typography>

                <div className={classes.flex}></div>

                <SimpleModalWrapped />
                <SwitchLanguages />
            </Toolbar>
        </AppBar>
    )
}


const mapStateToProps = state => ({
    router: state.router
})

export default connect(
    mapStateToProps,
    null
)(withStyles(styles, { withTheme: true })(NavTopBar))