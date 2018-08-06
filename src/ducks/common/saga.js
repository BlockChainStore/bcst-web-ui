import { delay } from 'redux-saga'
import { select, call, takeLatest } from 'redux-saga/effects'

import { localState } from '../ulits'


function* handleInput() {
    yield call(delay, 2500)
    const state = yield select()
    if(!!state.duck.user.info.privateKey) {
        localState.store(state)
    }
}

function *autoSave() {
    yield takeLatest('*', handleInput)
}

export default function* commomSaga() {
    yield [
        autoSave()
    ]
}
