import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'


const styles = theme => ({
	avatar: {
		width: 50,
		height: 50
	}
})

const blockCurrency = (props) => {
	const { classes, avatar, amount, symbol } = props
	return (
		<Paper elevation={1}>
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

export default withStyles(styles)(blockCurrency)