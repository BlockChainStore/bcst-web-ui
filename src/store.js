import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import createHistory from "history/createBrowserHistory"
import { routerReducer, routerMiddleware } from "react-router-redux"

import duckReducer from './ducks'
import { rootSaga } from './ducks'
import { localState } from './ducks/ulits'


const logger = createLogger({
    collapsed: true
})

const sagaMiddleware = createSagaMiddleware()

export const history = createHistory()

const middleware = [
    logger,
    sagaMiddleware,
    routerMiddleware(history)
]

const reducers = combineReducers({
    router: routerReducer,
    duck: duckReducer
})

const duck = localState.get()

const store = createStore(
    reducers,
    { duck },
    applyMiddleware(...middleware),
)

sagaMiddleware.run(rootSaga)

export default store