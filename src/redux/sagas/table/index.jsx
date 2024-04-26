import moment from 'moment'
import { call, put, select } from 'redux-saga/effects'
import request from '@src/utility/request'
import { 
    loadTableData,
    loadTableDataFail,
    loadTableDataSuccess,
    ontTableRowDeleteSuccess,
    ontTableRowDeleteFail,
    ontTableRowAddSuccess,
    ontTableRowAddFail,
    ontTableRowUpdateSuccess,
    ontTableRowUpdateFail,
    onTableDataExportFail,
    onTableDataExportSuccess,
    onTableDataImportSuccess,
    onTableDataImportFail,
    onDeviceToggleSuccess,
    onDeviceToggleFail,
    onDevicePauseSuccess,
    onDevicePauseFail,
    onDeviceResumeSuccess,
    onDeviceResumeFail,
    onDeviceCancelSuccess,
    onDeviceCancelFail,
    onTableRegisterSuccess,
    onTableRegisterFail,
    onCellLoading,
    onCellLoadingFail,
    onCellLoadingSuccess,
    onMissonExecuteSuccess,
    onMissonExecuteFail,
    onMissonSubmitSuccess,
    onMissonSubmitFail,
    onMissonPauseFail,
    onMissonPauseSuccess,
    onMissonResumeFail,
    onMissonResumeSuccess,
    onMissonCancelFail,
    onMissonCancelSuccess,
    updateMissionCommandSuccess,
    updateMissionCommandFail,
    loadTableMap,
    loadTableMapSuccess,
    loadTableMapFail,
    addWayPointsDataSuccess,
    addWayPointsDataFail,
    updateWayPointsDataSuccess,
    updateWayPointsDataFail
} from '../../actions/table'
import { 
    selectTableCurrentPage,
    selectPerPage, 
    selectSearchQuery,
    selectDataUrl,
    selectDatDeleteUrl,
    selectDatAddUrl,
    selectDatUpdateUrl,
    selectSort,
    selectFilters,
    selectDataImportUrl,
    selectCellLoadingUrl,
    selectDeviceToggleUrl,
    selectDevicePauseUrl,
    selectDeviceResumeUrl,
    selectDeviceCancelUrl,
    selectRegisterUrl,
    selectTabelCommandUrl,
    selectDatPauseUrl,
    selectDatResumeUrl,
    selectDatCancelUrl,
    selectDatExecuteUrl,
    selectDatSubmitUrl
} from '../../selectors/table'
import { selectBaseUrl, selectLocale } from '../../selectors/config'
import ToastContent from '../../../components/Toast'
import { toast, Slide } from 'react-toastify'
import { selectToken, selectProfileContractDataSet } from '../../selectors/auth'
import { doLogout } from '../../actions/auth'


// worker Saga: will be fired on TABLE_LOAD_DATA action
export function* fetchData(params) {
    const { tableType } = params
    const search = yield select(selectSearchQuery(tableType))
    const filters = yield select(selectFilters(tableType))
    const sort = yield select(selectSort(tableType))
    const page = yield select(selectTableCurrentPage(tableType))
    const perPage = yield select(selectPerPage(tableType))
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDataUrl(tableType))
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
    
    //eslint-disable-next-line
    let  queryParams = {
        page, 
        search,
        page_size:perPage,
        ...filters
    }
    //eslint-enable
    
    if (sort.sort) {
        queryParams['ordering'] = `${sort.dir === "desc" ? "-" : ''}${sort.sort}`
    }
    
     
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        params: queryParams,
        mode:'cors',
        credentials:'include'
    }

    try {
        
        const res = yield call(request, `${requestURL}${dataURL}`, requestOptions)

        if (res?.status && res?.status === 401) {
            yield put(doLogout())
        }
        
        if (res.data) {
            //console.log(res.data)
            yield put(loadTableDataSuccess(tableType, res.data))
        }
      
    } catch (e) {
       yield put(loadTableDataFail(tableType, [{message: e.message}]))
    }
}

// worker Saga: will be fired on INIT_TABLE_DATA_LOAD action
export function* initData(params) {
    const { tableType, filters } = params
    yield put(loadTableData(tableType))
}

// worker Saga: will be fired on TABLE_DATA_SET_PAGE action
export function* pageData(params) {
    const { tableType } = params
    yield put(loadTableData(tableType))
}

