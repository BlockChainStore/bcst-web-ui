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
import { LinearProgress } from '../compoments/progress'
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
    warning: {
        color: '#f44336'
    },
    
})


const CheckYouAddressStep = ({ user , classes }) => {
    return (
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="headline" align="center" >
                    <Text keyWord={'makeSure'}/>{user.info.address}
                </Typography> 
                <Typography variant="subheading" align="center" className={classes.warning}>
                    <Text keyWord={'waringEth'} />
                    
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
                    <Text keyWord={'youHave'} /> {user.bcst} bcst
                </Typography>
            </Grid>
            <Grid item xs={6} lg={4} >
                <TextField
                    error={state.bcstInputErr}
                    helperText={state.bcstInputErr && <Text keyWord={'enterBcst'} />}
                    value={state.bcst}
                    onChange={onChangeBCST}
                    label={<Text keyWord={'bcstAmount'} />}
                    margin="normal"
                    fullWidth/>
            </Grid>
        </Grid>
    )
}


const ChooseDay = ({ user, onChangeDay, state }) => {
    const day = state.day.toString() //dayInputErr

    const day30 = <Text  keyWord={'numbDays'} params={{days:'30'}}/> 
    const day60 = <Text  keyWord={'numbDays'} params={{days:'60'}}/> 
    const day90 = <Text  keyWord={'numbDays'} params={{days:'90'}}/> 
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
                                        <FormControlLabel value="30" control={<Radio color="primary"/>} label={day30}/> 
                                        <FormControlLabel value="60" control={<Radio color="primary"/>} label={day60}/>
                                        <FormControlLabel value="90" control={<Radio color="primary"/>} label={day90}/>
                                    </RadioGroup>
                                </FormControl>
                            }
                            {state.dayInputErr && 
                                <Typography color={'error'} gutterBottom noWrap><Text keyWord={'pleaseChooseDay'} /></Typography>}
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
                        <Text  keyWord={'yourAddress'} />    
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
                    <Text  keyWord={'period'} />
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
            title:<Text keyWord={'checkAddress'} />,
            component: CheckYouAddressStep },
        { 
            title: <Text keyWord={'chooseBcst'} />,
            component: ChooseBCST
        },
        { 
            title: <Text keyWord={'chooseDay'} />,
            component: ChooseDay
        },
        { 
            title: <Text keyWord={'summary'} />,
            component: Confirm
        },
    ]
}


class InvestmentStep extends React.Component {
    state = {
        activeStep: 0,
        bcstInputErr: false,
        bcst: 0,
        dayInputErr: false,
        day: 0,
    }

    handleNext = () => {
   
        switch (this.state.activeStep) {
            case 1:
                const validator = Joi.number().min(10001).max(300000)
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

        const validator = Joi.number().min(10001).max(300000)
        const result = Joi.validate(e.target.value, validator)
        console.log(result)

    }

    handleChange = (e) => {
        this.setState({ day: e.target.value })
    }

    handleConfirm = () => {
        const { investmentActions } = this.props
        investmentActions.onSubmitInvestment(this.state.bcst, this.state.day)

    }
    
    render() {
        const steps = getSteps()
        const { classes, user, common } = this.props
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
                                        disabled={common.sendTransaction.loading}
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleConfirm}
                                        className={classes.button}>
                                        <Text keyWord={'confirm'}/>
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

                    {common.sendTransaction.loading &&
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
    investment: state.duck.investment,
    common: state.common
})

const mapDispatchToProps = dispatch => ({
    investmentActions: bindActionCreators(investmentActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(InvestmentStep))
