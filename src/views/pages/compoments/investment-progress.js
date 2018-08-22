import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { LinearProgress } from './progress'
import investmentActions from '../../../ducks/investment/actions'
import Text from '../../languages'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'


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
    infoContainer: {
        backgroundColor: '#fff',
        padding: theme.spacing.unit * 3,
    },
    btnContainer: {

    },
    principleText: {
        fontWeight: 'bold'
    },
    row: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        
        },
    },
    cell: {
        // backgroundColor: theme.palette.primary.light,
        // color: theme.palette.common.white,

    },
    table: {
        marginTop: 50,
        maxWidth: 400,
        overflowY: 'hidden',
        overflowX: 'auto',
        marginBottom: 30
    },
})




class InvestmentProgress extends React.Component {

    state = {
        isloadding: false
    }

    handleWithdraw = () => {
        const { investmentActions } = this.props
        this.setState({ isloadding: true })
        investmentActions.withdrawInvestment()
    }

    componentDidMount() {
        
        const lowwerSymbol = 'bcst_cnyt'
        const corsURL = 'https://cors-anywhere.herokuapp.com/'
        const klinesApi = 'https://api.exx.com/data/v1/klines?'
        const klinesParam = `market=${lowwerSymbol}&type=1day&size=1`
        const klinesUri = corsURL + klinesApi + klinesParam
        const headers = { 'X-Requested-With': 'XMLHttpRequest' }
        try {
        axios.get(klinesUri, { headers })
        .then(klinesRes => klinesRes.data)
        .then(klinesRes => {
            let options = null
            let ticker = null
            let rateNow = null
            
                const lastTicker = klinesRes.datas.data[klinesRes.datas.data.length - 1]
                console.log('nowww '+lastTicker)
                rateNow = lastTicker[2]
            
            this.setState({ options, ticker, rateNow })
        })} catch (error) {
            console.log('[klines res error]', klinesUri)
        }
    }


    render() {
        const { classes, investment } = this.props
        const annualized = investment.info.annualized/10+'%'
        const secondLeftDays = parseInt(investment.info.secondLeft / ( 60 * 60 * 24) , 10)
        const secondLeftHrs = Math.ceil((investment.info.secondLeft / ( 60 * 60)) % 24 , 10)
        const packetDay = investment.info.packetDay
        const depositDay= packetDay-secondLeftDays
        const principle = investment.info.principle / Math.pow(10, 8)
        const invest = (((principle * investment.info.annualized * packetDay / 365000)) * depositDay / packetDay).toFixed(8)
        const sum = parseFloat(principle) + parseFloat(invest)
        const timeStamp1 = investment.info.rateCNYdeposit
        const rateNow1 = this.state.rateNow
        const DateFormat = () => (
            <span> 
                {secondLeftDays === 0
                ? <Text  keyWord={'hoursLeft'} params={{hours:secondLeftHrs}}/> 
                :<Text  keyWord={'daysAndHoursLeft'} params={{days:secondLeftDays,hours:secondLeftHrs}}/>}
            </span>
            )
        console.log('rateNow1 ' + rateNow1)
        return (
            <Paper elevation={2}>
                <Grid container justify="center">
                    <Grid item xs={12} className={classes.table}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>{investment.info.secondLeft !== '0'  ? <Text keyWord={'statusPending'} /> : <Text keyWord={'statusReady'} />}</CustomTableCell>
                                </TableRow>
                            </TableHead>
                        </Table >
                        <Table >
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
                    <Grid item xs={12} className={classes.btnContainer} >
                        <Grid container justify="center">
                            <Grid item>
                                <Button
                                    disabled={this.state.isloadding || investment.info.secondLeft !== '0'}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleWithdraw}>
                                    {investment.info.secondLeft !== '0'
                                        ? <DateFormat />
                                        : <Text keyWord={'withdraw'} />}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {this.state.isloadding &&
                        <Grid item xs={12} >
                            <LinearProgress />
                        </Grid>}
                </Grid>
            </Paper>
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