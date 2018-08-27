import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Text from '../../languages'



const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
    },
    cell: {
        // backgroundColor: theme.palette.primary.light,
        // color: theme.palette.common.white,
    },
    table: {
        width: 0,
        overflowY: 'hidden',
        overflowX: 'auto',
        marginBottom: 30,
        borderRadius: 10,
    },
    describe: {
        marginTop: 30,
        marginBottom: 30,
    },
    
})


const CustomizedTable = (props) => {
    const { classes } = props
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="display2" align="center" color='primary'>
                    <Text  keyWord={'bcstLock'} />
                </Typography>
                <Typography variant="subheading" align="left" className={classes.describe}>
                    <Text keyWord={'desBCSTLock1'} /><br/>
                    <Text keyWord={'desBCSTLock1_1'} /><br/>
                    <Text keyWord={'desBCSTLock1_2'} /><br/>
                    <Text keyWord={'desBCSTLock1_3'} /><br/>
                    <Text keyWord={'desBCSTLock1_4'} /><br/>
                    <Text keyWord={'desBCSTLock1_5'} />
                </Typography>
                <Typography variant="subheading" align="left" className={classes.describe}>
                    <Text keyWord={'desBCSTLock2'} />
                </Typography>
                <Typography variant="subheading" align="left" className={classes.describe}>
                    <Text keyWord={'desBCSTLock3'} /><br/>
                </Typography>
                <Typography variant="subheading" align="left" className={classes.describe}>
                    <Text keyWord={'eg'} /><br/>
                    <Text keyWord={'desBCSTLock3_1'} /><br/>
                    <Text keyWord={'desBCSTLock3_2'} /><br/>
                    <Text keyWord={'desBCSTLock3_3'} /><br/>
                    <Text keyWord={'desBCSTLock3_4'} />
                </Typography>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(CustomizedTable)