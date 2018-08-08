import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { LinearProgress } from './progress'
import investmentActions from '../../../ducks/investment/actions'


const styles = theme => ({
    infoContainer: {
        backgroundColor: '#fff',
        padding: theme.spacing.unit * 3,
    },
    btnContainer: {
        padding: theme.spacing.unit * 3,
    },
    principleText: {
        fontWeight: 'bold'
    }
})


class InvestmentProgress extends React.Component {

    state = {
        isloadding: false
    }

    handleWithdraw = () => {
        const { investmentActions } = this.props
        this.setState({ isloadding: true })
        investmentActions.withdrawInvestment()
    }

    render() {
        const { classes, investment } = this.props
        const annualized = investment.info.annualized/10+'%'
        const secondLeftDays = parseInt(investment.info.secondLeft / ( 60 * 60 * 24) , 10)
        const secondLeftHrs = Math.ceil((investment.info.secondLeft / ( 60 * 60)) % 24 , 10)
        const dateFormat = `${!!secondLeftDays ? secondLeftDays + ' days ' : ''}${!!secondLeftHrs ? secondLeftHrs + ' hours ' : ''}`
        const packetDay = investment.info.packetDay
        const principle = investment.info.principle / Math.pow(10, 8)

        return (
            <Paper elevation={2}>
                <Grid container justify="center">
                    <Grid item xs={12} className={classes.infoContainer}>
                        <Typography 
                            gutterBottom 
                            align="center" 
                            variant="headline"
                            color='textSecondary'>
                            Status {investment.info.secondLeft !== '0'  ? 'Pending' : 'Ready'}
                        </Typography>
                        <Typography 
                            variant="display1" 
                            align="center" 
                            color='primary'
                            className={classes.principleText}>
                            Principle {principle} BCST
                        </Typography>
                        <Typography 
                            gutterBottom 
                            align="center" 
                            color='textSecondary' 
                            noWrap>
                            Packet {packetDay} days, Annualized {annualized}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.btnContainer} >
                        <Grid container justify="center">
                            <Grid item>
                                <Button
                                    disabled={this.state.isloadding || investment.info.secondLeft !== '0'}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleWithdraw}>
                                    {investment.info.secondLeft !== '0'
                                        ? dateFormat + ' left'
                                        : 'Withdraw'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {this.state.isloadding &&
                        <Grid item xs={12} >
                            <LinearProgress />
                        </Grid>}
                </Grid>
            </Paper>
        )
    }
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
)(withStyles(styles)(InvestmentProgress))
