import { user } from '../../types'
import { infoReducer, ethReducer, bcstReducer } from '../reducers'


it('test update info', () => {
    const previousState = {}

    const action = {
        type: user.UPDATE_INFO,
        payload: {
            address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
            privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
        }
    }

    const expectState = {
        address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
        privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
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