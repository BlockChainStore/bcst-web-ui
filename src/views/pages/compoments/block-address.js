import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
	paper: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	}
})

const blockCurrency = (props) => {
	const { classes, user } = props
	return (
		<Paper className={classes.paper} elevation={1}>
			<Typography variant="headline" gutterBottom>
				Your Address
			</Typography>
			<Typography color="textSecondary" gutterBottom >
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