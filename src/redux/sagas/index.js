/**
 *  Redux saga class init
 */
 import { takeEvery, all, takeLatest } from 'redux-saga/effects'
 import loginSaga, { AllLogoutUserAsync, changePasswordAsync, logoutUser, updateProfile, updateSmartContractProfile, getGlobalSettings } from './auth'
 import { fetchData, initData, pageData, searchData, deleteRowData, addData, updateData, sortData, exportData, importData, pageSize, filterData, toggleDevice, pauseDevice, resumeDevice, cancelDevice, registerTable, cellLoading, executeData, submitData, pauseData, resumeData, cancelData, addMissionCommand, fetchMapData, addWayPoints, updateWayPoints } from './table'
 import { searchMaterialTypes, searchTable } from './routes'
import { downloadCertificateData, getNonce, fetchCertificateIpfs } from './certificate'

 
 export default function* watch() {
  yield takeEvery('INIT_TABLE_DATA_LOAD', initData)
  yield takeEvery('TABLE_DATA_LOAD', fetchData)
  yield takeEvery('TABLE_DATA_SET_PAGE', pageData)
  yield takeEvery('TABLE_DATA_CHANGE_PAGE_SIZE', pageSize)
  yield takeLatest('TABLE_DATA_SEARCH', searchData)
  yield takeLatest('TABLE_DATA_SORT', sortData)
  yield takeLatest('TABLE_DATA_FILTER', filterData)
  yield takeLatest('TABLE_ROW_ADD', addData)
  yield takeLatest('TABLE_ROW_UPDATE', updateData)
  yield takeLatest('TABLE_ROW_DELETE', deleteRowData)
  yield all([takeLatest('MATERIAL_TYPES_SEARCH', searchMaterialTypes)])
  yield all([takeLatest('TABLE_AUTOCOMPLETE', searchTable)])
  yield takeEvery('LOGIN_REQUEST', loginSaga)
  yield takeEvery('LOGOUT_REQUEST', logoutUser)
  yield takeEvery('LOGOUT_ALL_REQUEST', AllLogoutUserAsync)
  yield takeEvery('PASSWORD_UPDATE', changePasswordAsync)
  yield takeEvery('UPDATE_PROFILE', updateProfile)
  yield takeEvery('UPDATE_SMART_CONTRACT_PROFILE', updateSmartContractProfile)
  yield takeEvery('GET_GLOBAL_SETTINGS', getGlobalSettings)
  yield takeEvery('TABLE_EXPORT', exportData)
  yield takeEvery('TABLE_IMPORT', importData)
  yield takeEvery('DOWNLOAD_CERTIFICATE', downloadCertificateData)
  yield takeLatest('DEVICE_TOGGLE', toggleDevice)
  yield takeLatest('DEVICE_PAUSE', pauseDevice)
  yield takeLatest('DEVICE_RESUME', resumeDevice)
  yield takeLatest('DEVICE_CANCEL', cancelDevice)
  yield takeLatest('MISSION_EXECUTE', executeData)
  yield takeLatest('MISSION_SUBMIT', submitData)
  yield takeLatest('MISSION_PAUSE', pauseData)
  yield takeLatest('MISSION_RESUME', resumeData)
  yield takeLatest('MISSION_CANCEL', cancelData)
  yield takeLatest('TABLE_ROW_REGISTER', registerTable)
  yield takeEvery('CELL_LOADING', cellLoading)
  yield takeEvery('ADD_MISSION_COMMAND', addMissionCommand)
  yield takeEvery('TABLE_MAP_LOAD', fetchMapData)
  yield takeEvery('ADD_WAYPOINTS', addWayPoints)
  yield takeEvery('UPDATE_WAYPOINTS', updateWayPoints)
  yield takeEvery('GET_NONCE', getNonce)
  yield takeEvery('FETCH_CERTIFICATE_IPFS', fetchCertificateIpfs)

 }
 