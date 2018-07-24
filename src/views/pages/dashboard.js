import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    block: {
        paddingTop: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 5
    },
})

const Dashboard = (props) => {
    const { classes } = props
    return (
        <Grid container>
            <Grid item xs={12} className={classes.block}>
            Dashboard   
            </Grid>
            <Grid item xs={12} className={classes.block}>
                
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Dashboard)