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
import Home from '../views/pages/home'
import Dashboard from '../views/pages/dashboard'
import Investment from '../views/pages/investment.js'
import PageNotFound from '../views/pages/page-not-found'
import AlertSnackbar from '../views/pages/compoments/alert'


const App = () => {
	const isUnlockWallet = !!store.getState().duck.user.info.address
	return (
		<MuiThemeProvider theme={webTheme}>
			<Provider store={store}>
				<BrowserRouter>
					<ConnectedRouter history={history}>
						<HeadWrapper>
							<AlertSnackbar/>
							<Switch>
								<Route 
									exact
									path='/' 
									component={pageTransition(Home)} />
								{isUnlockWallet &&
									<Route 
										path='/dashboard' 
										component={pageTransition(Dashboard)} />}
								{isUnlockWallet &&
									<Route 
										path='/investment' 
										component={pageTransition(Investment)} />}
								<Route component={PageNotFound} />
							</Switch>
						</HeadWrapper>
					</ConnectedRouter>
				</BrowserRouter>
			</Provider>
		</MuiThemeProvider>	
	)
}

export default App