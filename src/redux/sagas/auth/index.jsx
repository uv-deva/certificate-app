
import { call, put, select, delay } from 'redux-saga/effects'
import { loginFail, handleLogin, loginSucces, handleLogout, handleLogoutFail, updateProfileSuccess, updateProfileFail } from '@store/actions/auth'
import { selectBaseUrl, selectLocale } from '@src/redux/selectors/config'
import { selectToken } from '@src/redux/selectors/auth'
import ToastContent from '../../../components/Toast'
import { toast, Slide } from 'react-toastify'
import request from '@src/utility/request'
import { setLocale } from '@store/actions/config'
import { changePasswordFail, changePasswordSuccess, handleAllLogout, handleAllLogoutFail, globalSettings } from '../../actions/auth'
import  ability from '../../../configs/acl/ability'


// worker Saga: will be fired on LOGIN_REQUEST actions
function* fetchUser(params) {
  const requestURL = yield select(selectBaseUrl())
  const locale = yield select(selectLocale())

  const myHeaders = { 
    Accept: "application/json",
    "Content-Type":"application/json",
    "Accept-Language":locale,
    "User-Agent": "Web App",
    Origin : "*"
  }
    
  try {
      const { data } = params

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data: { username: data['login-email'], password: data['login-password'] },
        mode:'cors',
        credentials:'include'
      }

      const res = yield call(request, `${requestURL}auth/login`, requestOptions)
      
      if (res?.data?.user && res?.data?.token) {
          yield put(loginSucces())
          const user = { ...res.data.user, accessToken: res.data.token }
          //res.data.user.pwdUpdate_needed = true
          yield put(handleLogin(res.data))
          yield put(setLocale(res.data.user.language))
          //yield put(handleContentWidth('boxed'))
          const permissions = res.data.user.permissions.map(o =>  {
            const permission = o.split('tracktrace.')[1].split('_')
            return {
              action: permission[0],
              subject: permission[1]
            }
          })
          ability.update(permissions)
          //history.push(getHomeRouteForLoggedInUser(data.role))

          toast.success(
          <ToastContent 
          type="success"
          title={`Welcome ${user.username}`} 
          body="You have successfully logged in. Now you can start to explore. Enjoy!" 
          />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )

          setTimeout(() => {

            if (res.data.user.pwdUpdate_needed) {
              toast.success(
                <ToastContent 
                type="success"
                title={`Hello ${user.username}`} 
                body="Please update your password." 
                />,
                { transition: Slide, hideProgressBar: true, autoClose: 5000 }
              )
            }

          }, 3000) 

      } else {
          toast.error(
          <ToastContent type="error" title="Ooops!" body={res.data.non_field_errors} />,
          { transition: Slide, hideProgressBar: true }
          )

          yield put(loginFail((res.data)))
      }
      
    
    } catch (e) {
      yield put(loginFail([{message: e.message}]))

      toast.error(
      <ToastContent type="error" title="Ooops!" body={e.message} />,
      { transition: Slide, hideProgressBar: true }
      )

    }
}


// worker Saga: will be fired on LOGOUT_REQUEST action
export function* logoutUser() {

  const requestURL = yield select(selectBaseUrl())
  const memberToken = yield select(selectToken())
  const locale = yield select(selectLocale())

  const myHeaders = { 
    Accept: "application/json",
    "Content-Type":"application/json",
    "Accept-Language":locale,
    Authorization : `Token ${memberToken}`
  }
    
  try {
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      mode:'cors',
      credentials:'include'
    }

    const res = yield call(request, `${requestURL}auth/logout`, requestOptions)
    if (res?.data) {
      yield put(handleLogout())
      //yield put(handleContentWidth('full'))

      
      if (res.data?.message)  toast.success(<ToastContent 
          type="success"
          title={`Success`} 
          body={res.data.message}
          />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      
    } else {

      toast.error(
      <ToastContent type="error" title="Ooops!" body={res.data.toString()} />,
      { transition: Slide, hideProgressBar: true }
      )

      yield put(handleLogoutFail((res.data)))
    }
      
    
  } catch (e) {

    yield put(handleLogoutFail([{message: e.message}]))

    toast.error(
    <ToastContent type="error" title="Ooops!" body={e.message} />,
    { transition: Slide, hideProgressBar: true }
    )

  }
}


// worker Saga: will be fired on LOGOUT_REQUEST action
export function* AllLogoutUserAsync() {

  const requestURL = yield select(selectBaseUrl())
  const memberToken = yield select(selectToken())
  const locale = yield select(selectLocale())

  const myHeaders = { 
    Accept: "application/json",
    "Content-Type":"application/json",
    "Accept-Language":locale,
    Authorization : `Token ${memberToken}`
  }
    
  try {
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      mode:'cors',
      credentials:'include'
    }

    const res = yield call(request, `${requestURL}auth/logoutall`, requestOptions)
    if (res?.data) {
      yield put(handleAllLogout())

      toast.success(<ToastContent 
        type="success"
        title={`Success`} 
        body={res.data.message}
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )

    } else {

      toast.error(
      <ToastContent type="error" title="Ooops!" body={res.data.toString()} />,
      { transition: Slide, hideProgressBar: true }
      )

      yield put(handleAllLogoutFail((res.data)))
    }
      
    
  } catch (e) {

    yield put(handleAllLogoutFail([{message: e.message}]))

    toast.error(
    <ToastContent type="error" title="Ooops!" body={e.message} />,
    { transition: Slide, hideProgressBar: true }
    )

  }
}


