/* 
On loading data init request setting url for each source
params tableType : type of table data materials/partners/impacts/routes
*/
export const initTableData = (tableType, url, filters = {}) => {
  return dispatch => {
    dispatch({
      type: 'INIT_TABLE_DATA_LOAD',
      tableType,
      url,
      filters
    })
  }
}


/* 
On loading data request
params tableType : type of table data materials/partners/impacts/routes
*/
export const loadTableData = (tableType) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_DATA_LOAD',
      tableType
    })
  }
}


/* 
On loading data success
params tableType : type of table data nodes/wallets/materials/partners/impacts/routes
       data    : table results
*/
export const loadTableDataSuccess = (tableType, data) => {
    return dispatch => {
      dispatch({
        type: 'TABLE_DATA_LOAD_SUCCESS',
        tableType,
        data
      })
    }
}


/* 
On loading data fail
params tableType : type of table data materials/partners/impacts/routes
       errors    : errors
*/
export const loadTableDataFail = (tableType, errors) => {
    return dispatch => {
      dispatch({
        type: 'TABLE_DATA_LOAD_FAIL',
        tableType,
        errors
      })
    }
}

/* 
On paging table data
params tableType : type of table data materials/partners/impacts/routes
       page    : page number
*/
export const setTableDataPage = (tableType, page) => {
    return dispatch => {
      dispatch({
        type: 'TABLE_DATA_SET_PAGE',
        tableType,
        page
      })
    }
}


/* 
On changing table data page size
params tableType : type of table data materials/partners/impacts/routes
       page    : page size
*/
export const setTableDataPageSize = (tableType, size) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_DATA_CHANGE_PAGE_SIZE',
      tableType,
      size
    })
  }
}


/* 
On searching table data
params tableType : type of table data materials/partners/impacts/routes
       search    : search keyword
*/
export const ontTableDataSearch = (tableType, search) => {
    return dispatch => {
      dispatch({
        type: 'TABLE_DATA_SEARCH',
        tableType,
        search
      })
    }
}


/* 
On ordering/sorting table data
params tableType  : type of table data materials/partners/impacts/routes
       sort       : sort field
       direction  : direction field
*/
export const ontTableDataSort = (tableType, sort, direction) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_DATA_SORT',
      tableType,
      sort,
      direction
    })
  }
}


/* 
On filtering table data
params tableType  : type of table data materials/partners/impacts/routes
       filter       : filter fields
*/
export const ontTableDataFilter = (tableType, filter) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_DATA_FILTER',
      tableType,
      filter
    })
  }
}


/* 
On deleting table row
params tableType : type of table data materials/partners/impacts/routes
       rowId    : unique Id of the row
*/
export const ontTableRowDelete = (tableType, rowId) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_DELETE',
      tableType,
      rowId
    })
  }
}

/* 
On deleting table row request completed successfully
params tableType : type of table data materials/partners/impacts/routes
       rowId    : unique Id of the row
*/
export const ontTableRowDeleteSuccess = (tableType, rowId) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_DELETE_SUCCESS',
      tableType,
      rowId
    })
  }
}

/* 
On deleting table row request fails
params tableType : type of table data materials/partners/impacts/routes
       rowId    : unique Id of the row
       errors    : errors
*/
export const ontTableRowDeleteFail = (tableType, rowId, errors) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_DELETE_FAIL',
      tableType,
      rowId,
      errors
    })
  }
}


/* 
On adding table data
params tableType : type of table data materials/partners/impacts/routes
       data    : this is "any" type combination of string, number, File etc
*/
export const ontTableRowAdd = (tableType, data) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_ADD',
      tableType,
      data
    })
  }
}

/* 
On adding table data request completed successfully
params tableType : type of table data materials/partners/impacts/routes
       rowData    : added data
*/
export const ontTableRowAddSuccess = (tableType, rowData) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_ADD_SUCCESS',
      tableType,
      rowData
    })
  }
}

/* 
On adding table data request fails
params tableType : type of table data materials/partners/impacts/routes
       errors    : errors
*/
export const ontTableRowAddFail = (tableType, errors) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_ADD_FAIL',
      tableType,
      errors
    })
  }
}


/* 
On updating table row
params tableType : type of table data materials/partners/impacts/routes
       data    : this is "any" type combination of string, number, File etc
*/
export const ontTableRowUpdate = (tableType, id, data) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_UPDATE',
      tableType,
      id,
      data
    })
  }
}

/* 
On updating table row request completed successfully
params tableType : type of table data materials/partners/impacts/routes
       rowData    : added data
*/
export const ontTableRowUpdateSuccess = (tableType, id, rowData) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_UPDATE_SUCCESS',
      tableType,
      id,
      rowData
    })
  }
}

/* 
On updating table row request fails
params tableType : type of table data materials/partners/impacts/routes
       errors    : errors
*/
export const ontTableRowUpdateFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_UPDATE_FAIL',
      tableType,
      id,
      errors
    })
  }
}


