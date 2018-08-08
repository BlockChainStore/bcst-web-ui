import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import InvestmentInfo from './compoments/investment-info'
import InvestmentStep from './compoments/investment-step'
import InvestmentProgress from './compoments/investment-progress'
import investmentActions from '../../ducks/investment/actions'

const styles = theme => ({
    block: {
        paddingTop: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 5
    },
})

const Home = (props) => {
    const { classes, investment } = props
    return (
        <Grid container>
            <Grid item xs={12} className={classes.block}>
                <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                        <InvestmentInfo />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.block}>
                <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                        {investment.info.principle !== '0'
                        ? <InvestmentProgress />
                        : <InvestmentStep />}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    investment: state.duck.investment
})

const mapDispatchToProps = dispatch => ({
    investmentActions: bindActionCreators(investmentActions, dispatch)
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Home))