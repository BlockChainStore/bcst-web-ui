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
import Paper from '@material-ui/core/Paper'
import { LinearProgress } from './progress'
import investmentActions from '../../../ducks/investment/actions'
import Text from '../../languages'

const styles = theme => ({
    stepContainer: {
        backgroundColor: '#fff',
        padding: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 6,
    },
    btnContainer: {
        padding: theme.spacing.unit * 3,
    },
})


const CheckYouAddressStep = ({ user , }) => {
    return (
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="headline" align="center" gutterBottom>
                    <Text keyWord={'makeSure'}/>{user.info.address}
                </Typography> 
            </Grid>
        </Grid>
    )
}


const ChooseBCST = ({ user, onChangeBCST, state }) => {
    return (
        <Grid container justify="center">
            <Grid item xs={12} >
                <Typography align="center">
                    You have {user.bcst} bcs
                </Typography>
            </Grid>
            <Grid item xs={6} lg={4} >
                <TextField
                    error={state.bcstInputErr}
                    helperText={state.bcstInputErr && 'Please enter correct BCST'}
                    value={state.bcst}
                    onChange={onChangeBCST}
                    label="BCST amount"
                    margin="normal"
                    fullWidth/>
            </Grid>
        </Grid>
    )
}


const ChooseDay = ({ user, onChangeDay, state }) => {
    const day = state.day.toString() //dayInputErr

    return (
        <Grid container>
            <Grid item xs={12} >
                <Grid container justify="center">
                        <Grid item >
                            {state.bcst >=300000 
                                ?  <FormControl component="fieldset" >
                                    <FormLabel component="legend" required>Day</FormLabel>
                                    <RadioGroup
                                        onChange={onChangeDay}
                                        value={day}>
                                        <FormControlLabel value="60" control={<Radio color="primary"/>} label="60 Days" />
                                        <FormControlLabel value="90" control={<Radio color="primary"/>} label="90 Days" />
                                    </RadioGroup>
                                </FormControl>
                                :  <FormControl component="fieldset" required>
                                    <FormLabel component="legend"><Text  keyWord={'days'} /></FormLabel>
                                    <RadioGroup
                                        onChange={onChangeDay}
                                        value={day}>
                                        <FormControlLabel value="30" control={<Radio color="primary"/>} label="30"/> 
                                        <FormControlLabel value="60" control={<Radio color="primary"/>} label="60"/>
                                        <FormControlLabel value="90" control={<Radio color="primary"/>} label="90"/>
                                    </RadioGroup>
                                </FormControl>
                            }
                            {state.dayInputErr && 
                                <Typography color={'error'} gutterBottom noWrap>Please choose days.</Typography>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


const Confirm =  ({ user, state }) => {
    return (
            <Grid container>
                <Grid item xs={2} >
                    <Typography variant="headline" align="left" gutterBottom>
                        <Text  keyWord={'YourAddress'} />    
                    </Typography>
                </Grid>
                <Grid item xs={10} >
                    <Typography variant="headline" align="left" gutterBottom>
                        {user.info.address}        
                    </Typography> 
                </Grid>
                <Grid item xs={2} >
                    <Typography variant="headline" align="left" gutterBottom>
                    <Text  keyWord={'investment'} />
                    </Typography> 
                </Grid>
                <Grid item xs={10} >
                    <Typography variant="headline" align="left" gutterBottom>
                        {state.bcst} BSCT         
                    </Typography> 
                </Grid>
                <Grid item xs={2} >
                    <Typography variant="headline" align="left" gutterBottom>
                        Period
                    </Typography> 
                </Grid>
                <Grid item xs={10} >
                    <Typography variant="headline" align="left" gutterBottom>
                        {state.day} <Text  keyWord={'days'} />  
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
        isloadding: false,
        bcstInputErr: false,
        bcst: 0,
        dayInputErr: false,
        day: 0,
    }

    handleNext = () => {
        switch (this.state.activeStep) {
            case 1:
                const validator = Joi.number().min(10001).max(this.props.user.bcst)
                const result = Joi.validate(this.state.bcst, validator)

                if(!!result.error) {
                    this.setState({ bcstInputErr: true })
                }
                else {
                    this.setState({
                        bcstInputErr: false, 
                        activeStep: this.state.activeStep + 1})
                }
                break
            case 2:
                if(!!!this.state.day) {
                    this.setState({ dayInputErr: true })
                }
                else {
                    this.setState({
                        dayInputErr: false, 
                        activeStep: this.state.activeStep + 1})
                }
                break
            default:
                this.setState({ activeStep: this.state.activeStep + 1 })
                break
        } 
    }

    handleBack = () => this.setState({
        activeStep: this.state.activeStep - 1
    })

    handleBCST = (e) => {
        this.setState({
            bcst: e.target.value
        })

        const validator = Joi.number().min(10001).max(100000)
        const result = Joi.validate(e.target.value, validator)
        console.log(result)

    }

    handleChange = (e) => {
        this.setState({ day: e.target.value })
    }

    handleConfirm = () => {
        const { investmentActions } = this.props
        investmentActions.onSubmitInvestment(this.state.bcst, this.state.day)
        this.setState({ isloadding: true })
    }
    
    render() {
        const steps = getSteps()
        const { classes, user } = this.props
        const { activeStep } = this.state
        const Component = steps[activeStep].component
        return (
            <Paper elevation={2}>
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
                    <Grid item xs={12} className={classes.stepContainer} >
                        <Component
                            classes={classes}
                            user={user}
                            state={this.state}
                            onChangeBCST={this.handleBCST}
                            onChangeDay={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12} className={classes.btnContainer} >
                        <Grid container justify="center">
                            <Grid item>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}>
                                    <Text keyWord={'back'}/>
                                </Button>
                                {activeStep === steps.length - 1 
                                    ? <Button
                                        disabled={this.state.isloadding}
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
                                        <Text keyWord={'next'}/>
                                    </Button>
                                }
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