/* 
On inititationg export request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onTableDataExport = (tableType, url, filters = {}) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_EXPORT',
      tableType,
      url,
      filters
    })
  }
}


/* 
On fail response of export request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onTableDataExportFail = (tableType) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_EXPORT_FAIL',
      tableType
    })
  }
}


/* 
On success response of export request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onTableDataExportSuccess = (tableType) => {
    return dispatch => {
      dispatch({
        type: 'TABLE_EXPORT_SUCCESS',
        tableType
      })
    }
}

//import

/* 
On inititationg import request for table data
params tableType : type of table data materials/partners/impacts/routes
       data : file
*/
export const onTableDataImport = (tableType, data) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_IMPORT',
      tableType,
      data
    })
  }
}


/* 
On fail response of import request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onTableDataImportFail = (tableType, errors) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_IMPORT_FAIL',
      tableType,
      errors
    })
  }
}


/* 
On success response of import request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onTableDataImportSuccess = (tableType) => {
    return dispatch => {
      dispatch({
        type: 'TABLE_IMPORT_SUCCESS',
        tableType
      })
    }
}

/* 
On updating registration
params tableType : type of table data materials/partners/impacts/routes
data    : this is "any" type combination of string, number, File etc
*/
export const onDeviceToggle = (tableType, id, data) => {
  return dispatch => {
      dispatch({
      type: 'DEVICE_TOGGLE',
      tableType,
      id,
      data
    })
  }
}
  
/* 
On updating registration request completed successfully
 params tableType : type of table data materials/partners/impacts/routes
 rowData    : added data
*/
export const onDeviceToggleSuccess = (tableType, id, rowData) => {
  return dispatch => {
    dispatch({
      type: 'DEVICE_TOGGLE_SUCCESS',
      id,
      rowData,
      tableType
    })
  }
}
  
/* 
On updating registration request fails
params tableType : type of table data materials/partners/impacts/routes
errors    : errors
*/
export const onDeviceToggleFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'DEVICE_TOGGLE_FAIL',
        id,
        errors,
        tableType
      })
    }
  }

//DEVICE_PAUSE
export const onDevicePause = (tableType, id, data) => {
  return dispatch => {
    dispatch({
      type: 'DEVICE_PAUSE',
      tableType,
      id,
      data
    })
  }
}

export const onDevicePauseSuccess = (tableType, id, rowData) => {
  return dispatch => {
      dispatch({
      type: 'DEVICE_PAUSE_SUCCESS',
      id,
      rowData,
      tableType
    })
  }
}

export const onDevicePauseFail = (tableType, id, errors) => {
  return dispatch => {
      dispatch({
      type: 'DEVICE_PAUSE_FAIL',
      id,
      errors,
      tableType
    })
  }
}

//DEVICE_RESUME
export const onDeviceResume = (tableType, id, data) => {
  return dispatch => {
      dispatch({
      type: 'DEVICE_RESUME',
      tableType,
      id,
      data
    })
  }
}

export const onDeviceResumeSuccess = (tableType, id, rowData) => {
  return dispatch => {
    dispatch({
    type: 'DEVICE_RESUME_SUCCESS',
      id,
      rowData,
      tableType
    })
  }
}

export const onDeviceResumeFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'DEVICE_RESUME_FAIL',
      id,
      errors,
      tableType
    })
  }
}

//DEVICE_CANCEL
export const onDeviceCancel = (tableType, id, data) => {
  return dispatch => {
    dispatch({
      type: 'DEVICE_CANCEL',
      tableType,
      id,
      data
    })
  }
}

export const onDeviceCancelSuccess = (tableType, id, rowData) => {
  return dispatch => {
    dispatch({
      type: 'DEVICE_CANCEL_SUCCESS',
      id,
      rowData,
      tableType
    })
  }
}

export const onDeviceCancelFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'DEVICE_CANCEL_FAIL',
      id,
      errors,
      tableType
    })
  }
}

/* 
On updating registration
params tableType : type of table data materials/partners/impacts/routes
data    : this is "any" type combination of string, number, File etc
*/
export const onTableRegister = (tableType, id, data) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_REGISTER',
      tableType,
      data,
      id
    })
  }
}
  
/* 
On updating registration request completed successfully
params tableType : type of table data materials/partners/impacts/routes
rowData    : added data
*/
export const onTableRegisterSuccess = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_REGISTER_SUCCESS',
      id,
      tableType
    })
  }
}
  
/* 
On updating registration request fails
params tableType : type of table data materials/partners/impacts/routes
errors    : errors
*/
export const onTableRegisterFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_ROW_REGISTER_FAIL',
      id,
      errors,
      tableType
    })
  }
}

//CELL_LOADING
export const onCellLoading = (tableType, id, data) => {
  return dispatch => {
    dispatch({
      type: 'CELL_LOADING',
      tableType,
      id,
      data
    })
  }
}

export const onCellLoadingSuccess = (tableType, id, rowData) => {
  return dispatch => {
    dispatch({
      type: 'CELL_LOADING_SUCCESS',
      id,
      rowData,
      tableType
    })
  }
}

export const onCellLoadingFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'CELL_LOADING_FAIL',
      id,
      errors,
      tableType
    })
  }
}

