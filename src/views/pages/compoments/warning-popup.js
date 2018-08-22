import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Text from '../../languages'


function getSteps() {
    return  [<Text keyWord={'whatIsBCST'} />,
            <Text keyWord={'needUnderstand'} />,
            <Text keyWord={'protectPhishers'} />,
            <Text keyWord={'protectLoss'} />]
}
  
function getStepContent(step) {
    switch (step) {
        case 0:
            return  <pre><Text keyWord={'desWhatIsBCST'} /></pre>
        case 1:
            return  <pre><Text keyWord={'desNeedUnderstand'} /></pre>
        case 2:
            return <pre><Text keyWord={'desProtectPhishers'} /></pre>
        case 3:
            return <pre><Text keyWord={'desProtectLoss'} /></pre>
        default:
            return 'Unknown step';
    }
}
  

const styles = theme => ({
    paper: {
        minWidth: 1000,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: 750 
    },
});

class SimpleModal extends React.Component {
  state = {
    open: true,
    activeStep: 0,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <div>
        <Modal 
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
            <div className={classes.paper}>
                <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => {
                    return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                        <Typography>{getStepContent(index)}</Typography>
                        <div className={classes.actionsContainer}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className={classes.button}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick= {activeStep === steps.length - 1 ? this.handleClose : this.handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                        
                        </StepContent>
                    </Step>
                    );
                })}
                </Stepper>
                {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&quot;re finished</Typography>

                </Paper>
                )}
                </div>
            </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;