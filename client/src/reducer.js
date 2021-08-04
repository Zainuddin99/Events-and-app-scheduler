export const reducer = (state, action) => {
    switch(action.type){
        case 'LOADING': return {
            ...state, loading: true
        }
        case 'SUCCESS': return {
            ...state, loading: false, message: action.payload?.data?.message
        }
        case 'FAILED': return {
            ...state, loading: false
        }
        case 'CLEAR': return {
            ...state, message: ''
        }
        case 'STOP LOADING': return {
            ...state, loading: false
        }
        default: return state
    }
}