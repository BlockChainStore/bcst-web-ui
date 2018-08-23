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
    firstBlock: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 2
    },
    block: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 2
    },
})

const Home = (props) => {
    const { classes, investment } = props
    return (
        <Grid container>
            <Grid item xs={12} className={classes.firstBlock}>
                <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                        <InvestmentInfo />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.block}>
                <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                        {investment.info.principle !== '0' || !!!investment.info.principle
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