export const addMissionCommand = (tableType, data) => {
  return dispatch => {
    dispatch({
      type: 'ADD_MISSION_COMMAND', 
      data,
      tableType
    })
  }
}

export const updateMissionCommandSuccess = (tableType, id, data) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_MISSION_COMMAND_SUCCESS',
      data,
      id,
      tableType
    })
  }
}

export const updateMissionCommandFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_MISSION_COMMAND_FAILED',
      tableType,
      id,
      errors
    })
  }
}

//mission_execute
/* 
On inititationg import request for table data
params tableType : type of table data materials/partners/impacts/routes
       data : file
*/
export const onMissonExecute = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_EXECUTE',
      id,
      tableType
    })
  }
}
        
        
/* 
  On fail response of import request for table data
  params tableType : type of table data materials/partners/impacts/routes
*/
export const onMissonExecuteFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_EXECUTE_FAIL',
      errors,
      id,
      tableType        
    })
  }
}
        
        
/* 
  On success response of import request for table data
  params tableType : type of table data materials/partners/impacts/routes
*/
export const onMissonExecuteSuccess = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_EXECUTE_SUCCESS',
      id,
      tableType        
    })
  }
}

//mission_submit
/* 
On inititationg import request for table data
params tableType : type of table data materials/partners/impacts/routes
data : file
*/
export const onMissonSubmit = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_SUBMIT',
      id,
      tableType
    })
  }
}


/* 
On fail response of import request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onMissonSubmitFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_SUBMIT_FAIL',
      errors,
      id,
      tableType        
    })
  }
}


/* 
On success response of import request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onMissonSubmitSuccess = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_SUBMIT_SUCCESS',
      id,
      tableType        
    })
  }
}

//mission_pause
/* 
On inititationg import request for table data
params tableType : type of table data materials/partners/impacts/routes
data : file
*/
export const onMissonPause = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_PAUSE',
      id,
      tableType
    })
  }
}

/* 
On fail response of import request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onMissonPauseFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_PAUSE_FAIL',
      errors,
      id,
      tableType        
    })
  }
}

/* 
On success response of import request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onMissonPauseSuccess = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_PAUSE_SUCCESS',
      id,
      tableType        
    })
  }
}

//mission_resume
/* 
On inititationg import request for table data
params tableType : type of table data materials/partners/impacts/routes
data : file
*/
export const onMissonResume = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_RESUME',
      id,
      tableType
    })
  }
}

/* 
On fail response of import request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onMissonResumeFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_RESUME_FAIL',
      errors,
      id,
      tableType        
    })
  }
}

/* 
On success response of import request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onMissonResumeSuccess = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_RESUME_SUCCESS',
      id,
      tableType        
    })
  }
}

//mission_cancel
/* 
On inititationg import request for table data
params tableType : type of table data materials/partners/impacts/routes
data : file
*/
export const onMissonCancel = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_CANCEL',
      id,
      tableType
    })
  }
}

/* 
On fail response of import request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onMissonCancelFail = (tableType, id, errors) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_CANCEL_FAIL',
      errors,
      id,
      tableType        
    })
  }
}

/* 
On success response of import request for table data
params tableType : type of table data materials/partners/impacts/routes
*/
export const onMissonCancelSuccess = (tableType, id) => {
  return dispatch => {
    dispatch({
      type: 'MISSION_CANCEL_SUCCESS',
      id,
      tableType        
    })
  }
}

export const loadTableMap = (tableType) => {
  return dispatch => {
    dispatch({
    type: 'TABLE_MAP_LOAD',
    tableType
    })
  }
}

export const loadTableMapSuccess = (tableType, data) => {
  return dispatch => {
    dispatch({
      type: 'TABLE_MAP_LOAD_SUCCESS',
      tableType,
      data
    })
  }
}

export const loadTableMapFail = (tableType, errors) => {
    return dispatch => {
    dispatch({
        type: 'TABLE_MAP_LOAD_FAIL',
        tableType,
        errors
      })
    }
}
export const addWayPointsData = (id, data, tableType) => {
  return dispatch => {
    dispatch({
      type: 'ADD_WAYPOINTS',
      id,
      data,
      tableType
    })
  }
}

export const addWayPointsDataSuccess = (tableType, data) => {
  return dispatch => {
    dispatch({
      type: 'ADD_WAYPOINTS_SUCCESS',
      tableType,
      data
    })
  }
}

export const addWayPointsDataFail = (tableType, errors) => {
  return dispatch => {
    dispatch({
      type: 'ADD_WAYPOINTS_FAILED',
      tableType,
      errors
    })
  }
}

export const updateWayPointsData = (id, data, tableType) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_WAYPOINTS',
      id,
      data,
      tableType
    })
  }
}

export const updateWayPointsDataSuccess = (tableType, data) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_WAYPOINTS_SUCCESS',
      tableType,
      data
    })
  }
}

export const updateWayPointsDataFail = (tableType, errors) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_WAYPOINTS_FAILED',
      tableType,
      errors 
    })
  }
}