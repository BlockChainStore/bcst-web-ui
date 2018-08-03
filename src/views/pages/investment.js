import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import InvestmentInfo from './compoments/investment-info'
import InvestmentStep from './compoments/investment-step'
import InvestmentProgress from './compoments/investment-progress'

const styles = theme => ({
    block: {
        paddingTop: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 5
    },
})

const Home = (props) => {
    const { classes } = props
    return (
        <Grid container>
            <Grid item xs={12} className={classes.block}>
                <Grid container justify="center">
                    <Grid item xs={11}>
                        <InvestmentInfo />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.block}>
                <Grid container justify="center">
                    <Grid item xs={11}>
                        <InvestmentStep />
                    </Grid>
                    <Grid item xs={11}>
                        <InvestmentProgress />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Home)