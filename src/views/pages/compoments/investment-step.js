import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'


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
    }
})

const CheckYouAddressStep = ({ user }) => {
    return (
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="headline" align="center" gutterBottom>
                    {user.info.address}
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
                {state.bcst}
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

const ChooseDay = ({ user, state }) => {
    return (
        <Grid container>
            <Grid item xs={12} >
                <Grid container justify="center">
                    <Grid item >
                        <TextField
                        label="BCST amount"
                        margin="normal"/>
                    </Grid>
                </Grid>
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
            component: CheckYouAddressStep
        },
    ]
}


class InvestmentStep extends React.Component {
    state = {
        activeStep: 0,
        bcst: 0
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
    }

    handleConfirm = () => {
        console.log('!!!actions sand to smartcontract')
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
                        onChangeBCST={this.handleBCST}/>
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
                    </ Grid>
                </Grid>

            </Grid>
        )
    }
}


const mapStateToProps = state => ({
    user: state.duck.user
})

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(InvestmentStep))
