import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Text from '../../languages'


const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
})


class ModalWithdrawTo extends React.Component {

    state = {
        open: false
    }
    
    handleOpen = () => {
        this.setState({ open: true })
    }
    
    handleClose = () => {
        this.setState({ open: false })
    }

    handleEnter = () => {
        const { onEnter } = this.props
        const address = this.inputAddress.value
        const amount = this.inputAmount.value
        onEnter(address, amount)
        this.setState({ open: false })
    }

    render() {
        const { classes, disabled=false } = this.props
        return (
            <div>
                <Button
                    disabled={disabled}
                    variant="contained"
                    color="primary"
                    onClick={this.handleOpen}>
                    <Text keyWord={'withdrawToAddress'} />
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div className={classes.paper}>
                        <Text keyWord={'withdrawTo'} />
                        <TextField
                            label={<Text keyWord={'addressTransfer'} />}
                            placeholder="eg. 0x8267bc95786355106d56b28a172b1af30d8cf7a7"
                            className={classes.textField}
                            inputRef={ref1 => this.inputAddress = ref1}
                            margin="normal"
                            fullWidth/>
                        <TextField
                            label={<Text keyWord={'amount'} />}
                            placeholder="BCST"
                            className={classes.textField}
                            inputRef={ref2 => this.inputAmount = ref2}
                            margin="normal"
                            fullWidth/>
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <Button
                                    onClick={this.handleEnter}
                                    className={classes.button}
                                    variant="contained" 
                                    color="primary">
                                    <Text keyWord={'enter'}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
            </div>
        )
    }
}


export default withStyles(styles)(ModalWithdrawTo)