// worker Saga: will be fired on LOGIN_REQUEST actions
export function* changePasswordAsync(params) {

  const requestURL = yield select(selectBaseUrl())
  const locale = yield select(selectLocale())
  const token = yield select(selectToken())

  const myHeaders = { 
    Accept: "application/json",
    "Content-Type":"application/json",
    "Accept-Language":locale,
    "User-Agent": "Web App",
    Authorization : `Token ${token}`,
    Origin : "*"
  }
    
  try {
      const { data } = params
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        data,
        mode:'cors',
        credentials:'include'
      }

      const res = yield call(request, `${requestURL}auth/passwordChange`, requestOptions)

      
      if (res?.data?.status && res.data.status === "success") {
          yield put(changePasswordSuccess())

          toast.success(<ToastContent 
            type="success"
            title={`Success`} 
            body={res.data.message}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )

      } else {

          if (res.data.message) {
            toast.error(<ToastContent type="error" title="Ooops!" body={res.data.message} />, { transition: Slide, hideProgressBar: true })
          }

          yield put(changePasswordFail((res.data)))
      }
      
    
    } catch (e) {
      yield put(changePasswordFail([{message: e.message}]))

      toast.error(<ToastContent type="error" title="Ooops!" body={e.message} />, { transition: Slide, hideProgressBar: true })

    }
}


// worker Saga: will be fired on UPDATE_PROFILE action
export function* updateProfile(params) {
  const { id, data } = params
 
  const requestURL = yield select(selectBaseUrl())
  const locale = yield select(selectLocale())
  const token = yield select(selectToken())

  const myHeaders = { 
      Accept: "application/json",
      "Content-Type":"multipart/form-data",
      "Accept-Language":locale,
      "User-Agent": "Web App",
      Authorization : `Token ${token}`,
      Origin : "*"
  }

  /*eslint-disable */
  let formdata = new FormData()
  
  
  for (let k in data) {
      console.log('here')
     
      if (data[k] && data[k].toString.call(data[k]).slice(8, -1) === 'FileList'){
          if ( data[k].length > 0) formdata.append(k, data[k][0], data[k][0].name)
      } 
      else if(typeof data[k] !=="undefined" && typeof data[k] !=="undefined" && data[k].length && data[k].map){
        data[k].map((item) => {
            formdata.append(k, item)
        })
      }
      else if(typeof data[k] !=="undefined") formdata.append(k, data[k])
  
  }
  /*eslint-enable */
   
  const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      data:formdata,
      mode:'cors',
      credentials:'include'
  }

  try {
      
      const res = yield call(request, `${requestURL}partnerUpdate/${id}`, requestOptions)
      
      if (res.data?.id) {
          
          yield put(updateProfileSuccess(res.data))
          yield put(setLocale(res.data.language))

          toast.success(
            <ToastContent 
            type="success"
            title={`Profile Updated`} 
            body="You have successfully updated your profile!" 
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )

      } else yield put(updateProfileFail(res.data))
      
    
  } catch (e) {
     yield put(updateProfileFail([{message: e.message}]))

     toast.error(
      <ToastContent type="error" title="Ooops!" body={e.message} />,
      { transition: Slide, hideProgressBar: true }
      )
  }
}
  // worker Saga: will be fired on UPDATE_SMART_CONTRACT_PROFILE action
export function* updateSmartContractProfile(params) {
  const { id, data } = params.payload
  const requestURL = yield select(selectBaseUrl())
  const token = yield select(selectToken())

  const myHeaders = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    "User-Agent": "Web App",
    Authorization: `Token ${token}`,
    Origin: "*"
  }

  /*eslint-disable */
  let formdata = new FormData()


  for (let k in data) {
    console.log('here')

    if (data[k] && data[k].toString.call(data[k]).slice(8, -1) === 'FileList') {
      if (data[k].length > 0) formdata.append(k, data[k][0], data[k][0].name)
    }
    else if (typeof data[k] !== "undefined" && typeof data[k] !== "undefined" && data[k].length && data[k].map) {
      data[k].map((item) => {
        formdata.append(k, item)
      })
    }
    else if (typeof data[k] !== "undefined") formdata.append(k, data[k])

  }
  /*eslint-enable */

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    data: formdata,
    mode: 'cors',
    credentials: 'include'
  }

  try {

    const res = yield call(request, `${requestURL}partnerUpdate/${id}`, requestOptions)

    if (res.data?.status) {

      yield put(updateProfileSuccess(res.data))

      toast.success(
        <ToastContent
          type="success"
          title={`Profile Updated`}
          body="You have successfully updated contract data!"
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )

    } else if (res.data?.status === "fail") {
      yield put(updateProfileFail({ errors: { message: res.data.message } }))

      toast.error(
        <ToastContent
          type="error"
          title={`OOOPS!`}
          body={res.data.message}
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    }


  } catch (e) {
    yield put(updateProfileFail([{ message: e.message }]))

    toast.error(
      <ToastContent type="error" title="Ooops!" body={e.message} />,
      { transition: Slide, hideProgressBar: true }
    )
  }
}
  // worker Saga: will be fired on GLOBAL_SETTINGS actions
export function* getGlobalSettings(params) {
  const requestURL = yield select(selectBaseUrl())

  const myHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
  }

  try {

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      credentials: 'include'
    }

    const res = yield call(request, `${requestURL}globalSettings/`, requestOptions)

    if (res?.data) {
      yield put(globalSettings(res.data))
    } else {
      yield put(globalSettings({}))
    }
  } catch (e) {
    yield put(globalSettings({}))
  }
}
 
export default fetchUser