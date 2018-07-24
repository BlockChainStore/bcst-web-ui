import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Home from '@material-ui/icons/Home'
import Dashboard from '@material-ui/icons/Dashboard'
import Investment from '@material-ui/icons/BusinessCenter'


const styles = theme => ({
    link: {
        textDecoration: 'none'
    }
})

const MenuList = ({ classes, user }) => {
    const isUnlockWallet = !!user.info.address 
    return (
        <List component="nav">
            <Link to='/' className={classes.link}>
                <ListItem button>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </Link>
            {isUnlockWallet &&             
                <Link to='/dashboard' className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><Dashboard /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>}
            {isUnlockWallet && 
                <Link to='/investment' className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><Investment /></ListItemIcon>
                        <ListItemText primary="Investment" />
                    </ListItem>
                </Link>}
        </List>
    )
}


const mapStateToProps = state => ({
    user: state.duck.user
})

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(MenuList))

