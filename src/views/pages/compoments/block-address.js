import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Text from '../../languages'

const styles = theme => ({
	paper: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	},
	wordBreak: {
		wordBreak: 'break-all'
	}
})

const blockCurrency = (props) => {
	const { classes, user } = props
	return (
		<Paper className={classes.paper} elevation={1}>
			<Typography variant="headline" gutterBottom>
				<Text  keyWord={'yourAddress'} />
			</Typography>
			<Typography color="textSecondary" className={classes.wordBreak} gutterBottom>
				{user.info.address}
			</Typography>
		</Paper>
	)
}

const mapStateToProps = state => ({
    user: state.duck.user
})

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(blockCurrency))