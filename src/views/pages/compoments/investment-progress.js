import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Joi from 'joi'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
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
    state = {
        activeStep: 0,
        bcst: 0,
        day: 60,
    }

    handleProgress = () => this.setState({
        ...this.state, 
        activeStep: this.state.activeStep + 1
    })

    handleWithdraw = () => {
    };

    handleConfirm = () => {
        const { investmentActions } = this.props
        investmentActions.onSubmitInvestment(this.state.bcst, this.state.day)
        console.log('!!!actions send to smartcontract')
    }
    
    render() {

        const {  investment } = this.props
        const annualized=investment.info.annualized/10+'%'
        const secondLeftDays=investment.info.secondLeft / 60 / 60 / 24
        const secondLeftHrs=investment.info.secondLeft / 60 / 60 % 24
        const returnInvestment=investment.info.returnInvestment
        const packetDay=investment.info.packetDay
        const principle=investment.info.principle
        return (
            <Grid container>
                <Grid item xs={6}>
                    annualized
                </Grid>
                <Grid item xs={6}>
                    {annualized}
                </Grid>
                <Grid item xs={6}>
                    timeLeft
                </Grid>
                <Grid item xs={6}>
                    {secondLeftDays} {secondLeftHrs}
                </Grid>
                <Grid item xs={6}>
                    returnInvestment
                </Grid>
                <Grid item xs={6}>
                    {returnInvestment}
                </Grid>
                <Grid item xs={6}>
                    packetDay
                </Grid>
                <Grid item xs={6}>
                    {packetDay}
                </Grid>
                <Grid item xs={6}>
                    principle
                </Grid>
                <Grid item xs={6}>
                    {principle}
                </Grid>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                </Grid>
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
