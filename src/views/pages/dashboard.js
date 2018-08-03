import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import BlockCurrency from './compoments/block-currency'
import BlockAddress from './compoments/block-address'

import ehtLogo from '../assets/images/currency/eth.png'
import bcstLogo from '../assets/images/currency/bcst.png'


const styles = theme => ({
    firstBlock: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 2
    },
    block: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 2
    }
})

const Dashboard = (props) => {
    const { classes, user } = props
    const spacing = 24
    return (
        <Grid container>
            <Grid item xs={12} className={classes.firstBlock}>
                <BlockAddress />
            </Grid>
            <Grid item xs={12} className={classes.block}>
                <Grid container spacing={spacing} >
                    <Grid item xs={4}>
                        <BlockCurrency 
                            avatar={ehtLogo} 
                            amount={user.eth} 
                            symbol={'ETH'}/>
                    </Grid>
                    <Grid item xs={4}>
                        <BlockCurrency 
                            avatar={bcstLogo} 
                            amount={user.bcst} 
                            symbol={'BCST'}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.block}>
                
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    user: state.duck.user
})

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(Dashboard))
