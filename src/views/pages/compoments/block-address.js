import React from 'react'
import { connect } from 'react-redux'
import FileSaver from 'file-saver'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import DialogTitle from '@material-ui/core/DialogTitle'
import Text from '../../languages'
import eth from '../../../ethereum'



const styles = theme => ({
	wordBreak: {
		wordBreak: 'break-all'
	},
	container: {
		padding: theme.spacing.unit,
	},
	buttomContainer: {
		padding: theme.spacing.unit,
		borderTop: `1px solid ${theme.palette.grey[400]}`
	},
	extendedIcon: {
        marginLeft: theme.spacing.unit,
	},
	privateKeyText: {
		width: 550,
		fontSize: 15
	},
	wordWrapText: {
		wordWrap: 'break-word'
	},
	boldText: {
		fontWeight: 'bold',
	}
})


class BlockCurrency extends React.Component {

	state = {
		privateKeyOpen: false,
		privateKeyCopied: false,
		keystoreOpen: false,
		showPassword: false,
		isShowPK: false,
	}
	
	handlePrivateKeyClickOpen = () => {
		this.setState({ privateKeyOpen: true })
	}

	handleIsTogglePKOpen = () => {
		this.setState({ isShowPK: !this.state.isShowPK })
	}
	
	handlePrivateKeyClose = () => {
		this.setState({ privateKeyOpen: false })
	}

	handleKeystoreClickOpen = () => {
		this.setState({ keystoreOpen: true })
	}
	
	handleKeystoreClose = () => {
		this.setState({ keystoreOpen: false })
	}

	handlePrivateKeyCopyToClipboard = () => {
		this.privateKey.select()
		document.execCommand('copy')
		this.privateKey.blur()
		this.setState({ privateKeyCopied: true })
	}

	handlePrivateKeyDownloadFile = () => {
		const { user } = this.props
		const file = new File(
			[this.privateKey.value], 
			{ type: "text/plain;charset=utf-8" }
		)
		FileSaver.saveAs(file, `private key - ${user.info.address}.backup`)
	}

	handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
	}
	
	handleKeystoreDownload = () => {
		const { user } = this.props
		const password = this.inputPassword.value
		const encryptData = eth.accounts.encrypt(user.info.privateKey, password)
		const file = new File(
            [JSON.stringify(encryptData)], 
            { type: "text/plain;charset=utf-8" }
        )
        FileSaver.saveAs(file, `${new Date().toUTCString()}-${user.info.address}.backup`)
	}



	render() {
		const { classes, user } = this.props

		return (
			<Paper square>
				<Grid container>
					<Grid item xs={12} className={classes.container}>
						<Typography variant="headline" align="center" gutterBottom>
							<Text  keyWord={'yourAddress'} />
						</Typography>
						<Typography
							color="textSecondary" 
							align="center" 
							className={classes.wordBreak} 
							gutterBottom>
							{user.info.address}
						</Typography>
					</Grid>
					<Grid item xs={12} className={classes.buttomContainer}>
						<Grid container justify="space-around" >
							<Grid item>
								<Button 
									size="small"
									color="primary"
									onClick={this.handlePrivateKeyClickOpen}>
									Backup wellet as private Key
									<VpnKeyIcon className={classes.extendedIcon} />
								</Button>
								<Dialog
									open={this.state.privateKeyOpen}
									onClose={this.handlePrivateKeyClose}>
									<DialogTitle>Backup wellet as private Key</DialogTitle>
									<DialogContent>
										<Typography  variant="subheading" gutterBottom className={classes.boldText}>
											<Text keyWord={'waringShowPK1'} />
										</Typography>
										<Typography variant="subheading" gutterBottom className={classes.preText}>
											<Text keyWord={'waringShowPK2_1'} />
										</Typography>
										<Typography variant="subheading" gutterBottom className={classes.preText}>
											<Text keyWord={'waringShowPK2_2'} />
										</Typography>
										<Typography variant="subheading" gutterBottom className={classes.boldText}>
											<Text keyWord={'waringShowPK3'} />
										</Typography>
										<Typography variant="subheading" gutterBottom className={classes.preText}>
											<Text keyWord={'waringShowPK4_1'} />
										</Typography>
										<Typography variant="subheading" gutterBottom className={classes.preText}>
											<Text keyWord={'waringShowPK4_2'} />
										</Typography>
										<Grid container justify='center'>
                    						<Grid item>
												<Button 
													variant="contained" 
													color="primary"
													className={classes.button}
													onClick={this.handleIsTogglePKOpen}>
													{this.state.isShowPK
													? 'HIDE' 
													: 'SHOW'}
												</Button>
											</Grid>
										</Grid>
										{this.state.isShowPK && 
										<div>
										<Typography variant="subheading" gutterBottom>
											<Text keyWord={'yourPK'} />
										</Typography>
										<Input
											value={user.info.privateKey}
											inputRef={ref => this.privateKey = ref}
											className={classes.privateKeyText}/>
										</div>}
									</DialogContent>
									{this.state.isShowPK && 
									<DialogActions>
										<Button
											onClick={this.handlePrivateKeyCopyToClipboard} 
											color="primary">
											{this.state.privateKeyCopied ? 'copied' : 'Copy'} to clipboard
										</Button>
										<Button onClick={this.handlePrivateKeyDownloadFile} color="primary" autoFocus>
											Download as file
										</Button>
									</DialogActions>}
								</Dialog>
							</Grid>
							<Grid item>
								<Button 
									size="small"
									color="primary"
									onClick={this.handleKeystoreClickOpen}>
									Backup wellet as keystore
									<InsertDriveFileIcon className={classes.extendedIcon} />
								</Button>
								<Dialog
									open={this.state.keystoreOpen}
									onClose={this.handleKeystoreClose}>
									<DialogTitle>Backup wellet as keystore</DialogTitle>
									<DialogContent>
										<FormControl fullWidth>
											<InputLabel><Text keyWord={'enterPW'} /></InputLabel>
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
												fullWidth
												autoFocus/>
										</FormControl>
									</DialogContent>
									<DialogActions>
										<Button onClick={this.handleKeystoreDownload} color="primary" >
											Download
										</Button>
									</DialogActions>
								</Dialog>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		)

	}
}

const mapStateToProps = state => ({
    user: state.duck.user
})

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(BlockCurrency))