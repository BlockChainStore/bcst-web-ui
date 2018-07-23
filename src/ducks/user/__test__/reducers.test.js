import { user } from '../../types'
import { infoReducer, ethReducer, bcstReducer } from '../reducers'


it('test update info', () => {
    const previousState = {}

    const action = {
        type: user.UPDATE_INFO,
        payload: {
            address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
            privateKey: '0000000000000000000000000000000000000000000000000000000000000001',
        }
    }

    const expectState = {
        address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
        privateKey: '0000000000000000000000000000000000000000000000000000000000000001',
    }

    expect(infoReducer(previousState, action)).toEqual(expectState)
})


it('test update eth', () => {
    const previousState = {}

    const action = {
        type: user.UPDATE_ETH,
        payload: 20
    }

    const expectState = 20

    expect(ethReducer(previousState, action)).toEqual(expectState)
})


it('test update bcst', () => {
    const previousState = {}

    const action = {
        type: user.UPDATE_BCST,
        payload: 20
    }

    const expectState = 20

    expect(bcstReducer(previousState, action)).toEqual(expectState)
})