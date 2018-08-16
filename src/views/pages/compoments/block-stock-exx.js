import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
	paper: {
		position: 'relative',
		height: 450,
		marginBottom: 24
	},
	textValue: {
		padding: '4px 16px',
		fontSize: 'larger'
	},
	progress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	exxLogo: {
		backgroundColor: '#23262D',
		padding: '8px 16px',
		height: 20,
		width: 60
	}
})

const symbolPair = {
	'BCST/CNYT': 'bcst_cnyt',
	'BCST/BTC': 'bcst_btc',
	'BCST/ETH': 'bcst_eth'
}

const buildOptions = (data) => {
	// [datetime, open, high, low, close, volum ]]
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

class BlockStockEXX extends React.Component {

	state = { options: null, ticker: null}
	
	componentDidMount() {
		const { symbol } = this.props
		const lowwerSymbol = symbolPair[symbol]
		const corsURL = 'https://cors-anywhere.herokuapp.com/'
		const klinesApi = 'https://api.exx.com/data/v1/klines?'
		const klinesParam = `market=${lowwerSymbol}&type=1day&size=1000`
		const klinesUri = corsURL + klinesApi + klinesParam
		const tickerApi = 'https://api.exx.com/data/v1/ticker?'
		const tickerParam = `currency=${lowwerSymbol}`
		const tickerUri = corsURL + tickerApi + tickerParam

		const headers = { 'X-Requested-With': 'XMLHttpRequest' }
		const reqKlines = axios.get(klinesUri, { headers })
		const reqTicker = axios.get(tickerUri, { headers })
		Promise.all([reqKlines, reqTicker])
		.then(values => {
			const klinesRes = values[0].data

			let options = null
			try {
				options = buildOptions(klinesRes)
			} catch (error) {
				console.log('[klines res error]', klinesUri, values[0])
			}

			let ticker = null
			try {
				ticker = values[1].data.ticker.buy
			} catch (error) {
				console.log('[ticker res error]', tickerUri, values[1])
			}

			this.setState({ options, ticker })
		})
	}

	render() {
		const { classes, symbol } = this.props
		return (
			<Paper className={classes.paper} elevation={1}>
				<Grid container justify='flex-end'>
					<Grid item>
						<Typography color="textSecondary" className={classes.textValue}>
							{!!this.state.ticker &&
								<span>~{this.state.ticker} {symbol}</span>}
						</Typography>
					</Grid>
            		<Grid item>
						<img 
							className={classes.exxLogo} 
							src="https://www.exxvip.com/src/images/logo.png" />
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
			</Paper>
			
		)
	}
}

export default withStyles(styles)(BlockStockEXX)