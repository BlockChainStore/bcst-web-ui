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
import Text from '../languages'

const styles = theme => ({
    link: {
        textDecoration: 'none'
    }
})

const MenuList = ({ classes, user }) => {
    const isUnlockWallet = !!user.info.address 
    const home = <Text keyWord={'home'} />
    const dashboard  = <Text keyWord={'dashboard'} />
    const investment = <Text keyWord={'investment'} />
    return (
        <List component="nav">
            <Link to='/' className={classes.link}>
                <ListItem button>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary={home} />
                </ListItem>
            </Link>
            {isUnlockWallet &&             
                <Link to='/dashboard' className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><Dashboard /></ListItemIcon>
                        <ListItemText primary={dashboard} />
                    </ListItem>
                </Link>}
            {isUnlockWallet && 
                <Link to='/investment' className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><Investment /></ListItemIcon>
                        <ListItemText primary={investment} />
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

