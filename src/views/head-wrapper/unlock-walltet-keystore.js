import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import Text from '../languages'
import Joi from 'joi'
import eth from '../../ethereum/'


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
            if (evt.target.readyState === FileReader.DONE) {
                const data = evt.target.result
                try {
                    const jsonData = JSON.parse(data.toLowerCase())
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
        let isPasswordCorrent = true
        let privateKey = null
        try {
            privateKey = eth.accounts.decrypt(this.state.jsonData, password).privateKey
        }
        catch(e){
            isPasswordCorrent = false
        }

        if (isPasswordCorrent) {
            this.props.handleUnlockWallet(privateKey)
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
                        <Text keyWord={'chooseKeystore'} />
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
                                <Text keyWord={'wrongJson'} />
                            </FormHelperText>}
                    </FormControl>
                </div>
                    
                {!this.state.isDataErr &&  !!this.state.jsonData &&
                    <div className={classes.passwordBlock}>
                        <Typography variant="title">
                            <Text keyWord={'passForEn'} />
                        </Typography>
                        <FormControl 
                            fullWidth>
                            <InputLabel><Text keyWord={'password'} /></InputLabel>
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
                                    <Text keyWord={'wrongPassword'} />
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
