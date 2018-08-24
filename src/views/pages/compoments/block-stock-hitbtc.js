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


const styles = theme => ({
	container: {
		position: 'relative',
		height: 450
	},
	header: {
		borderBottom: `1px solid ${theme.palette.grey.A100}`
	},
	textHeader: {
		paddingTop: 16,
		paddingBottom: 8
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
	'BCST/USDT': 'BCSTUSD',
	'BCST/BTC': 'BCSTBTC',
	'BCST/ETH': 'BCSTETH'
}

const symbolPairArray = Object.keys(symbolPair)

const buildOptions = (data, symbol) => {
	// [datetime, open, high, low, close, volum ]
	const trickData = data
	const moneyType = symbol.split("/")[1]
	const groupingUnits = [
		[ 'week', [1] ], 
		[ 'month', [1, 2, 3, 4, 6] ],
	]
	return {
		rangeSelector: { selected: 0 },
		title: { text: symbol },
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
				data: trickData.map(item => [
					Date.parse(item.timestamp), 
					parseFloat(item.open), 
					parseFloat(item.max), 
					parseFloat(item.min), 
					parseFloat(item.close)
				]),
				dataGrouping: { units: groupingUnits }
			},
			{
				type: 'column',
				name: 'Volume',
				data: trickData.map(item => [
					Date.parse(item.timestamp), 
					parseFloat(item.volume)
				]),
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
		const symbolParam = symbolPair[symbol]
		const corsURL = 'https://cors-anywhere.herokuapp.com/'
		const klinesApi = `https://api.hitbtc.com/api/2/public/candles/${symbolParam}?`
		const klinesParam = 'limit=1000&period=D1'
		const klinesUri = corsURL + klinesApi + klinesParam
		
		const headers = { 'X-Requested-With': 'XMLHttpRequest' }
		axios.get(klinesUri, { headers })
		.then(klinesRes => klinesRes.data)
		.then(klinesRes => {
			let options = null
			let ticker = null
			try {
				options = buildOptions(klinesRes, symbol)
				const lastTicker = klinesRes[klinesRes.length - 1]
				ticker = {
					open: lastTicker.open,
					high: lastTicker.max,
					low: lastTicker.min,
					volumes: lastTicker.volume,
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
				{!!this.state.options &&
					<Grid container>
						<Grid item xs={12} className={classes.header} >
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
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<HighchartsReact
								highcharts={Highcharts}
								constructorType={'stockChart'}
								options={this.state.options}/>
						</Grid>
					</Grid>}

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
		return (
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
		)
	}
}
  

export default withStyles(styles)(BlockStock)