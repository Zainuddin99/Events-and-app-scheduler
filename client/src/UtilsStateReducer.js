export const utilsStateReducer = (state, action) =>{
    switch(action.type){
        case 'OPEN_LOGIN_PAGE': return {
            ...state, loginPageOpen: true
        }
        case 'CLOSE_LOGIN_PAGE': return {
            ...state, loginPageOpen: false
        }
        case 'UPDATE_NAME': return {
            ...state, fullName: action.payload
        }
        case 'NOT_AUTHORIZED': return {
            ...state, loginPageOpen: true
        }
        case 'CHANGE_LOGIN_STATE': return {
            ...state, loginPageState: !state.loginPageState
        }
        default: return state
    }
}