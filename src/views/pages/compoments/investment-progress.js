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


const styles = theme => ({
    infoContainer: {
        backgroundColor: '#fff',
        padding: theme.spacing.unit * 3,
    },
    btnContainer: {
        padding: theme.spacing.unit * 3,
    },
    principleText: {
        fontWeight: 'bold'
    }
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
		axios.get(klinesUri, { headers })
		.then(klinesRes => klinesRes.data)
		.then(klinesRes => {
			let options = null
            let ticker = null
            let rateNow = null
			try {
				const lastTicker = klinesRes.datas.data[klinesRes.datas.data.length - 1]
                rateNow = lastTicker[2]
			} catch (error) {
				console.log('[klines res error]', klinesUri, klinesRes)
			}
			this.setState({ options, ticker, rateNow })
        })
        
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
                    <Grid item xs={12} className={classes.infoContainer}>
                        <Typography 
                            gutterBottom 
                            align="center" 
                            variant="headline"
                            color='textSecondary'>
                            {investment.info.secondLeft !== '0'  ? <Text keyWord={'statusPending'} /> : <Text keyWord={'statusReady'} />}
                        </Typography>
                        <Typography 
                            variant="display1" 
                            align="center" 
                            color='primary'
                            className={classes.principleText}>
                            <Text keyWord={'principle'} /> {principle} BCST
                        </Typography>
                        <Typography 
                            gutterBottom 
                            align="center" 
                            color='textSecondary' 
                            noWrap>
                            <Text keyWord={'logtime'} /> {depositDay} <Text keyWord={'days'}/>
                        </Typography>
                        <Typography 
                            gutterBottom 
                            align="center" 
                            color='textSecondary' 
                            noWrap>
                            <Text keyWord={'packet'} /> {packetDay} <Text keyWord={'days'} />, <Text keyWord={'annualized'} /> {annualized}
                        </Typography>
                        <Typography 
                            gutterBottom 
                            align="center" 
                            color='textSecondary' 
                            noWrap>
                            <Text keyWord={'bonusToday'} /> {invest} BCST
                        </Typography>
                        <Typography 
                            gutterBottom 
                            align="center" 
                            color='textSecondary' 
                            noWrap>
                            <Text keyWord={'totalToday'} /> {sum} BCST
                        </Typography>
                        <Typography 
                            gutterBottom 
                            align="center" 
                            color='textSecondary' 
                            noWrap>
                            On date deposit ≈ {timeStamp1} CNY : 1 BCST
                        </Typography>
                        <Typography 
                            gutterBottom 
                            align="center" 
                            color='textSecondary' 
                            noWrap>
                            Now ≈ {rateNow1} CNY : 1 BCST
                        </Typography>
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
