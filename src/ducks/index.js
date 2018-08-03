import { combineReducers } from "redux"

// import all of reducers in dock here  
import userReducers from './user/reducers'
import investmentReducers from './investment/reducers'

// import all of saga in dock here 
import userSaga from './user/saga'
import investmentSaga from './investment/saga'
import commonSaga from './common/saga'


const reducer = combineReducers({
    user: userReducers,
    investment: investmentReducers
})

function* rootSaga() {
    yield [
        userSaga(),
        investmentSaga(),
        commonSaga(),
    ]
}

export { rootSaga }

export default reducer