import './assets/main.css'
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Switch, Route  } from 'react-router-dom'
import { ConnectedRouter } from "react-router-redux"
import webTheme from './theme'
import HeadWrapper from './head-wrapper'
import store, { history } from '../store'
import { PageTransitionSlideIn } from './pages/compoments/page-transition'

const Home = () => (
	<p >
		Home
	</p>
)

const Dashboard = () =>  (
	<p >
		Dashboard
	</p>
)

const Investment = () => (
	<p >
		Investment
	</p>
)


const HomePage = () => <PageTransitionSlideIn><Home /></PageTransitionSlideIn>
const DashboardPage = () => <PageTransitionSlideIn><Dashboard /></PageTransitionSlideIn>
const InvestmentPage = () => <PageTransitionSlideIn><Investment /></PageTransitionSlideIn>



const App = () => {
	return (
		<MuiThemeProvider theme={webTheme}>
			<Provider store={store}>
				<BrowserRouter>
					<ConnectedRouter history={history}>
						<HeadWrapper>
							<Switch>
								<Route exact path='/' component={HomePage} />
								<Route exact path='/dashboard' component={DashboardPage} />
								<Route exact path='/investment' component={InvestmentPage} />
							</Switch>
						</HeadWrapper>
					</ConnectedRouter>
				</BrowserRouter>
			</Provider>
		</MuiThemeProvider>
		
	)
}

export default App