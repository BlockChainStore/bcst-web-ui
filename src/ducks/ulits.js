const localStateKey = 'duck'

export const localState = {
    store: (state) => {
        const stateStringify = JSON.stringify(state.duck)    
        localStorage.setItem(localStateKey, stateStringify)
    },
    clear: (state) => {  
        localStorage.clear()
    },
    get: () => {
        const duck = localStorage.getItem(localStateKey)
        return JSON.parse(duck || '{}')
    }
}