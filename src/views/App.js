import './assets/main.css'
import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import webTheme from './theme'
import HeadWrapper from './head-wrapper'

const App = () => {
	return (
		<MuiThemeProvider theme={webTheme}>
			<HeadWrapper>
				<p>sittisak</p>
			</HeadWrapper>
		</MuiThemeProvider>
	)
}

export default App