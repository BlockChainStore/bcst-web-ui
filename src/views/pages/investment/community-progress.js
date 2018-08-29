import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import NavigationIcon from '@material-ui/icons/Navigation'
import { LinearProgress } from '../compoments/progress'
import ModalWithdrawTo from '../compoments/modal-withdraw-to'
import investmentActions from '../../../ducks/investment/actions'
import Text from '../../languages'


const CustomTableCell = withStyles(theme => ({
    head: {
        color: theme.palette.common.black,
        textAlign: 'center',
        fontSize: 14,
    },
    body: {
        fontSize: 12,
        textAlign: 'center',
    }
}))(TableCell)


const styles = theme => ({
    btnContainer: {
        margin: theme.spacing.unit
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttonDeposit: {
        marginBottom: 4
    },
    containerHeader: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2
    },
    headerText: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    progress: {
        position: 'absolute'
    },
    linearProgress: {
        position: 'absolute',
        width: '100%',
        bottom: 0
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    }
})


const DateFormat = (props) => {
    const { secondLeft } = props
    const secondLeftDays = parseInt(secondLeft / ( 60 * 60 * 24) , 10)
    const secondLeftHrs = Math.ceil((secondLeft / ( 60 * 60)) % 24 , 10)
    return (
        <span> 
            {secondLeftDays === 0
                ? <Text keyWord={'hoursLeft'} params={{ hours: secondLeftHrs }}/> 
                : <Text keyWord={'daysAndHoursLeft'} params={{
                    days: secondLeftDays,
                    hours: secondLeftHrs}}/>}
        </span>
    )
}


class InvestmentProgress extends React.Component {

    state = {
        open: false
    }
    
    handleOpen = () => {
        this.setState({ open: true })
    }
    
    handleClose = () => {
        this.setState({ open: false })
    }

    handleWithdraw = () => {
        const { investmentActions } = this.props
        investmentActions.withdrawCommunityInvestment()
    }

    handleWithdrawTo = (address, amount) => {
        const { investmentActions } = this.props
        investmentActions.withdrawCommunityInvestment(address, amount)
    }

    handleOnAddOn = () => {
        const amount = this.inputAddOn.value
        const { investmentActions } = this.props
        investmentActions.onAddonCommunityInvestment(amount)
    }

    render() {
        const { classes, investment, common } = this.props 
        const investmentData = [
            {principle: 30000, return: 30010, timeLeft: 635465, dateDeposit: 1000},
            {principle: 30000, return: 30010, timeLeft: 321232, dateDeposit: 1000},
            {principle: 30000, return: 30010, timeLeft: 20000, dateDeposit: 1000},
            {principle: 30000, return: 30010, timeLeft: 12312, dateDeposit: 1000},
            {principle: 30000, return: 30010, timeLeft: 1000, dateDeposit: 1000},
        ]
        const firstSecondLeft = '0'
        const isloadding = common.sendTransaction.loading 
            && ( common.sendTransaction.name === 'WITHDRAW_COMMUNITY_INVESTMENT' 
                || common.sendTransaction.name === 'ADDON_COMMUNITY_INVESTMENT')

        return (
            <Grid container justify="center">
            
                <Grid item xs={12} md={11}>
                    <Grid container justify="center" className={classes.containerHeader}>
                        <Grid item xs={12}>
                            <Typography variant="display1" align="center" className={classes.headerText}>
                                Packet {investment.community.packetDay} days
                            </Typography>
                            <Typography variant="headline" align="center">
                                Annualized {investment.community.annualized}%
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth >
                                <InputLabel htmlFor="input-deposit">
                                    Enter add-on community investment
                                </InputLabel>
                                <Input
                                    id="input-deposit"
                                    inputRef={ref => this.inputAddOn = ref}
                                    disabled={isloadding}
                                    endAdornment={
                                        <Button
                                            className={classes.buttonDeposit}
                                            variant="extendedFab" 
                                            color="primary"
                                            disabled={isloadding}
                                            onClick={this.handleOnAddOn}>
                                            <NavigationIcon 
                                                className={classes.extendedIcon} />
                                            Deposit
                                        </Button>
                                    }
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Principle</CustomTableCell>
                                <CustomTableCell>Return</CustomTableCell>
                                <CustomTableCell>Date Deposit</CustomTableCell>
                                <CustomTableCell>Time Left</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {investmentData.map((item, i) => (
                                <TableRow key={i} >
                                    <CustomTableCell component="th" scope="row">{item.principle}</CustomTableCell>
                                    <CustomTableCell>{item.return}</CustomTableCell>
                                    <CustomTableCell>{item.dateDeposit}</CustomTableCell>
                                    <CustomTableCell><DateFormat secondLeft={item.timeLeft}/></CustomTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={12} className={classes.btnContainer}>
                    <Typography variant="subheading" align="center" color="error">
                        <Text keyWord={'waringEth'} />
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.btnContainer}>
                    <Grid container justify="center">
                        <Grid item>
                            <Button
                                disabled={isloadding}
                                variant="contained"
                                color="primary"
                                onClick={this.handleWithdraw}>
                                {firstSecondLeft !== '0'
                                    ? <DateFormat secondLeft={firstSecondLeft}/>
                                    : <Text keyWord={'withdraw'} />}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.btnContainer}>
                    <Grid container justify="center">
                        <Grid item>    
                            {firstSecondLeft === '0' &&
                                <ModalWithdrawTo
                                    disabled={isloadding}
                                    onEnter={this.handleWithdrawTo} />}
                        </Grid>
                    </Grid>
                </Grid>
                {isloadding && 
                    <div className={classes.linearProgress} >
                        <LinearProgress />
                    </div>}
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    investment: state.duck.investment,
    common: state.common
})

const mapDispatchToProps = dispatch => ({
    investmentActions: bindActionCreators(investmentActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(InvestmentProgress))