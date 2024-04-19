import { createSelector } from 'reselect'

const selectTableData = (state) => state.certificate

export const selectItems = (tableType) => createSelector(
    selectTableData,
    (tableData) => {  
        return tableData[tableType].items
    }
)

export const selectTableIsDone = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].isDone
)

export const selectItemsError = (tableType) => createSelector(
    selectTableData,
    (tableData) => tableData[tableType].errors
)