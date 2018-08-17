import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import axios from 'axios'
import exxLogo from '../../assets/images/logo-exx.png'


const styles = theme => ({
	container: {
		position: 'relative',
		height: 450
	},
	header: {
		height: 40,
		borderBottom: `1px solid ${theme.palette.grey.A100}`
	},
	textHeader: {
		padding: '10px 0',
		fontSize: 'small'
	},
	progress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	exxLogo: {
		backgroundColor: '#23262D',
		borderRadius: 15,
		padding: '8px 16px',
		marginBottom: -10,
		marginLeft: 10,
		height: 30,
		width: 90
	}
})

const symbolPair = {
	'BCST/CNYT': 'bcst_cnyt',
	'BCST/BTC': 'bcst_btc',
	'BCST/ETH': 'bcst_eth'
}

const symbolPairArray = Object.keys(symbolPair)

const buildOptions = (data) => {
	// [datetime, open, high, low, close, volum ]
	const trickData = data.datas.data
	const moneyType = data.datas.moneyType
	const contractUnit = data.datas.contractUnit
	const groupingUnits = [
		[ 'week', [1] ], 
		[ 'month', [1, 2, 3, 4, 6] ],
	]
	return {
		rangeSelector: { selected: 0 },
		title: { text: `${contractUnit}/${moneyType}` },
		yAxis: [
			{
				labels: { align: 'right', x: -3 },
				title: { text: `Price(${moneyType})` },
				height: '60%',
				lineWidth: 2,
				resize: { enabled: true }
			},
			{
				labels: { align: 'right', x: -3 },
				title: { text: 'Volume' },
				top: '65%',
				height: '35%',
				offset: 0,
				lineWidth: 2
			}
		],
		tooltip: { split: true },
		series: [
			{
				type: 'candlestick',
				name: 'AAPL',
				data: trickData.map(item => [item[0], item[1], 
					item[2], item[3], item[4]]),
				dataGrouping: { units: groupingUnits }
			},
			{
				type: 'column',
				name: 'Volume',
				data: trickData.map(item => [item[0], item[5]]),
				yAxis: 1,
				dataGrouping: { units: groupingUnits }
			}
		]
	}
}


class BlockStockEXXComponent extends React.Component {

	state = { options: null, ticker: null}

	componentDidMount() {
		const { symbol } = this.props
		const lowwerSymbol = symbolPair[symbol]
		const corsURL = 'https://cors-anywhere.herokuapp.com/'
		const klinesApi = 'https://api.exx.com/data/v1/klines?'
		const klinesParam = `market=${lowwerSymbol}&type=1day&size=1000`
		const klinesUri = corsURL + klinesApi + klinesParam

		const headers = { 'X-Requested-With': 'XMLHttpRequest' }
		axios.get(klinesUri, { headers })
		.then(klinesRes => klinesRes.data)
		.then(klinesRes => {
			let options = null
			let ticker = null
			try {
				options = buildOptions(klinesRes)
				const lastTicker = klinesRes.datas.data[klinesRes.datas.data.length - 1]
				ticker = {
					open: lastTicker[1],
					high: lastTicker[2],
					low: lastTicker[3],
					volumes: lastTicker[5],
				}
			} catch (error) {
				console.log('[klines res error]', klinesUri, klinesRes)
			}
			this.setState({ options, ticker })
		})
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.container}>
				<Grid container className={classes.header}>
					<Grid item xs>
						{!!this.state.ticker &&
							<Grid container justify="space-around">
								<Grid item>
									<Typography color="textSecondary" className={classes.textHeader}>
										<span>Open {this.state.ticker.open}</span>
									</Typography>
								</Grid>
								<Grid item>
									<Typography color="textSecondary" className={classes.textHeader}>
										<span>Maximum {this.state.ticker.high}</span>
									</Typography>
								</Grid>
								<Grid item>
									<Typography color="textSecondary" className={classes.textHeader}>
										<span>Minimum {this.state.ticker.low}</span>
									</Typography>
								</Grid>
								<Grid item>
									<Typography color="textSecondary" className={classes.textHeader}>
										<span>24HTrading Volumes {this.state.ticker.volumes} BCST</span>
									</Typography>
								</Grid>
							</Grid>}
					</Grid>
        		</Grid>
				{!!this.state.options &&
					<HighchartsReact
						highcharts={Highcharts}
						constructorType={'stockChart'}
						options={this.state.options}/>}
				{!!!this.state.options &&
					<div className={classes.progress}>
						<CircularProgress size={75} />
					</div>}
			</div>
			
		)
	}
}


const BlockStockEXX = withStyles(styles)(BlockStockEXXComponent)


class BlockStock extends React.Component {
	state = { 
		value: 0, 
		symbol: symbolPairArray[0]
	}
  
	handleChange = (event, value) => { 
	  	this.setState({ value: value, symbol: symbolPairArray[value]})
	}
  
	render() {
		const { classes } = this.props
		return (
			<Grid container justify="center">
				<Grid item  xs={12}>
					<Typography variant="display2" align="center" gutterBottom>
						BCST Trade Views On
						<a href="https://www.exxvip.com/" rel="noopener noreferrer" target="_blank" >
							<img 
								alt="logo exx"
								className={classes.exxLogo} 
								src={exxLogo} />	
						</a>
					</Typography>
				</Grid>
				<Grid item  xs={12}>
					<Paper elevation={1}>
						<AppBar position="static" color="default">
							<Tabs
								value={this.state.value}
								indicatorColor="primary"
								textColor="primary"
								onChange={this.handleChange}
								fullWidth
								centered>
								{symbolPairArray.map((item, i) => (
									<Tab key={i} label={item} />
								))}
							</Tabs>
						</AppBar>
						<BlockStockEXX key={this.state.symbol} symbol={this.state.symbol} />
					</Paper>
				</Grid>
			</Grid>
		)
	}
}
  

export default withStyles(styles)(BlockStock)
