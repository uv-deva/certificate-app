import { createSelector } from 'reselect'

const selectTableData = (state) => state.table

export const selectTableDataItems = (tableType) => createSelector(
    selectTableData,
    (tableData) => {  
        return tableData[tableType].items
    }
)

export const selectDataUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].url
)

export const selectDatDeleteUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].deleteUrl
)

export const selectDatAddUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].addUrl
)

export const selectDatUpdateUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].updateUrl
)

export const selectDataImportUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].importUrl
)

export const selectSearchQuery = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].search
)


export const selectFilters = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].filters
)

export const selectSort = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].sort
)

export const selectPerPage = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].page_info.page_size
)

export const selectTableCurrentPage = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].page_info.current_page
)

export const selectTableTotalRows = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].page_info.total_rows
)

export const selectTableAddLoading = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].adding.loading
)

export const selectTableAddIsDone = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].adding.isDone
)

export const selectAddErrors = (tableType) => createSelector(
    selectTableData,
    (tableData) => {
        const validations = {}
        let errorText = ""

        if (tableData[tableType].adding.errors) {
            if (tableData[tableType].adding.errors !== null 
                && typeof (tableData[tableType].adding.errors.non_field_errors) !== 'undefined'
                && typeof (tableData[tableType].adding.errors.non_field_errors) !== 'string'
            ) {
                let html = ''

                tableData[tableType].adding.errors.non_field_errors.map((val) => {
                    html += val.message
                })

                errorText = html
            } else if (Object.keys(tableData[tableType].adding.errors).length > 0) {
                for (const k in tableData[tableType].adding.errors) {
                    validations[k] = tableData[tableType].adding.errors[k][0]
                }
            }
        }

        return {validations, errorText}
    }
)


export const selectTableUpdateLoading = (tableType, id) => createSelector(
    selectTableData,
    (tableData) => (tableData[tableType].updating[id]?.loading ? tableData[tableType].updating[id]?.loading : false)
)

export const selectTableUpdateIsDone = (tableType, id) => createSelector(
    selectTableData,
    (tableData) => (tableData[tableType].updating[id]?.isDone ? tableData[tableType].updating[id]?.isDone : false)
)

export const selectUpdateErrors = (tableType, id) => createSelector(
    selectTableData,
    (tableData) => {
        const validations = {}
        let errorText = ""

        if (tableData[tableType].updating[id]?.errors) {
            if (tableData[tableType].updating[id].errors !== null 
                && typeof (tableData[tableType].updating[id].errors.non_field_errors) !== 'undefined'
                && typeof (tableData[tableType].updating[id].errors.non_field_errors) !== 'string'
            ) {
                let html = ''

                tableData[tableType].updating[id].errors.non_field_errors.map((val) => {
                    html += val.message
                })

                errorText = html
            } else if (Object.keys(tableData[tableType].updating[id].errors).length > 0) {
                for (const k in tableData[tableType].updating[id].errors) {
                    validations[k] = tableData[tableType].updating[id].errors[k][0]
                }
            }
        }

        return {validations, errorText}
    }
)

export const selectTableImportLoading = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].import.loading
)

export const selectTableImportIsDone = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].import.isDone
)

export const selectTableImportErrors = (tableType) => createSelector(
    selectTableData,
    (tableData) => {
        const validations = {}
        let errorText = ""

        if (tableData[tableType].import.errors) {
            if (tableData[tableType].import.errors !== null 
                && typeof (tableData[tableType].import.errors.non_field_errors) !== 'undefined'
                && typeof (tableData[tableType].import.errors.non_field_errors) !== 'string'
            ) {
                let html = ''

                tableData[tableType].import.errors.non_field_errors.map((val) => {
                    html += val.message
                })

                errorText = html
            } else if (Object.keys(tableData[tableType].import.errors).length > 0) {
                for (const k in tableData[tableType].import.errors) {
                    validations[k] = tableData[tableType].import.errors[k][0]
                }
            }
        }

        return {validations, errorText}
    }
)

// device cancel
export const selectDeviceCancelUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].cancelUrl
)

export const selectDeviceCancellingMain = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].is_cancelling
)

// device pause
export const selectDevicePauseUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].pauseUrl
)

export const selectDevicePausingMain = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].is_pausing
)

// device resume
export const selectDeviceResumeUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].resumeUrl
)

export const selectDeviceResumingMain = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].is_resuming
)

export const selectDeviceToggleUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].toggleUrl
)

export const selectDeviceTogglingMain = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].is_toggling
)

export const selectTableDeletingMain = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].is_deleting
)

export const selectTableLoading = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].loading
)

export const selectTableRegisteringMain = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].is_registering
)

export const selectCellLoadingUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].cellLoadingUrl
)

export const selectCellLoading = (tableType, id) => {
    return createSelector(
        selectTableData,
        (tableData) => {
            return tableData[tableType].cellLoading[id]?.loading ? tableData[tableType].cellLoading[id]?.loading : false
        }
    )
}

export const selectRegisterUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].registerUrl
)

export const selectTableResumeLoading = (tableType) => {
    return createSelector(
        selectTableData,
        (tableData) => tableData[tableType].resuming
    )
}

export const selectTableCancelLoading = (tableType) => {
    return createSelector(
        selectTableData,
        (tableData) => tableData[tableType].cancelling
    )
}

export const selectTableExecuteLoading = (tableType) => {
    return createSelector(
        selectTableData,
        (tableData) => tableData[tableType].executing
    )
}

export const selectTablePauseLoading = (tableType) => {
    return createSelector(
        selectTableData,
        (tableData) => tableData[tableType].pausing
    )
}

export const selectTableSubmitLoading = (tableType) => {
    return createSelector(
        selectTableData,
        (tableData) => tableData[tableType].submitting
    )
}
export const selectTabelCommandUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].commandUrl
)
export const selectDatResumeUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].resumeUrl
)
export const selectDatCancelUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].cancelUrl
)
export const selectDatPauseUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].pauseUrl
)
export const selectDatExecuteUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].executeUrl
)
export const selectDatSubmitUrl = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].submitUrl
)