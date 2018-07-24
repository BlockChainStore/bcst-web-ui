import './assets/main.css'
import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Switch, Route  } from 'react-router-dom'
import { ConnectedRouter } from "react-router-redux"
import webTheme from './theme'
import HeadWrapper from './head-wrapper'
import store, { history } from '../store'
import { pageTransition } from './pages/compoments/page-transition'
import Investment from '../views/pages/investment.js'
import Home from '../views/pages/home'

const Dashboard = () => <p>dashboard</p>


const App = () => {
	return (
		<MuiThemeProvider theme={webTheme}>
			<Provider store={store}>
				<BrowserRouter>
					<ConnectedRouter history={history}>
						<HeadWrapper>
							<Switch>
								<Route 
									exact 
									path='/' 
									component={pageTransition(Home)} />
								<Route 
									path='/dashboard' 
									component={pageTransition(Dashboard)} />
								<Route 
									path='/investment' 
									component={pageTransition(Investment)} />
							</Switch>
						</HeadWrapper>
					</ConnectedRouter>
				</BrowserRouter>
			</Provider>
		</MuiThemeProvider>	
	)
}

export default App