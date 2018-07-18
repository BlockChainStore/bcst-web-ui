import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Dashboard from '@material-ui/icons/Dashboard'
import Money from '@material-ui/icons/AssignmentReturned'

const styles = theme => ({})

const MenuList = () => {
    return (
        <List component="nav">
            <ListItem button>
                <ListItemIcon><Dashboard /></ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
                <ListItemIcon><Money /></ListItemIcon>
                <ListItemText primary="Investment" />
            </ListItem>
        </List>
    )
}

MenuList.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
} 

export default withStyles(styles)(MenuList)

