import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import BlockCurrency from '../compoments/block-currency'
import BlockAddress from '../compoments/block-address'
import ehtLogo from '../../assets/images/currency/eth.png'
import bcstLogo from '../../assets/images/currency/bcst.png'
import BlockStock from '../compoments/block-stock'


const styles = theme => ({
    firstBlock: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 2
    },
    block: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 2
    },
    blockExx: {
        paddingTop: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 5
    },
})

const Dashboard = (props) => {
    const { classes, user } = props
    const spacing = 24
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justify="center">
                    <Grid item xs={12} lg={10} className={classes.firstBlock}>
                        <BlockAddress />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center">
                    <Grid item xs={12} lg={10} className={classes.block}>
                        <Grid container spacing={spacing} >
                            <Grid item xs={12} md={6}>
                                <BlockCurrency 
                                    avatar={bcstLogo} 
                                    amount={user.bcst} 
                                    symbol={'BCST'}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <BlockCurrency 
                                    avatar={ehtLogo} 
                                    amount={user.eth} 
                                    symbol={'ETH'}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} className={classes.block}>
                <Grid container justify="center">
                    <Grid item  xs={12} lg={10}>
                        <BlockStock />
                    </Grid>
                </Grid>
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
