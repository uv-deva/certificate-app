// **  Initial State
const initialState = {
    baseUrl : import.meta.env.VITE_REACT_APP_BASE_URL,
    locale: "en"
}

const configReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_LOCALE':
      return { ...state, locale:action.locale }
    default:
      return state
    }
}
  
 
export default configReducer
  