// worker Saga: will be fired on TABLE_DATA_CHANGE_PAGE_SIZE action
export function* pageSize(params) {
    const { tableType } = params
    yield put(loadTableData(tableType))
}

// worker Saga: will be fired on TABLE_DATA_SEARCH action
export function* searchData(params) {
    const { tableType } = params
    yield put(loadTableData(tableType))
}


// worker Saga: will be fired on TABLE_DATA_SORT action
export function* sortData(params) {
    const { tableType } = params
    yield put(loadTableData(tableType))
}

// worker Saga: will be fired on TABLE_DATA_FILTER action
export function* filterData(params) {
    const { tableType } = params
    yield put(loadTableData(tableType))
}


// worker Saga: will be fired on TABLE_LOAD_DATA action
export function* deleteRowData(params) {
    const { tableType, rowId } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDatDeleteUrl(tableType))
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
        method: 'DELETE',
        headers: myHeaders,
        mode:'cors',
        credentials:'include'
    }

    try {
        
        const res = yield call(request, `${requestURL}${dataURL}/${rowId}`, requestOptions)
        console.log(res) 
        if (res.data) {
            
            yield put(ontTableRowDeleteSuccess(tableType, rowId))
        }
      
    } catch (e) {
       yield put(ontTableRowDeleteFail(tableType, [{message: e.message}]))
    }
}

