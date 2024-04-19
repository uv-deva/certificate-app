// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

// ** Init login request
export const doLogin = data => {
  return dispatch => {
    dispatch({
      type: 'LOGIN_REQUEST',
      data
    })
  }
}

// ** Init login request
export const loginSucces = () => {
  return dispatch => {
    dispatch({
      type: 'LOGIN_REQUEST_SUCESS'
    })
  }
}

// ** Init login request
export const loginFail = errors => {
  return dispatch => {
    dispatch({
      type: 'LOGIN_REQUEST_FAILED',
      errors
    })
  }
}

// ** Handle User Login
export const handleLogin = data => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      accessToken: data['token']
    })
  }
}

// ** Init User Logout Request
export const doLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT_REQUEST' })
  }
}

// ** Handle User Logout Success
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT_SUCCESS', accessToken: null })
  }
}

// ** Handle User Logout Fail Event
export const handleLogoutFail = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT_FAIL' })
  }
}

// ** Init User Logout From All Devices Request
export const doAllLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT_ALL_REQUEST' })
  }
}

// ** Handle User Logout From All Devices Success
export const handleAllLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT_ALL_REQUEST_SUCCESS', accessToken: null })
  }
}

// ** Handle User Logout From All Devices Fail Event
export const handleAllLogoutFail = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT_ALL_REQUEST_FAIL' })
  }
}

// ** Init Password Change Request
export const changePassword = (data) => {
  return dispatch => {
    dispatch({ type: 'PASSWORD_UPDATE', data })
  }
}

// ** Handle Password Change Success
export const changePasswordSuccess = () => {
  return dispatch => {
    dispatch({ type: 'PASSWORD_UPDATE_SUCCESS' })
  }
}

// ** Handle Password Change Fail
export const changePasswordFail = (errors) => {
  return dispatch => {
    dispatch({ type: 'PASSWORD_UPDATE_FAILED', errors })
  }
}


// ** Init Profile Update Request
export const updateProfile = (id, data) => {
  return dispatch => {
    dispatch({ type: 'UPDATE_PROFILE', id, data })
  }
}

// ** Handle Profile Update Success
export const updateProfileSuccess = (data) => {
  return dispatch => {
    dispatch({ type: 'UPDATE_PROFILE_SUCCESS', data })
  }
}

// ** Handle Profile Update Fail
export const updateProfileFail = (errors) => {
  return dispatch => {
    dispatch({ type: 'UPDATE_PROFILE_FAILED', errors })
  }
}

// ** Init Smart Contract Data Update Request
export const updateSmartContractProfileData = (id, data) => {
  return { type: 'UPDATE_SMART_CONTRACT_PROFILE', payload: { id, data }}
}

export const getGlobalSettings = () => {
  return {
    type: 'GET_GLOBAL_SETTINGS'
  }
}
export const globalSettings = (data) => {
  return {
    type: 'GLOBAL_SETTINGS',
    payload: data
  }
}