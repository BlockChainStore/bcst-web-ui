import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Text from '../languages'


const getSteps = () => {
    return [
        <Text keyWord={'whatIsBCST'} />,
        <Text keyWord={'needUnderstand'} />,
        <Text keyWord={'protectPhishers'} />,
        <Text keyWord={'protectLoss'} />
    ]
}

const getStepContent = (step) => {
    switch (step) {
        case 0:
            return <Text keyWord={'desWhatIsBCST'} />
        case 1:
            return <Text keyWord={'desNeedUnderstand'} />
        case 2:
            return <Text keyWord={'desProtectPhishers'} />
        case 3:
            return <Text keyWord={'desProtectLoss'} />
        default:
            return 'Unknown step'
    }
}

const styles = theme => ({
    paper: {
        width: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        maxHeight: 750,
        [theme.breakpoints.up('sm')]: {
            width: '80%'
        },
        [theme.breakpoints.up('md')]: {
            width: '60%'
        },
    },
    preText: {
        whiteSpace: 'pre'
    }
})


class SimpleModal extends React.Component {
    state = {
        open: true,
        activeStep: 0,
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }))
    }

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }))
    }

    handleReset = () => {
        this.setState({
            activeStep: 0,
        })
    }

    render() {
        const { classes } = this.props
        const steps = getSteps()
        const { activeStep } = this.state
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div className={classes.paper}>
                        <div className={classes.root}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                            <StepContent>
                                                <Typography className={classes.preText}>
                                                    {getStepContent(index)}
                                                </Typography>
                                                <div className={classes.actionsContainer}>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={this.handleBack}
                                                        className={classes.button}>
                                                        <Text keyWord={'back'} />
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={activeStep === steps.length - 1 ? this.handleClose : this.handleNext}
                                                        className={classes.button}>
                                                        {activeStep === steps.length - 1 ? <Text keyWord={'confirm'} /> : <Text keyWord={'next'} />}
                                                    </Button>
                                                </div>
                                            </StepContent>
                                        </Step>
                                    )
                                })}
                            </Stepper>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(SimpleModal)