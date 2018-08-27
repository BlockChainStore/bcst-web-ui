import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import DescribeLockPlan from './describe-lock-plan'
import InvestmentBlock from './investment-block'


const styles = theme => ({
    firstBlock: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 2
    },
    block: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 2
    },
})

const Investment = (props) => {
    const { classes } = props
    return (
        <Grid container>
            <Grid item xs={12} className={classes.firstBlock}>
                <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                        <DescribeLockPlan />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.block}>
                <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                        <InvestmentBlock />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Investment)