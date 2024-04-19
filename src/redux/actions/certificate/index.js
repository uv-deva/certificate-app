/* 
On downloading certificate
params id : certificate id
*/
export const downloadCertificate = (certificateId) => {
    return dispatch => {
      dispatch({
        type: 'DOWNLOAD_CERTIFICATE',
        certificateId
      })
    }
  }
  
  
/* 
On success of downloading certificate
params id : certificate id
       data     : response data
*/
export const downloadCertificateSuccess = (certificateId) => {
    return dispatch => {
        dispatch({
            type: 'DOWNLOAD_CERTIFICATE_SUCCESS',
            certificateId
        })
    }
}
  
  
/* 
On failing of downloading certificate
params id : certificate id
       errors    : errors
*/
export const downloadCertificateFail = (certificateId, errors) => {
    return dispatch => {
        dispatch({
            type: 'DOWNLOAD_CERTIFICATE_FAIL',
            certificateId,
            errors
        })
    }
}

export const getNonce = (walletAddress) => {
    return dispatch => {
      dispatch({
        type: 'GET_NONCE',
        walletAddress
      })
    }
}

export const getNonceSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: 'GET_NONCE_SUCCESS',
            data
        })
    }
}
  
/* 
On failing of downloading certificate
params id : certificate id
       errors    : errors
*/
export const getNonceFail = (errors) => {
    return dispatch => {
        dispatch({
            type: 'GET_NONCE_FAIL',
            errors
        })
    }
}

export const fetchCertificateIpfs = (data) => {
    return dispatch => {
      dispatch({
        type: 'FETCH_CERTIFICATE_IPFS',
        data
      })
    }
}

export const fetchCertificateIpfsSuccess = (data) => {
    return dispatch => {
        dispatch({
            type: 'FETCH_CERTIFICATE_IPFS_SUCCESS',
            data
        })
    }
}
  
/* 
On failing of downloading certificate
params id : certificate id
       errors    : errors
*/
export const fetchCertificateIpfsFail = (errors) => {
    return dispatch => {
        dispatch({
            type: 'FETCH_CERTIFICATE_IPFS_FAIL',
            errors
        })
    }
}