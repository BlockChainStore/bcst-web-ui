import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import userActions from '../../ducks/user/actions'
import Text from '../languages'
import Joi from 'joi'
import { decrypt } from '../../ethereum/utils'

const styles = theme => ({
    inputFile: {
        marginTop: theme.spacing.unit * 2,
        paddingTop: 6,
        paddingBottom: 8        
    },
    passwordBlock: {
        marginTop: theme.spacing.unit * 6
    },
    button: {
        margin: theme.spacing.unit,
    },
    progress: {
        position: 'absolute'
    }
})


class KeystoreBlock extends React.Component {

    state = {
        isDataErr: false,
        jsonData: null,
        isPasswordErr: false,
        showPassword: false,
        isProcessing: false
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    handleChooesFile = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        const keystoreSchema = Joi.object().keys({
            version: Joi.number().valid(3),
            id: Joi.string().required(),
            address: Joi.string().required(),
            crypto: Joi.object().keys({
                ciphertext: Joi.string().required(),
                cipherparams: Joi.object().keys({
                    iv: Joi.string().required()
                }),
                cipher: Joi.string().required(),
                kdf: Joi.string().required(),
                kdfparams: Joi.object().keys({
                    dklen: Joi.number().required(),
                    salt: Joi.string().required(),
                    n: Joi.number().required(),
                    r: Joi.number().required(),
                    p: Joi.number().required(),
                }),
                mac: Joi.string().required()
            })
        })

        reader.onloadend = (evt) => {
            if (evt.target.readyState == FileReader.DONE) {
                const data = evt.target.result
                try {
                    const jsonData = JSON.parse(data)
                    const result = Joi.validate(jsonData, keystoreSchema)
                    if(!!!result.error) {
                        this.setState({ jsonData: jsonData, isDataErr: false })
                    } 
                    else {
                        this.setState({ isDataErr: true })
                    }
                } catch (e) {
                    this.setState({ isDataErr: true })
                }
            }
        }

        reader.readAsText(file)

    }

    handleEnterPrivateKey = () => {
        
        const password = this.inputPassword.value
        // this.state.jsonData
        let isPasswordCorrent = true;
        let pk;
        console.log(password)
        // call web3 then isPasswordCorrent
        try{
            pk = decrypt(this.state.jsonData, password).privateKey
        }
        catch(e){
            isPasswordCorrent=false
        }
        console.log(isPasswordCorrent)
        console.log(pk[2,pk.length])
        


        if (isPasswordCorrent) {
            this.props.handleUnlockWallet(pk)
            this.setState({ isProcessing: true, isPasswordErr: false})
        } 
        else {
            this.setState({ isProcessing: false, isPasswordErr: true})
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <div>
                    <Typography variant="title">
                        Please choose your wallet file.
                    </Typography>
                    <FormControl fullWidth>
                        <Input
                            type="file"
                            onChange={this.handleChooesFile}
                            className={classes.inputFile}
                            error={this.state.isDataErr}
                            disabled={this.state.isProcessing}
                            fullWidth/>
                        {this.state.isDataErr && 
                            <FormHelperText error>
                                Wallet is not in JSON format
                            </FormHelperText>}
                    </FormControl>
                </div>
                    
                {!this.state.isDataErr &&  !!this.state.jsonData &&
                    <div className={classes.passwordBlock}>
                        <Typography variant="title">
                            Your wallet is encrypted. Please enter the password.
                        </Typography>
                        <FormControl 
                            fullWidth>
                            <InputLabel>Password</InputLabel>
                            <Input
                                inputRef={ref => this.inputPassword = ref}
                                type={this.state.showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.handleClickShowPassword}>
                                            {this.state.showPassword 
                                                ? <VisibilityOff /> 
                                                : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                disabled={this.state.isProcessing}
                                fullWidth/>
                            {this.state.isPasswordErr && 
                                <FormHelperText error>
                                    Wrong password
                                </FormHelperText>}
                        </FormControl>
                        <Grid container justify='flex-end'>
                            <Grid item className={classes.modalButton}>
                                <Button
                                    onClick={this.handleEnterPrivateKey}
                                    className={classes.button}
                                    disabled={this.state.isProcessing}
                                    variant="contained" 
                                    color="primary">
                                    {this.state.isProcessing && 
                                        <CircularProgress size={25} className={classes.progress} />}
                                    <Text  keyWord={'enter'}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </div>}
            </div>
        )
    }

}


export default withStyles(styles)(KeystoreBlock)
