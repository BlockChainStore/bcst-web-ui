import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import userActions from '../../ducks/user/actions'
import Text from '../languages'


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
    button: {
        margin: theme.spacing.unit,
    },
    modalButton: {
        marginTop: 15
    },
    progress: {
        position: 'absolute'
    }
})


class SimpleModal extends React.Component {
    state = {
        open: false,
        isInputErr: false,
        isInputDisable: false
    }

    handleOpen = () => this.setState({ ...this.state, open: true })

    handleClose = () => this.setState({ ...this.state, open: false })

    handleUnlockWallet = () => {
        const inputPk = this.inputPk.value
        const validator = /^0x[a-f0-9]{64}$/g
        if (validator.test(inputPk)) {
            this.props.userActions.onUnlockWallet(inputPk)
            this.setState({ 
                ...this.state, 
                isInputErr: false, 
                isInputDisable: true
            })
        } 
        else {
            this.setState({ ...this.state, isInputErr: true })
        }
    }

    handleUnlockWallet = () => {
        const inputPk = this.inputPk.value
        const validator = /^0x[a-f0-9]{64}$/g
        if (validator.test(inputPk)) {
            this.props.userActions.onUnlockWallet(inputPk)
            this.setState({ 
                ...this.state, 
                isInputErr: false, 
                isInputDisable: true
            })
        } 
        else {
            this.setState({ ...this.state, isInputErr: true })
        }
    }

    render() {
        const { classes, user, userActions } = this.props
        const isUnlockWallet = !!user.info.address
        return (
            <div>
                {isUnlockWallet
                    ? <Button 
                        onClick={userActions.onLogoutWallet}  
                        color="inherit" >
                        <Text keyWord={'logoutWallet'} />             
                    </Button>
                    : <Button 
                        onClick={this.handleOpen}  
                        color="inherit" >
                        <Text  keyWord={'unlockWallet'}/>
                    </Button>}                
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div className={classes.paper}>
                        <Typography variant="title">
                            <Text  keyWord={'enterPk'}/>
                        </Typography>
                        <TextField
                            onKeyPress={(e) => {
                                if(e.key === 'Enter') {
                                    this.handleUnlockWallet()
                                }
                            }}
                            error={this.state.isInputErr}
                            label={<Text  keyWord={'yourPK'}/>}
                            placeholder="eg 0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709"
                            helperText={this.state.isInputErr ? <Text  keyWord={'correctPK'}/> : ''}
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
                                    CREATE WALLET
                                </Button>
                                <Button
                                    onClick={this.handleUnlockWallet}
                                    className={classes.button}
                                    disabled={this.state.isInputDisable}
                                    variant="contained" 
                                    color="primary">
                                    {this.state.isInputDisable && 
                                        <CircularProgress size={25} className={classes.progress} />}
                                    <Text  keyWord={'enter'}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = state => ({
  user: state.duck.user
})

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SimpleModal))
