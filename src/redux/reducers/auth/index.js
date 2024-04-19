import useJwt from '@src/auth/jwt/useJwt'
import moment from 'moment'

const config = useJwt.jwtConfig

// **  Initial State
const initialState = {
  loadedAt:null,
  loading:false,
  userData: {},
  accessToken: null,
  errors:[],
  updateProfile:{
    loading:false,
    errors:[]
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Handle User Login Request Init state changes*/
    case 'LOGIN_REQUEST': {
      return {
        ...state,
        loading:true,
        errors:[]
      }
    }
    /* Handle User Login Request Success state changes*/
    case 'LOGIN': {
      return {
        ...state,
        loadedAt:moment(),
        loading:false,
        errors:[],
        userData: action.data.user,
        [config.storageTokenKeyName]: action.data.token
      }
    }
    /* Handle User Login Request Fail state changes*/
    case 'LOGIN_REQUEST_FAILED': {
      return {
        ...state,
        loading:false,
        errors:action.errors
      }
    }
    /* Handle User Logout Request Success state changes*/
    case 'LOGOUT_REQUEST':
     
      const obj = { ...action }
      delete obj.type
      return { ...state, userData: {}, ...obj }
    /* Handle User Logout Request Success state changes*/
    case 'LOGOUT_ALL_REQUEST':
      
      const newobj = { ...action }
      delete newobj.type
      return { ...state, userData: {}, ...newobj }
    /* Handle User Password Change Request*/
    case 'PASSWORD_UPDATE': {

      return {
        ...state,
        loading:true
      }
    }
    /* Handle User Password Change Success Request*/
    case 'PASSWORD_UPDATE_SUCCESS': {

      return {
        ...state,
        loading:false,
        userData: {...state.userData, pwdUpdate_needed:false}
      }
    }
    /* Handle User Password Change Fail Request*/
    case 'PASSWORD_UPDATE_FAILED': {

      return {
        ...state,
        loading:false,
        errors:action.errors
      }
    }
    /* Handle User Password Change Request*/
    case 'UPDATE_PROFILE': {

      return {
        ...state,
        updateProfile:{...state.updateProfile, loading:true, errors:[]}
      }
    }
    /* Handle User Password Change Success Request*/
    case 'UPDATE_PROFILE_SUCCESS': {

      return {
        ...state,
        updateProfile:{...state.updateProfile, loading:false, errors:[]},
        userData: action.data
      }
    }
    /* Handle User Password Change Fail Request*/
    case 'UPDATE_PROFILE_FAILED': {

      return {
        ...state,
        updateProfile:{...state.updateProfile, loading:true, errors:action.errors}
      }
    }
    /* Handle User Smart Contract Update Request*/
    case 'UPDATE_SMART_CONTRACT_PROFILE': {

      return {
        ...state,
        updateProfile:{...state.updateProfile, loading:true, errors:[]}
      }
    }
    case 'GET_GLOBAL_SETTINGS': {
      return {
        ...state,
        loading:true,
        errors:[]
      }
    }
    case 'GLOBAL_SETTINGS': {
      return {
        ...state,
        loading:true,
        globalSettings:action.payload
      }
    }
    default:
      return state
  }
}

export default authReducer
