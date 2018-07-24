import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route  } from 'react-router-dom'
import { ConnectedRouter } from "react-router-redux"

import { pageTransition } from './pages/compoments/page-transition'
import Home from '../views/pages/home'
import Dashboard from '../views/pages/dashboard'
import Investment from '../views/pages/investment.js'
import PageNotFound from '../views/pages/page-not-found'
import { history } from '../store'


const AppRouter = ({ user }) => {
    const isUnlockWallet = !!user.info.address
    return (
        <BrowserRouter>
            <ConnectedRouter history={history}>

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
  
            </ConnectedRouter>
        </BrowserRouter>
    )
}


const mapStateToProps = state => ({
    user: state.duck.user
})

export default connect(
    mapStateToProps,
    null
)(AppRouter)