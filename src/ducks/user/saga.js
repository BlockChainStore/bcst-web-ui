// import { select, take, put, call, fork, cancel, apply } from 'redux-saga/effects'
// import { delay } from 'redux-saga'


function *getBCST() {
    while(true) {
        yield
        // yield take()
    }
}

export default function* userSaga() {
    yield [
        getBCST(),
    ]
}
