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


class PrivateKeyBlock extends React.Component {

    state = {
        isInputErr: false,
        isInputDisable: false
    }

    handleEnterPrivateKey = () => {
        const inputPk = this.inputPk.value
        const validator = /^0x[a-f0-9]{64}$/g
        if (validator.test(inputPk)) {
            this.props.handleUnlockWallet(inputPk)
            this.setState({ isInputErr: false, isInputDisable: true })
        } 
        else {
            this.setState({ isInputErr: true })
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Typography variant="title">
                    <Text  keyWord={'enterPk'}/>
                </Typography>
                <TextField
                    onKeyPress={(e) => {
                        if(e.key === 'Enter') {
                            this.handleEnterPrivateKey()
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
                            onClick={this.handleEnterPrivateKey}
                            className={classes.button}
                            variant="contained" 
                            color="primary">
                            CREATE WALLET
                        </Button>
                        <Button
                            onClick={this.handleEnterPrivateKey}
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
        )
    }

}


export default withStyles(styles)(PrivateKeyBlock)
