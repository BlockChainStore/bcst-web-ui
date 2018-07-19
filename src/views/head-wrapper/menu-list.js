import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Home from '@material-ui/icons/Home'
import Dashboard from '@material-ui/icons/Dashboard'
import Money from '@material-ui/icons/AssignmentReturned'


const styles = theme => ({
    link: {
        textDecoration: 'none'
    }
})

const MenuList = ({classes}) => {
    return (
        <List component="nav">
            <Link to='/' className={classes.link}>
                <ListItem button>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </Link>
            <Link to='/dashboard' className={classes.link}>
                <ListItem button>
                    <ListItemIcon><Dashboard /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </Link>
            <Link to='/investment' className={classes.link}>
                <ListItem button>
                    <ListItemIcon><Money /></ListItemIcon>
                    <ListItemText primary="Investment" />
                </ListItem>
            </Link>
        </List>
    )
}

export default withStyles(styles)(MenuList)

