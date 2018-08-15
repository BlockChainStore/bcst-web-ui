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
import PrivateKeyBlock from './unlock-walltet-private-key'


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
    }
})


class UnlockWallet extends React.Component {
    state = { open: false }

    handleOpen = () => this.setState({ ...this.state, open: true })

    handleClose = () => this.setState({ ...this.state, open: false })

    handleUnlockWallet = (privateKey) => {
        this.props.userActions.onUnlockWallet(privateKey)
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
                        <PrivateKeyBlock handleUnlockWallet={this.handleUnlockWallet}/>
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
)(withStyles(styles)(UnlockWallet))
