import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import BlockStockEXX from './block-stock-exx'
import BlockStockHitbtc from './block-stock-hitbtc'

const styles = theme => ({
	block: {
		marginTop: theme.spacing.unit * 4
	}
})

class BlockStock extends React.Component {
	render() {
		const { classes } = this.props
		return (
			<Grid container justify="center">
				<Grid item  xs={12}>
					<Typography variant="display2" align="center" gutterBottom>
						BCST Trade Views On Exchage
					</Typography>
				</Grid>
				<Grid className={classes.block} item  xs={12}>
					<BlockStockHitbtc />
				</Grid>
				<Grid className={classes.block} item  xs={12}>
					<BlockStockEXX />
				</Grid>
			</Grid>
		)
	}
}
  

export default withStyles(styles)(BlockStock)