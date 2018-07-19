import './assets/main.css'
import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Switch, Route  } from 'react-router-dom'
import webTheme from './theme'
import HeadWrapper from './head-wrapper'
import store from '../store'


const Home = () => <p>home</p>
const Dashboard = () => <p>dashboard</p>
const Investment = () => <p>investment</p>



const App = () => {
	return (
		<Provider store={store}>
			<MuiThemeProvider theme={webTheme}>
				<BrowserRouter>
					<HeadWrapper>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/dashboard' component={Dashboard} />
							<Route exact path='/investment' component={Investment} />
						</Switch>
					</HeadWrapper>
				</BrowserRouter>
			</MuiThemeProvider>
		</Provider>
	)
}

export default App