import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import duckReducer from './ducks'
import { rootSaga } from './ducks'

const logger = createLogger({
    collapsed: true
})

const sagaMiddleware = createSagaMiddleware()
  
const middleware = [
    logger,
    sagaMiddleware,
]

const reducers = combineReducers({
    duck: duckReducer
})

const store = createStore(
    reducers,
    {},
    applyMiddleware(...middleware),
)

sagaMiddleware.run(rootSaga)

export default store