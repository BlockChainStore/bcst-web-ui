import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FileSaver from 'file-saver'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import CloudDownload from '@material-ui/icons/CloudDownload'
import eth from '../../ethereum/'
import Text from '../languages'


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    buttonBackup: {
        marginTop: theme.spacing.unit
    },
    iconCloudDownload: {
        marginLeft: 8,
        marginRight: 8
    },
    downloadKeystoreBlock: {
        marginTop: theme.spacing.unit * 3
    }
})


class NewWalletBlock extends React.Component {

    state = {
        showPassword: false,
        isInputDisable: false,
        address: null,
        jsonData: null
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    handleCreateWallet = () => {
        const wallet = eth.accounts.create()
        const address = wallet.address
        const inputPassword = this.inputPassword.value
        const encryptData = eth.accounts.encrypt(wallet.privateKey, inputPassword)
        this.setState({ isInputDisable: true, address: address, jsonData: encryptData})
    }

    handleDownloadKeystore = () => {
        const file = new File(
            [JSON.stringify(this.state.jsonData)], 
            { type: "text/plain;charset=utf-8" }
        )
        FileSaver.saveAs(file, `${new Date().toUTCString()}-${this.state.address}.backup`)
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Typography variant="title">
                    Create new wallet
                </Typography>

                <FormControl 
                    fullWidth>
                    <InputLabel>Enter a password</InputLabel>
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
                            </InputAdornment>}
                        disabled={this.state.isInputDisable}
                        fullWidth/>
                </FormControl>
                <Grid container justify='center'>
                    <Grid item className={classes.modalButton}>
                        <Button
                            onClick={this.handleCreateWallet}
                            className={classes.button}
                            disabled={this.state.isInputDisable}
                            variant="contained" 
                            color="primary">
                            Create
                        </Button>
                    </Grid>
                </Grid>

                {!!this.state.address &&
                    <div className={classes.downloadKeystoreBlock}>
                        <Typography color="secondary" align="center">
                            **Do not lose it!** It cannot be recovered if you lose it.
                        </Typography>
                        <Typography color="secondary" align="center">
                            **Do not share it!** Your funds will be stolen if you use this file on a malicious/phishing site.
                        </Typography>
                        <Typography color="secondary" align="center">
                            **Make a backup!** Secure it like the millions of dollars it may one day be worth.
                        </Typography>
                        <Button
                            onClick={this.handleDownloadKeystore}
                            className={classes.buttonBackup}
                            variant="extendedFab"
                            size="large"
                            color="primary"
                            fullWidth>
                            Download Keystore File 
                            <CloudDownload className={classes.iconCloudDownload} />
                        </Button>
                    </div>}
            </div>
        )
    }

}


export default withStyles(styles)(NewWalletBlock)
