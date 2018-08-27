import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { LinearProgress } from '../compoments/progress'
import investmentActions from '../../../ducks/investment/actions'
import Text from '../../languages'


const getModalStyle = () => {
    const top = 50
    const left = 50
  
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        textAlign: 'center',
        fontSize: 14,
    },
    body: {
        fontSize: 12,
        textAlign: 'center',
        
    },
}))(TableCell)


const styles = theme => ({
    btnContainer: {
        margin: theme.spacing.unit * 3,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    },
    progress: {
        position: 'absolute'
    }
})


class InvestmentProgress extends React.Component {

    state = {
        isloadding: false,
        open: false,
        isInputDisable: false
    }
    
    handleOpen = () => {
        this.setState({ open: true })
    }
    
    handleClose = () => {
        this.setState({ open: false })
    }

    handleWithdraw = () => {
        const { investmentActions } = this.props
        this.setState({ isloadding: true, isInputDisable: true })
        
        investmentActions.withdrawInvestment()
    }

    handleWithdrawTo = () => {
        const { investmentActions } = this.props
        const address = this.inputAddress.value
        const amount = this.inputAmount.value
        this.setState({ isloadding: true, isInputDisable: true })
        investmentActions.withdrawInvestment(address, amount)
    }

    componentDidMount() {
        const lowwerSymbol = 'bcst_cnyt'
        const corsURL = 'https://cors-anywhere.herokuapp.com/'
        const klinesApi = 'https://api.exx.com/data/v1/klines?'
        const klinesParam = `market=${lowwerSymbol}&type=1min&size=1`
        const klinesUri = corsURL + klinesApi + klinesParam
        const headers = { 'X-Requested-With': 'XMLHttpRequest' }
        axios.get(klinesUri, { headers })
		.then(klinesRes => klinesRes.data)
		.then(klinesRes => {
			let rateNow = null
			try {
				const lastTicker = klinesRes.datas.data[klinesRes.datas.data.length - 1]
                rateNow = lastTicker[2]
            } catch (error) {
                 console.log('[klines res error]', klinesUri, klinesRes)
            }
                this.setState({ rateNow })
            })
    }


    render() {
        const { classes, investment } = this.props
        const annualized = investment.personal.annualized / 10 + '%'
        const secondLeftDays = parseInt(investment.personal.secondLeft / ( 60 * 60 * 24) , 10)
        const secondLeftHrs = Math.ceil((investment.personal.secondLeft / ( 60 * 60)) % 24 , 10)
        const packetDay = investment.personal.packetDay
        const depositDay= packetDay-secondLeftDays
        const principle = investment.personal.principle 
        const invest = (((principle * investment.personal.annualized * packetDay / 365000)) * depositDay / packetDay).toFixed(8)
        const sum = parseFloat(principle) + parseFloat(invest)
        const timeStamp1 = investment.personal.rateCNYdeposit
        const rateNow1 = this.state.rateNow
        const DateFormat = () => (
            <span> 
                {secondLeftDays === 0
                    ? <Text  keyWord={'hoursLeft'} params={{hours:secondLeftHrs}}/> 
                    :<Text  keyWord={'daysAndHoursLeft'} params={{days:secondLeftDays,hours:secondLeftHrs}}/>}
            </span>
            )
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={8} >
                    <Table >
                        <TableHead>
                            <TableRow>
                                <CustomTableCell colSpan={2}>
                                    {investment.personal.secondLeft !== '0'  
                                        ? <Text keyWord={'statusPending'} /> 
                                        : <Text keyWord={'statusReady'} />}
                                </CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow className={classes.row} >
                                <CustomTableCell className={classes.cell} component="th" scope="row">
                                    <Text keyWord={'principle'} /> 
                                </CustomTableCell>
                                <CustomTableCell numeric>{principle} BCST</CustomTableCell>
                            </TableRow>
                            <TableRow className={classes.row} >
                                <CustomTableCell className={classes.cell} component="th" scope="row">
                                    <Text keyWord={'logtime'} /> 
                                </CustomTableCell>
                                <CustomTableCell numeric>{depositDay} <Text keyWord={'days'}/> </CustomTableCell>
                            </TableRow>
                            <TableRow className={classes.row} >
                                <CustomTableCell className={classes.cell} component="th" scope="row">
                                    <Text keyWord={'packet'} /> 
                                </CustomTableCell>
                                <CustomTableCell numeric>{packetDay} <Text keyWord={'days'} /></CustomTableCell>
                            </TableRow>
                            <TableRow className={classes.row} >
                                <CustomTableCell className={classes.cell} component="th" scope="row">
                                    <Text keyWord={'annualized'} /> 
                                </CustomTableCell>
                                <CustomTableCell numeric>{annualized}</CustomTableCell>
                            </TableRow>
                            <TableRow className={classes.row} >
                                <CustomTableCell className={classes.cell} component="th" scope="row">
                                    <Text keyWord={'bonusToday'} /> 
                                </CustomTableCell>
                                <CustomTableCell numeric>{invest} BCST </CustomTableCell>
                            </TableRow>
                            <TableRow className={classes.row} >
                                <CustomTableCell className={classes.cell} component="th" scope="row">
                                    <Text keyWord={'totalToday'} /> 
                                </CustomTableCell>
                                <CustomTableCell numeric>{sum} BCST</CustomTableCell>
                            </TableRow>
                            <TableRow className={classes.row} >
                                <CustomTableCell className={classes.cell} component="th" scope="row">
                                    <Text keyWord={'dateDeposit'} />  
                                </CustomTableCell>
                                <CustomTableCell numeric>≈ {timeStamp1} CNY : 1 BCST</CustomTableCell>
                            </TableRow>
                            <TableRow className={classes.row} >
                                <CustomTableCell className={classes.cell} component="th" scope="row">
                                    <Text keyWord={'now'} />  
                                </CustomTableCell>
                                <CustomTableCell numeric>≈ {rateNow1} CNY : 1 BCST</CustomTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant="subheading" align="center" color="error">
                        <Text keyWord={'waringEth'} />
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.btnContainer}>
                    <Grid container justify="center">
                        <Grid item>
                            <Button
                                disabled={this.state.isloadding || investment.personal.secondLeft !== '0'}
                                variant="contained"
                                color="primary"
                                onClick={this.handleWithdraw}>
                                {investment.personal.secondLeft !== '0'
                                    ? <DateFormat />
                                    : <Text keyWord={'withdraw'} />}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.btnContainer}>
                    <Grid container justify="center">
                        <Grid item>    
                            {investment.personal.secondLeft === '0' &&
                                <div>
                                    <Button
                                        disabled={this.state.isloadding || investment.personal.secondLeft !== '0'}
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleOpen}>
                                        <Text keyWord={'withdrawToAddress'} />
                                    </Button>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.open}
                                        onClose={this.handleClose}>
                                        <div style={getModalStyle()} className={classes.paper}>
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
                                                        onClick={this.handleWithdrawTo}
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
                                </div>}
                        </Grid>
                    </Grid>
                </Grid>
                {this.state.isloadding &&
                    <Grid item xs={12} >
                        <LinearProgress />
                    </Grid>}
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    investment: state.duck.investment
})

const mapDispatchToProps = dispatch => ({
    investmentActions: bindActionCreators(investmentActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(InvestmentProgress))