
import { call, put, select } from 'redux-saga/effects'
import request from '@src/utility/request'
import { selectBaseUrl, selectLocale } from '../../selectors/config'
import { selectToken } from '../../selectors/auth'
import { downloadCertificateFail, downloadCertificateSuccess, getNonceFail, getNonceSuccess, fetchCertificateIpfsFail, fetchCertificateIpfsSuccess } from '../../actions/certificate'
import moment from 'moment'

// worker Saga: will be fired on DOWNLOAD_CERTIFICATE action
function generateCertificate(response, certificateId) {

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${certificateId}${moment().format()}.pdf`) //or any other extension
    document.body.appendChild(link)
    link.click()

}

// worker Saga: will be fired on TABLE_EXPORT_FAIL action
export function* downloadCertificateData(params) {
    const { certificateId } = params
    const requestURL = yield select(selectBaseUrl())
    const locale = yield select(selectLocale())
    const token = yield select(selectToken())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"application/json",
        "Accept-Language":locale,
        "User-Agent": "Web App",
        Authorization: `Token ${token}`,
        Origin : "*"
    }
    
     
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        mode:'cors',
        credentials:'include'
    }

    try {
        
        const res = yield call(request, `${requestURL}certificateDownload/${certificateId}`, requestOptions)
        
        if (res.data) {
            yield put(downloadCertificateSuccess(certificateId))
            generateCertificate(res, certificateId)
        }
      
    } catch (e) {
       yield put(downloadCertificateFail(certificateId,  [{message: e.message}]))
    }
}

export function* getNonce(params) {
    const { walletAddress } = params
    const requestURL = yield select(selectBaseUrl())
    const locale = yield select(selectLocale())
    const token = yield select(selectToken())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"application/json",
        "Accept-Language":locale,
        "User-Agent": "Web App",
        // Authorization: `Token ${token}`,
        Origin : "*"
    }

    const formdata = new FormData()
    formdata.append('wallet_address', walletAddress)
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data: formdata,
        mode:'cors',
        credentials:'include'
    }
    try {
        
        const res = yield call(request, `${requestURL}generateNonce/`, requestOptions)
        
        if (res.data) {
            yield put(getNonceSuccess(res.data))
        }
      
    } catch (e) {
       yield put(getNonceFail([{message: e.message}]))
    }
}

export function* fetchCertificateIpfs(params) {
    const { certificateId, data } = params
    const requestURL = yield select(selectBaseUrl())
    const locale = yield select(selectLocale())
    const token = yield select(selectToken())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"application/json",
        "Accept-Language":locale,
        "User-Agent": "Web App",
        // Authorization: `Token ${token}`,
        Origin : "*"
    }
    
    const formdata = new FormData()
    formdata.append('wallet_address', data.walletAddress)
    formdata.append('signature', data.signature)
    formdata.append('certificate_id', data.certificateId)
     
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data:formdata,
        mode:'cors',
        credentials:'include'
    }
    try {
        
        const res = yield call(request, `${requestURL}ipfs-metadata/`, requestOptions)
        
        if (res.data && res.status === 200) {
            yield put(fetchCertificateIpfsSuccess(res.data))
        } else {
            yield put(fetchCertificateIpfsFail([{message: res.data.message}]))
        }
      
    } catch (e) {
       yield put(fetchCertificateIpfsFail(certificateId,  [{message: e.message}]))
    }
}