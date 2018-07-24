import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { inherits } from 'util'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import userActions from '../../ducks/user/actions'


const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    modalButton: {
        marginTop: 15
    },
    headerButton: {
        marginRight: 10
    }
})


class SimpleModal extends React.Component {
    state = {
        open: false,
        inputErr : false
    }

    handleOpen = () => this.setState({ ...this.state, open: true })

    handleClose = () => this.setState({ ...this.state, open: false })

    handleUnlockWallet = () => {
        const inputPk = this.inputPk.value
        const validator = /^0x[a-f0-9]{64}$/g
        if (validator.test(inputPk)) {
            this.props.userActions.onUnlockWallet(inputPk)
            this.setState({ ...this.state, inputErr: false })
        } 
        else {
            this.setState({ ...this.state, inputErr: true })
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Button 
                    className={classes.headerButton}  
                    onClick={this.handleOpen}  
                    color="inherit" >
                    UNLOCK WALLET
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            Please Enter Your Private Key
                        </Typography>
                        <TextField
                            error={this.state.inputErr}
                            label="Your private key"
                            placeholder="etc. 0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709"
                            helperText={this.state.inputErr ? 'Please enter a correct your private key.' : ''}
                            margin="normal"
                            inputRef={ref => this.inputPk = ref}
                            fullWidth/>
                        <Grid container justify='flex-end'>
                            <Grid item className={classes.modalButton}>
                                <Button
                                    onClick={this.handleUnlockWallet}
                                    className={classes.button}
                                    variant="contained" 
                                    color="primary">
                                    Enter
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(SimpleModal))