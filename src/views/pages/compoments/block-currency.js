import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'


const styles = theme => ({
	paper: {
		height: '100%'
	},
	avatar: {
		width: 50,
		height: 50
	}
})

const BlockCurrency = (props) => {
	const { classes, avatar, amount, symbol } = props
	return (
		<Paper elevation={1} className={classes.paper}>
			<List>
				<ListItem>
					<Avatar
						src={avatar}
						className={classes.avatar}/>
					<ListItemText primary={amount} secondary={symbol} />
				</ListItem>
			</List>
		</Paper>
	)
}

export default withStyles(styles)(BlockCurrency)