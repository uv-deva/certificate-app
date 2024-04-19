import { call, put, select } from 'redux-saga/effects'
import request from '@src/utility/request'
import {
    searchMaterialTypesSuccess,
    searchMaterialTypesFail,
    searchNodeTypesSuccess,
    searchNodeTypesFail,
    searchProgramTypesSuccess,
    searchProgramTypesFail,
    searchWalletTypesSuccess,
    searchWalletTypesFail,
    searchCertificateTypesSuccess,
    searchCertificateTypesFail,
    searchTableSuccess, 
    searchTableFail
} from '../../actions/routes'
import { selectToken } from '../../selectors/auth'
import { selectBaseUrl, selectLocale } from '../../selectors/config'
import { selectSearchQuery, selectSearchUrl } from '../../selectors/routes'


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* searchMaterialTypes() {
  
    
    const q = yield select(selectSearchQuery('materialTypes'))
    const baseURL = yield select(selectBaseUrl())
    const requestURL = yield select(selectSearchUrl('materialTypes'))
    const token = yield select(selectToken())
    const locale = yield select(selectLocale())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"application/json",
        "User-Agent": "Web App",
        "Accept-Language":locale,
        Authorization : `Token ${token}`,
        Origin : "*"
    }
    
     
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        params: { search: q },
        mode:'cors',
        credentials:'include'
    }

    try {
        
        const res = yield call(request, `${baseURL}${requestURL}`, requestOptions)
        
        if (res.data) {
            
            yield put(searchMaterialTypesSuccess(res.data))
        }
      
    } catch (e) {
       yield put(searchMaterialTypesFail([{message: e.message}]))
    }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions (NODE)
export function* searchNodeTypes() {
  
    
    const q = yield select(selectSearchQuery('nodeTypes'))
    const baseURL = yield select(selectBaseUrl())
    const requestURL = yield select(selectSearchUrl('nodeTypes'))
    const token = yield select(selectToken())
    const locale = yield select(selectLocale())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"application/json",
        "User-Agent": "Web App",
        "Accept-Language":locale,
        Authorization : `Token ${token}`,
        Origin : "*"
    }
    
     
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        params: { search: q },
        mode:'cors',
        credentials:'include'
    }

    try {
        
        const res = yield call(request, `${baseURL}${requestURL}`, requestOptions)
        
        if (res.data) {
            
            yield put(searchNodeTypesSuccess(res.data))
        }
      
    } catch (e) {
       yield put(searchNodeTypesFail([{message: e.message}]))
    }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions (PROGRAM)
export function* searchProgramTypes() {


    const q = yield select(selectSearchQuery('programTypes'))
    const baseURL = yield select(selectBaseUrl())
    const requestURL = yield select(selectSearchUrl('programTypes'))
    const token = yield select(selectToken())
    const locale = yield select(selectLocale())

    const myHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Web App",
        "Accept-Language": locale,
        Authorization: `Token ${token}`,
        Origin: "*"
    }


    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        params: { search: q },
        mode: 'cors',
        credentials: 'include'
    }

    try {

        const res = yield call(request, `${baseURL}${requestURL}`, requestOptions)

        if (res.data) {

            yield put(searchProgrameTypesSuccess(res.data))
        }

    } catch (e) {
        yield put(searchProgramTypesFail([{ message: e.message }]))
    }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions (WALLET)
export function* searchWalletTypes() {
  
    
    const q = yield select(selectSearchQuery('walletTypes'))
    const baseURL = yield select(selectBaseUrl())
    const requestURL = yield select(selectSearchUrl('walletTypes'))
    const token = yield select(selectToken())
    const locale = yield select(selectLocale())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"application/json",
        "User-Agent": "Web App",
        "Accept-Language":locale,
        Authorization : `Token ${token}`,
        Origin : "*"
    }
    
     
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        params: { search: q },
        mode:'cors',
        credentials:'include'
    }

    try {
        
        const res = yield call(request, `${baseURL}${requestURL}`, requestOptions)
        
        if (res.data) {
            
            yield put(searchWalletTypesSuccess(res.data))
        }
      
    } catch (e) {
       yield put(searchWalletTypesFail([{message: e.message}]))
    }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions (CERTIFICATE)
export function* searchCertificateTypes() {
  
    
    const q = yield select(selectSearchQuery('certificateTypes'))
    const baseURL = yield select(selectBaseUrl())
    const requestURL = yield select(selectSearchUrl('certificateTypes'))
    const token = yield select(selectToken())
    const locale = yield select(selectLocale())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"application/json",
        "User-Agent": "Web App",
        "Accept-Language":locale,
        Authorization : `Token ${token}`,
        Origin : "*"
    }
    
     
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        params: { search: q },
        mode:'cors',
        credentials:'include'
    }

    try {
        
        const res = yield call(request, `${baseURL}${requestURL}`, requestOptions)
        
        if (res.data) {
            
            yield put(searchCertificateTypesSuccess(res.data))
        }
      
    } catch (e) {
       yield put(searchCertificateTypesFail([{message: e.message}]))
    }
}

// worker Saga: will be fired on TABLE_AUTOCOMPLETE action
export function* searchTable(params) {
  
    const { tableType, additionalParam } = params
    const q = yield select(selectSearchQuery(tableType))
    const baseURL = yield select(selectBaseUrl())
    const requestURL = yield select(selectSearchUrl(tableType))
    const token = yield select(selectToken())
    const locale = yield select(selectLocale())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"application/json",
        "User-Agent": "Web App",
        "Accept-Language":locale,
        Authorization : `Token ${token}`,
        Origin : "*"
    }
    
     
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        params: { search: q },
        mode:'cors',
        credentials:'include'
    }

    try {
        
        const res = yield call(request, `${baseURL}${requestURL}?${additionalParam}`, requestOptions)
        
        if (res.data) {
            
            yield put(searchTableSuccess(tableType, res.data))
        }
      
    } catch (e) {
       yield put(searchTableFail(tableType, [{message: e.message}]))
    }
}