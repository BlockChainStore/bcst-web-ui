import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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


const CheckYouAddressStep = ({ user , }) => {
    return (
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="headline" align="center" gutterBottom>
                    Make sure your address is :    {user.info.address}
                </Typography> 
            </Grid>
        </Grid>
    )
}


const ChooseBCST = ({ user, onChangeBCST, state }) => {
    return (
        <Grid container>
            <Grid item xs={12} >
                <Typography align="center">
                    You have {user.bcst} bcs
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <Grid container justify="center">
                    <Grid item >
                        <TextField
                            onChange={onChangeBCST}
                            label="BCST amount"
                            margin="normal"/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


const ChooseDay = ({ user, onChangeDay, state }) => {
    if(state.bcst < 10001){
        return (
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="headline" align="center" gutterBottom>
                    Sorry your BCST too lower plan. please go back.
                </Typography> 
            </Grid>
        </Grid>
        )
    }else{
        return (
            <Grid container>
                <Grid item xs={12} >
                    <Grid container justify="center">
                        {state.day}
                            <Grid item >
                                {state.bcst >=300000 
                                    ?  <FormControl component="fieldset" required >
                                    <FormLabel component="legend">Day</FormLabel>
                                    <RadioGroup
                                        aria-label="Day"
                                        name="gender1"
                                        value={state.day}
                                        onChange={onChangeDay}>
                                    <FormControlLabel value="60" control={<Radio color="primary"/>} label="60 Days" />
                                    <FormControlLabel value="90" control={<Radio color="primary"/>} label="90 Days" />
                                    </RadioGroup>
                                </FormControl>
                                    :  <FormControl component="fieldset" required >
                                    <FormLabel component="legend">Day</FormLabel>
                                    <RadioGroup
                                    aria-label="Day"
                                    name="gender1"
                                    onChange={onChangeDay}
                                    value={state.day}
                                    >
                                    <FormControlLabel value="30" control={<Radio color="primary"/>} label="30 Days" />
                                    <FormControlLabel value="60" control={<Radio color="primary"/>} label="60 Days" />
                                    <FormControlLabel value="90" control={<Radio color="primary"/>} label="90 Days" />
                                    </RadioGroup>
                                </FormControl>
                                }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}


const Confirm =  ({ user, state }) => {
    return (
            <Grid container>
                <Grid item xs={2} >
                    <Typography variant="headline" align="left" gutterBottom>
                        Your Address:         
                    </Typography>
                </Grid>
                <Grid item xs={10} >
                    <Typography variant="headline" align="left" gutterBottom>
                        {user.info.address}        
                    </Typography> 
                </Grid>
                <Grid item xs={2} >
                    <Typography variant="headline" align="left" gutterBottom>
                        Investment:      
                    </Typography> 
                </Grid>
                <Grid item xs={10} >
                    <Typography variant="headline" align="left" gutterBottom>
                        {state.bcst} BSCT         
                    </Typography> 
                </Grid>
                <Grid item xs={2} >
                    <Typography variant="headline" align="left" gutterBottom>
                        Period:         
                    </Typography> 
                </Grid>
                <Grid item xs={10} >
                    <Typography variant="headline" align="left" gutterBottom>
                        {state.day} Days        
                    </Typography> 
                </Grid>
            </Grid>
    )
}

const getSteps = () => {
    return [
        { 
            title: 'Check You address',
            component: CheckYouAddressStep },
        { 
            title: 'Choose BCST',
            component: ChooseBCST
        },
        { 
            title: 'Choose Day',
            component: ChooseDay
        },
        { 
            title: 'Summary',
            component: Confirm
        },
    ]
}


class InvestmentStep extends React.Component {
    state = {
        activeStep: 0,
        bcst: 0,
        day: 60,
    }

    handleNext = () => this.setState({
        ...this.state, 
        activeStep: this.state.activeStep + 1
    })

    handleBack = () => this.setState({
        ...this.state, 
        activeStep: this.state.activeStep - 1
    })

    handleBCST = (e) => {
        this.setState({
            ...this.state, 
            bcst: e.target.value
        })

        const validator = Joi.number().min(1900).max(2013)
        const result = Joi.validate(e.target.value, validator)
        console.log(result)

    }
    handleChange = (e) => {
        this.setState({ day: e.target.value })
    }

    handleConfirm = () => {
        const { investmentActions } = this.props
        investmentActions.onSubmitInvestment(this.state.bcst, this.state.day)
        console.log('!!!actions send to smartcontract')
    }
    
    render() {
        const steps = getSteps()
        const { classes, user } = this.props
        const { activeStep } = this.state
        const Component = steps[activeStep].component
        return (
            <Grid container>
                <Grid item xs={12} >
                    <Stepper activeStep={activeStep}>
                        {steps.map((item, index) => (
                            <Step key={item.title}>
                                <StepLabel>{item.title}</StepLabel>
                            </Step>)
                        )}
                    </Stepper>
                </ Grid>
                <Grid item xs={12} className={classes.stepComponent} >
                    <Component
                        classes={classes}
                        user={user}
                        state={this.state}
                        onChangeBCST={this.handleBCST}
                        onChangeDay={this.handleChange}/>
                    <Grid container justify="center" className={classes.btnContainer}>
                        <Grid item>
                            <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className={classes.button}>
                                Back
                            </Button>
                            {activeStep === steps.length - 1 
                                ? <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleConfirm}
                                    className={classes.button}>
                                    Confirm
                                </Button>
                                : <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}>
                                    Next
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    user: state.duck.user,
    investment: state.duck.investment
})

const mapDispatchToProps = dispatch => ({
    investmentActions: bindActionCreators(investmentActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(InvestmentStep))
