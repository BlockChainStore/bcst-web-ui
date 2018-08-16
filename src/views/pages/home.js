import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import InvestmentInfo from './compoments/investment-info'
import BlockStockEXX from './compoments/block-stock-exx'
import Typography from '@material-ui/core/Typography'


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
                    <Grid item  xs={12} lg={10}>
                        <InvestmentInfo />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.block}>
                <Grid container justify="center">
                    <Grid item  xs={12} lg={10}>
                        <Typography variant="display2" align="center" gutterBottom>
                            Trade Views On EXX
                        </Typography>
                    </Grid>
                    <Grid item  xs={12} lg={10}>
                        <BlockStockEXX symbol={'BCST/ETH'} />
                    </Grid>
                    <Grid item  xs={12} lg={10}>
                        <BlockStockEXX symbol={'BCST/CNYT'} />
                    </Grid>
                    <Grid item  xs={12} lg={10}>
                        <BlockStockEXX symbol={'BCST/BTC'} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Home)