// worker Saga: will be fired on TABLE_ROW_ADD action
export function* addData(params) {
    const { tableType, data } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDatAddUrl(tableType))
    const locale = yield select(selectLocale())
    const token = yield select(selectToken())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
        "Accept-Language":locale,
        "User-Agent": "Web App",
        Authorization: `Token ${token}`,
        Origin : "*"
    }

    try {
    
    /*eslint-disable */
    let formdata = new FormData()
    for (let k in data) {
        console.log('here')
       
        if (typeof data[k] !=="undefined" && data[k] !== null && data[k].toString.call(data[k]).slice(8, -1) === 'FileList') {
            for(const i in data[k]) {
                if ( data[k][i].type)  formdata.append(k, data[k][i], data[k][i].name)
            }
        } 
        else if (typeof data[k] !=="undefined" && data[k] !== null && data[k].length && data[k].map) {
            data[k].map((item) => {
                formdata.append(k, item)
            })
        }
        else if (typeof data[k] !=="undefined" && data[k] !== null) formdata.append(k, data[k])
    
    }
    /*eslint-enable */

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data:formdata,
        mode:'cors',
        credentials:'include'
    }
        
        const res = yield call(request, `${requestURL}${dataURL}/`, requestOptions)
        
        if (res.data?.id) {
            
            yield put(ontTableRowAddSuccess(tableType, res.data))
        } else {
            yield put(ontTableRowAddFail(tableType, res.data))
            toast.error(
                <ToastContent type="error" title="Ooops!" body={res.data.message === 'gas required exceeds allowance (20783)' ? "Insufficient Balance" : res.data.message } />,
                { transition: Slide, hideProgressBar: true }
            )
        }
        
      
    } catch (e) {
       yield put(ontTableRowAddFail(tableType, [{message: e.message}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}


// worker Saga: will be fired on TABLE_ROW_UPDATE action
export function* updateData(params) {
    const { tableType, id, data } = params
   
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDatUpdateUrl(tableType))
    const locale = yield select(selectLocale())
    const token = yield select(selectToken())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
        "Accept-Language":locale,
        "User-Agent": "Web App",
        Authorization: `Token ${token}`,
        Origin : "*"
    }

    /*eslint-disable */
    let formdata = new FormData()
    
    
    for (let k in data) {
        
        if (typeof data[k] !=="undefined" && data[k].toString.call(data[k]).slice(8, -1) === 'FileList') {
            for(const i in data[k]) {
                if ( data[k][i].type)  formdata.append(k, data[k][i], data[k][i].name)
            }
        } 
        else if (typeof data[k] !=="undefined" && typeof data[k] !=="undefined" && data[k].length && data[k].map) {
            data[k].map((item) => {
                formdata.append(k, item)
            })
        }
        else if (typeof data[k] !=="undefined") formdata.append(k, data[k])
    
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
        
        const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
        
        if (res.data?.id) {
            
            yield put(ontTableRowUpdateSuccess(tableType, id, res.data))
        } else  {
            yield put(ontTableRowUpdateFail(tableType, id, res.data))

            toast.error(
                <ToastContent type="error" title="Ooops!" body={res.data} />,
                { transition: Slide, hideProgressBar: true }
            )
        }
        
      
    } catch (e) {
       yield put(ontTableRowUpdateFail(tableType, id, [{message: e.message}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}


function exportCsvData(response, tableType) {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${tableType}${moment().format()}.csv`) //or any other extension
    document.body.appendChild(link)
    link.click()
}

// worker Saga: will be fired on TABLE_EXPORT_FAIL action
export function* exportData(params) {
    const { tableType } = params
    const search = yield select(selectSearchQuery(tableType))
    const filters = yield select(selectFilters(tableType))
    const sort = yield select(selectSort(tableType))
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDataUrl(tableType))
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
    
    //eslint-disable-next-line
    let  queryParams = {
        search,
        ...filters
    }
    //eslint-enable
    
    if (sort.sort) {
        queryParams['ordering'] = `${sort.dir === "desc" ? "-" : ''}${sort.sort}`
    }
    
     
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        params: queryParams,
        mode:'cors',
        credentials:'include'
    }

    try {
        
        const res = yield call(request, `${requestURL}${dataURL}Export/`, requestOptions)
        
        if (res.data) {
            yield put(onTableDataExportSuccess(tableType))
            exportCsvData(res, tableType)
        }
      
    } catch (e) {
       yield put(onTableDataExportFail(tableType))
    }
}

// worker Saga: will be fired on TABLE_IMPORT action
export function* importData(params) {
    const { tableType, data } = params
    const requestURL = yield select(selectBaseUrl())
    const importUrl = yield select(selectDataImportUrl(tableType))
    const locale = yield select(selectLocale())
    const token = yield select(selectToken())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
        "Accept-Language":locale,
        "User-Agent": "Web App",
        Authorization: `Token ${token}`,
        Origin : "*"
    }

    try {
    
    /*eslint-disable */
    let formdata = new FormData()
    for (let k in data) {
        console.log(data[k])
       
        if (typeof data[k] !=="undefined" && data[k].toString.call(data[k]).slice(8, -1) === 'FileList') {
            
            if ( data[k][0].type)  formdata.append(k, data[k][0], data[k][0].name)
            
        } 
    
    }
    /*eslint-enable */

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data:formdata,
        mode:'cors',
        credentials:'include'
    }
        
        const res = yield call(request, `${requestURL}${importUrl}/`, requestOptions)
        
        if (res.data?.status === "successfully imported") {
            
            yield put(onTableDataImportSuccess(tableType))
            yield put(loadTableData(tableType))

            toast.error(
                <ToastContent type="success" title="Hurray!" body={res.data?.status} />,
                { transition: Slide, hideProgressBar: true }
            )

        } else yield put(onTableDataImportFail(tableType, res.data))
        
      
    } catch (e) {
       yield put(onTableDataImportFail(tableType, [{message: e.message}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}

// worker Saga: will be fired on DEVICE_TOGGLE action
export function* toggleDevice(params) {
    const { tableType, data, id } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDeviceToggleUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    try {
    /*eslint-disable */
    let formdata = new FormData()
    /*eslint-enable */

    formdata.append('mode', data.mode)
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data: formdata,
        mode:'cors',
        credentials:'include'
    }

    // check if the user have the smart contract address and the abi file set
    if (!profileContractDataSet) {
        yield put(onDeviceToggleFail(tableType, { errors: { message: 'Data missing' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Smart contract data missing'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        return
    }

    const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
    if (res?.data?.status === true || res?.data?.status === false) {
        yield put(onDeviceToggleSuccess(tableType, id))
        // yield put(loadTableData(tableType))
        yield put(onCellLoading(tableType, id))

        toast.success(
            <ToastContent
                type="success"
                title={`Mode Updated!`}
                body={res?.data?.message}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 
    if (res?.data?.error === true) {
        yield put(onDeviceToggleFail(tableType, { errors: { message: 'failed to change mode' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Failed to change mode'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 
    } catch (e) {
       yield put(onDeviceToggleFail(tableType, id, [{message: 'Failed to change mode'}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={'Failed to change mode'} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}

// worker Saga: will be fired on DEVICE_PAUSE action
export function* pauseDevice(params) {
    const { tableType, data, id } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDevicePauseUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    try {
    /*eslint-disable */
    let formdata = new FormData()
    /*eslint-enable */

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data,
        mode:'cors',
        credentials:'include'
    }

    // check if the user have the smart contract address and the abi file set
    if (!profileContractDataSet) {
        yield put(onDevicePauseFail(tableType, { errors: { message: 'Data missing' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Smart contract data missing'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        return
    }

    const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
    if (res?.data?.status === true) {
        yield put(onDevicePauseSuccess(tableType, id))
        // yield put(loadTableData(tableType))
        yield put(onCellLoading(tableType, id))

        toast.success(
            <ToastContent
                type="success"
                title={`Device paused!`}
                body={res?.data?.message}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 
    if (res?.data?.status === false) {
        yield put(onDevicePauseFail(tableType, { errors: { message: 'failed to pause device' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Failed to pause device'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 
    } catch (e) {
       yield put(onDevicePauseFail(tableType, id, [{message: 'Failed to pause device'}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={'Failed to pause device'} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}

// worker Saga: will be fired on DEVICE_RESUME action
export function* resumeDevice(params) {
    const { tableType, data, id } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDeviceResumeUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    try {
    /*eslint-disable */
    let formdata = new FormData()
    /*eslint-enable */

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data,
        mode:'cors',
        credentials:'include'
    }

    // check if the user have the smart contract address and the abi file set
    if (!profileContractDataSet) {
        yield put(onDeviceResumeFail(tableType, { errors: { message: 'Data missing' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Smart contract data missing'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        return
    }

    const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
    if (res?.data?.status === true) {
        yield put(onDeviceResumeSuccess(tableType, id))
        // yield put(loadTableData(tableType))
        yield put(onCellLoading(tableType, id))

        toast.success(
            <ToastContent
                type="success"
                title={`Device Resumed!`}
                body={res?.data?.message}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } else {
        yield put(onDeviceResumeFail(tableType, { errors: { message: 'failed to resume device' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Failed to resume device'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 
    } catch (e) {
       yield put(onDeviceResumeFail(tableType, id, [{message: 'Failed to resume device'}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={'Failed to resume device'} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}

// worker Saga: will be fired on DEVICE_CANCEL action
export function* cancelDevice(params) {
    const { tableType, data, id } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDeviceCancelUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    try {
    /*eslint-disable */
    let formdata = new FormData()
    /*eslint-enable */

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data,
        mode:'cors',
        credentials:'include'
    }

    // check if the user have the smart contract address and the abi file set
    if (!profileContractDataSet) {
        yield put(onDeviceCancelFail(tableType, { errors: { message: 'Data missing' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Smart contract data missing'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        return
    }

    const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
    if (res?.data?.status === true) {
        yield put(onDeviceCancelSuccess(tableType, id))
        // yield put(loadTableData(tableType))
        yield put(onCellLoading(tableType, id))

        toast.success(
            <ToastContent
                type="success"
                title={`Mode Updated!`}
                body={res?.data?.message}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 
    if (res?.data?.status === false) {
        yield put(onDeviceCancelFail(tableType, { errors: { message: 'failed to cancel device' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Failed to cancel device'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 
    } catch (e) {
       yield put(onDeviceCancelFail(tableType, id, [{message: 'Failed to cancel device'}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={'Failed to cancel device'} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}

// worker Saga: will be fired on TABLE_ROW_REGISTER action
export function* registerTable(params) {
    const { tableType, data, id } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectRegisterUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())
    
    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    try {
    /*eslint-disable */
    let formdata = new FormData()

    formdata.append('register', data['register']);
    /*eslint-enable */

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data: formdata,
        mode:'cors',
        credentials:'include'
    }
    
    // check if the user have the smart contract address and the abi file set
    if (!profileContractDataSet) {
        yield put(onTableRegisterFail(tableType, { errors: { message: 'Data missing' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Smart contract data missing'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        return
    }
    
    const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
    if (res?.data?.status === true || res?.data?.status === false) {
        yield put(onTableRegisterSuccess(tableType, id))
        yield put(loadTableData(tableType))
        // yield put(onCellLoading(tableType, id))
        toast.success(
            <ToastContent
                type="success"
                title={`Status Updated!`}
                body={res?.data?.message}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 
    
    if (res?.data?.error === true) {
        yield put(onTableRegisterFail(tableType, { errors: { message: 'failed to register' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Failed to register'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 
    } catch (e) {
       console.log('error is', e)
       yield put(onTableRegisterFail(tableType, id, [{message: 'Failed to register'}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={'Failed to register'} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}

// worker Saga: will be fired on CELL_LOADING action
export function* cellLoading(params) {
    const { tableType, data, id } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectCellLoadingUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    try {
    /*eslint-disable */
    let formdata = new FormData()
    /*eslint-enable */

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        data,
        mode:'cors',
        credentials:'include'
    }

    // check if the user have the smart contract address and the abi file set
    if (!profileContractDataSet) {
        yield put(onCellLoadingFail(tableType, { errors: { message: 'Data missing' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Smart contract data missing'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        return
    }

    const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
    if (res?.data?.data?.id) {
        yield put(onCellLoadingSuccess(tableType, id, res?.data?.data))
    } 
    if (res?.data?.status === false) {
        yield put(onCellLoadingFail(tableType, { errors: { message: 'failed to load data' } }))
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Failed to load data'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 
    } catch (e) {
       yield put(onCellLoadingFail(tableType, id, [{message: 'Failed to load data'}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={'Failed to load data'} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}

export function* addMissionCommand(params) {
    const { data, tableType } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectTabelCommandUrl(tableType))
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

    formdata.append('mission', data.mission);
    formdata.append('device', data.refDevice);
    formdata.append('message', data.message);
    formdata.append('ai_command_execution', data.ai_command_execution);

    /*eslint-enable */
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      data: formdata,
      mode: 'cors',
      credentials: 'include'
    }
  
    try {
  
      const res = yield call(request, `${requestURL}${dataURL}/`, requestOptions)
  
      if (res.status === 200) {
  
        yield put(updateMissionCommandSuccess(tableType, data.mission, res.data))
        toast.success(
          <ToastContent
            type="success"
            title={`Profile Updated`}
            body="You have successfully updated contract data!"
          />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
  
      } else if (res.data?.status === "fail") {
        yield put(updateMissionCommandFail(tableType, data.mission, { errors: { message: res.data.message } }))
  
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
      yield put(updateMissionCommandFail(tableType, [{ message: e.message }]))
  
      toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
      )
    }
  }
// worker Saga: will be fired on MISSION_EXECUTE action
export function* executeData(params) {
    console.log('payload', params)
    const { tableType, id, data } = params
   
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDatExecuteUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    /*eslint-disable */
    let formdata = new FormData()
    /*eslint-enable */
     
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data:formdata,
        mode:'cors',
        credentials:'include'
    }

    try {
        // check if the user have the smart contract address and the abi file set
        if (!profileContractDataSet) {
            yield put(onMissonExecuteFail(tableType, { errors: { message: 'Data missing' } }))
            toast.error(
                <ToastContent
                    type="error"
                    title={`OOOPS!`}
                    body={'Smart contract data missing'}
                />,
                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            return
        }

        const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
        if (!res.data.errors) {
            yield put(onMissonExecuteSuccess(tableType, id))
            yield put(loadTableData(tableType))
            // yield put(onCellLoading(tableType, id))
            
            toast.success(
                <ToastContent type="success" title="Success" body={'Misson Executed!'} />,
                { transition: Slide, hideProgressBar: true }
            )
        } else  {
            yield put(onMissonExecuteFail(tableType, id, res?.data?.errors))

            toast.error(
                <ToastContent type="error" title="Ooops!" body={res?.data?.errors?.message ?? 'Failed to execute misson!'} />,
                { transition: Slide, hideProgressBar: true }
            )
        }
    } catch (e) {
       yield put(onMissonExecuteFail(tableType, id, [{message: e.message}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}
// worker Saga: will be fired on MISSION_SUBMIT action
export function* submitData(params) {
    console.log('payload', params)
    const { tableType, id } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDatSubmitUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    /*eslint-disable */
    let formdata = new FormData()
    /*eslint-enable */
     
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data:formdata,
        mode:'cors',
        credentials:'include'
    }

    try {
        // check if the user have the smart contract address and the abi file set
        if (!profileContractDataSet) {
            yield put(onMissonSubmitFail(tableType, { errors: { message: 'Data missing' } }))
            toast.error(
                <ToastContent
                    type="error"
                    title={`OOOPS!`}
                    body={'Smart contract data missing'}
                />,
                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            return
        }

        const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
        if (!res.data.errors) {
            yield put(onMissonSubmitSuccess(tableType, id))
            yield put(loadTableData(tableType))

            toast.success(
                <ToastContent type="success" title="Success" body={'Misson Submitted!'} />,
                { transition: Slide, hideProgressBar: true }
            )
        } else  {
            yield put(onMissonSubmitFail(tableType, id, res?.data?.errors))

            toast.error(
                <ToastContent type="error" title="Ooops!" body={res?.data?.errors?.message ?? 'Failed to submit misson!'} />,
                { transition: Slide, hideProgressBar: true }
            )
        }
    } catch (e) {
       yield put(onMissonSubmitFail(tableType, id, [{message: e.message}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}
// worker Saga: will be fired on MISSION_PAUSE action
export function* pauseData(params) {
    const { tableType, id, data } = params
   
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDatPauseUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    /*eslint-disable */
    let formdata = new FormData()
    /*eslint-enable */
     
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data:formdata,
        mode:'cors',
        credentials:'include'
    }

    try {
        // check if the user have the smart contract address and the abi file set
        if (!profileContractDataSet) {
            yield put(onMissonPauseFail(tableType, { errors: { message: 'Data missing' } }))
            toast.error(
                <ToastContent
                    type="error"
                    title={`OOOPS!`}
                    body={'Smart contract data missing'}
                />,
                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            return
        }

        const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
        if (!res.data.errors) {
            yield put(onMissonPauseSuccess(tableType, id))
            // yield put(loadTableData(tableType))
            yield put(onCellLoading(tableType, id))

            toast.success(
                <ToastContent type="success" title="Success" body={'Misson Paused!'} />,
                { transition: Slide, hideProgressBar: true }
            )
        } else  {
            yield put(onMissonPauseFail(tableType, id, res?.data?.errors))

            toast.error(
                <ToastContent type="error" title="Ooops!" body={res?.data?.errors?.message ?? 'Failed to pause misson!'} />,
                { transition: Slide, hideProgressBar: true }
            )
        }
    } catch (e) {
       yield put(onMissonPauseFail(tableType, id, [{message: e.message}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}

// worker Saga: will be fired on MISSION_PAUSE action
export function* resumeData(params) {
    const { tableType, id, data } = params
   
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDatResumeUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    /*eslint-disable */
    let formdata = new FormData()
    /*eslint-enable */
     
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data:formdata,
        mode:'cors',
        credentials:'include'
    }

    try {
        // check if the user have the smart contract address and the abi file set
        if (!profileContractDataSet) {
            yield put(onMissonResumeFail(tableType, { errors: { message: 'Data missing' } }))
            toast.error(
                <ToastContent
                    type="error"
                    title={`OOOPS!`}
                    body={'Smart contract data missing'}
                />,
                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            return
        }

        const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
        if (!res.data.errors) {
            yield put(onMissonResumeSuccess(tableType, id))
            yield put(onCellLoading(tableType, id))

            toast.success(
                <ToastContent type="success" title="Success" body={'Misson Resumed!'} />,
                { transition: Slide, hideProgressBar: true }
            )
        } else  {
            yield put(onMissonResumeFail(tableType, id, res?.data?.errors))

            toast.error(
                <ToastContent type="error" title="Ooops!" body={res?.data?.errors?.message ?? 'Failed to resume misson!'} />,
                { transition: Slide, hideProgressBar: true }
            )
        }
    } catch (e) {
       yield put(onMissonResumeFail(tableType, id, [{message: e.message}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}

// worker Saga: will be fired on MISSION_PAUSE action
export function* cancelData(params) {
    const { tableType, id, data } = params
   
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDatCancelUrl(tableType))
    const token = yield select(selectToken())
    const profileContractDataSet = yield select(selectProfileContractDataSet())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
       "User-Agent": "Web App",
        Authorization: `Token ${token}`,
       Origin : "*"
    }

    /*eslint-disable */
    let formdata = new FormData()
    /*eslint-enable */
     
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data:formdata,
        mode:'cors',
        credentials:'include'
    }

    try {
        // check if the user have the smart contract address and the abi file set
        if (!profileContractDataSet) {
            yield put(onMissonCancelFail(tableType, { errors: { message: 'Data missing' } }))
            toast.error(
                <ToastContent
                    type="error"
                    title={`OOOPS!`}
                    body={'Smart contract data missing'}
                />,
                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            return
        }

        const res = yield call(request, `${requestURL}${dataURL}/${id}`, requestOptions)
        if (!res.data.errors) {
            yield put(onMissonCancelSuccess(tableType, id))
            yield put(onCellLoading(tableType, id))

            toast.success(
                <ToastContent type="success" title="Success" body={'Misson Cancelled!'} />,
                { transition: Slide, hideProgressBar: true }
            )
        } else  {
            yield put(onMissonCancelFail(tableType, id, res?.data?.errors))

            toast.error(
                <ToastContent type="error" title="Ooops!" body={res?.data?.errors?.message ?? 'Failed to cancel misson!'} />,
                { transition: Slide, hideProgressBar: true }
            )
        }
    } catch (e) {
       yield put(onMissonCancelFail(tableType, id, [{message: e.message}]))

       toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
        )
    }
}
export function* fetchMapData(params) {
    const { tableType } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDataImportUrl(tableType))
    const token = yield select(selectToken())

    const myHeaders = { 
        Accept: "application/json",
        "Content-Type":"application/json",
        "User-Agent": "Web App",
        Authorization: `Token ${token}`,
        Origin : "*"
    }

    //eslint-enable
     
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        params: "",
        mode:'cors',
        credentials:'include'
    }

    try {
        
        const res = yield call(request, `${requestURL}${dataURL}`, requestOptions)
        
        if (res.data) {
            //console.log(res.data)
            yield put(loadTableMapSuccess(tableType, res.data))
        }
      
    } catch (e) {
       yield put(loadTableMapFail(tableType, [{message: e.message}]))
    }
}

export function* addWayPoints(params) {
    const { id, data, tableType } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDatAddUrl(tableType))
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

    const file = data['formData'].wayPointsFile[0];

    formdata.append('mission', id);
    formdata.append('show_waypoints', data['showWayPoints']);
    formdata.append('show_waypoints_label', data['showWayPointsLabel']);
    formdata.append('map_icon_color', JSON.parse(data['formData'].iconColor).id);
    formdata.append('map_icon_type', JSON.parse(data['formData'].iconType).id);
    formdata.append('upload_waypoints', file, file.name);

    /*eslint-enable */
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      data: formdata,
      mode: 'cors',
      credentials: 'include'
    }
  
    try {
  
      const res = yield call(request, `${requestURL}${dataURL}/`, requestOptions)
  
      if (res.data) {
  
        yield put(addWayPointsDataSuccess(tableType, res.data))
        yield put(loadTableMap(tableType))
        toast.success(
          <ToastContent
            type="success"
            title={`Profile Updated`}
            body="You have successfully updated contract data!"
          />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
  
      } else if (res.data?.status === "fail") {
        yield put(addWayPointsDataFail(tableType, { errors: { message: res.data.message } }))
  
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
      yield put(addWayPointsDataFail(tableType, [{ message: e.message }]))
  
      toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
      )
    }
  }

export function* updateWayPoints(params) {
    const { id, data, tableType } = params
    const requestURL = yield select(selectBaseUrl())
    const dataURL = yield select(selectDatUpdateUrl(tableType))
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

    const file = data['formData'].wayPointsFile[0];

    if (data.formData.wayPointsFile.length > 0) { formdata.append('upload_waypoints', file, file.name) }
    formdata.append('show_waypoints', data['showWayPoints'])
    formdata.append('show_waypoints_lable', data['showWayPointsLabel'])
    formdata.append('map_icon_color', JSON.parse(data['formData'].iconColor).length > 0 ? JSON.parse(data['formData'].iconColor)[0].id : JSON.parse(data['formData'].iconColor).id)
    formdata.append('map_icon_type', JSON.parse(data['formData'].iconType).length > 0 ? JSON.parse(data['formData'].iconType)[0].id : JSON.parse(data['formData'].iconType).id)
    /*eslint-enable */
  
    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      data: formdata,
      mode: 'cors',
      credentials: 'include'
    }
  
    try {
  
      const res = yield call(request, `${requestURL}${dataURL}/${id}/`, requestOptions)
  
      if (res.data) {
  
        yield put(updateWayPointsDataSuccess(tableType, res.data))
        yield put(loadTableMap(tableType))
        toast.success(
          <ToastContent
            type="success"
            title={`Map settings Updated`}
            body="You have successfully updated Map settings data!"
          />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
  
      } else {
        yield put(updateWayPointsDataFail(tableType, { errors: { message: res.data.message } }))
  
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
      yield put(updateWayPointsDataFail(tableType, [{ message: e.message }]))
  
      toast.error(
        <ToastContent type="error" title="Ooops!" body={e.message} />,
        { transition: Slide, hideProgressBar: true }
      )
    }
  }