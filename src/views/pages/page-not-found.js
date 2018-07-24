import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    text: {
        paddingTop: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 5
    },
})

const Home = (props) => {
    const { classes } = props
    return (
        <Grid container>
            <Grid item xs={12} className={classes.text}>
                <Typography variant="display3" align="center">
                   Page Not Found
                </Typography>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Home)