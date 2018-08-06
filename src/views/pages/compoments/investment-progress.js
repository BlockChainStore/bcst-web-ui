import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import investmentActions from '../../../ducks/investment/actions'


const styles = theme => ({
    button: {
        marginRight: theme.spacing.unit,
    },
    stepComponent: {
        backgroundColor: '#fff',
        padding: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 10,
    },
    btnContainer: {
        paddingTop: theme.spacing.unit * 3,
    },
    buttonDay: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControlDay: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
})


class InvestmentProgress extends React.Component {

    handleWithdraw = () => {
        const { investmentActions } = this.props
        investmentActions.withdrawInvestment()
        console.log('THANK YOU FOR INVESTMENT.')
    }

    render() {
        const { classes, investment } = this.props
        const annualized=investment.info.annualized/10+'%'
        const secondLeftDays=parseInt(investment.info.secondLeft / 60 / 60 / 24 , 10)
        const secondLeftHrs=parseInt(investment.info.secondLeft / 60 / 60 % 24 , 10)
        const returnInvestment=investment.info.returnInvestment
        const packetDay=investment.info.packetDay
        const principle=investment.info.principle
        return (          
            <Grid container justify="center" className={classes.btnContainer}>
                <Grid item xs={2}>
                    Principle: 
                </Grid>
                <Grid item xs={10}>
                    {principle}
                </Grid>
                <Grid item xs={2}>
                    Annualized: 
                </Grid>
                <Grid item xs={10}>
                    {annualized}
                </Grid>
                <Grid item xs={2}>
                    Time remaining: 
                </Grid>
                <Grid item xs={10}>
                    {secondLeftDays} days {secondLeftHrs} hours
                </Grid>
                <Grid item xs={2}>
                    Return: 
                </Grid>
                <Grid item xs={10}>
                    {returnInvestment}
                </Grid>
                <Grid item xs={2}>
                    Packet days: 
                </Grid>
                <Grid item xs={10}>
                    {packetDay}
                </Grid>
                {investment.info.secondLeft !== 0 
                    ?<Button 
                        variant="contained" 
                        color="primary" 
                        disabled
                        className={classes.button}>
                            Withdraw
                    </Button>
                    :
                    <Button 
                        variant="contained" 
                        color="primary"  
                        className={classes.button}
                        onClick={this.handleWithdraw}>
                            Withdraw
                    </Button>
                    }
            </Grid>
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
