const localStateKey = 'duck'

export const localState = {
    store: (state) => {
        const stateStringify = JSON.stringify(state.duck)    
        sessionStorage.setItem(localStateKey, stateStringify)
    },
    clear: (state) => {  
        sessionStorage.clear()
    },
    get: () => {
        const duck = sessionStorage.getItem(localStateKey)
        return JSON.parse(duck || '{}')
    }
}