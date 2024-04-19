import { createSelector } from 'reselect'

const selectProductInfoData = (state) => state.product

export const selectAddInfoUrl = (infoType) => createSelector(
    selectProductInfoData,
    (Data) => { 
        return Data[infoType].addUrl
    }
)

export const selectUpdateInfoUrl = (infoType) => createSelector(
    selectProductInfoData,
    (Data) => { 
        return Data[infoType].updateUrl
    }
)

export const selectDeleteInfoUrl = (infoType) => createSelector(
    selectProductInfoData,
    (Data) => { 
        return Data[infoType].deleteUrl
    }
)

export const selectStepsItems = (infoType) => createSelector(
    selectProductInfoData,
    (Data) => { 
        return Data[infoType].items
    }
)

export const selectAddInfoLoading = (infoType) => createSelector(
    selectProductInfoData,
    (Data) => Data[infoType].adding.loading
)

export const selectAddInfoIsDone = (infoType) => createSelector(
    selectProductInfoData,
    (Data) => Data[infoType].adding.isDone
)

export const selectAddInfoErrors = (infoType) => createSelector(
    selectProductInfoData,
    (Data) => {
        const validations = {}
        const errorText = ""


        if (Data[infoType].adding.errors) {
            if (Data[infoType].adding.errors !== null 
                && typeof (Data[infoType].adding.errors.non_field_errors) !== 'undefined'
                && typeof (Data[infoType].adding.errors.non_field_errors) !== 'string'
            ) {
                let html = ''

                Data[infoType].adding.errors.non_field_errors.map((val) => {
                    html += val.message
                })

                errorText = html
            } else if (Object.keys(Data[infoType].adding.errors).length > 0) {
                for (const k in Data[infoType].adding.errors) {
                    validations[k] = Data[infoType].adding.errors[k][0]
                }
            }
        }

        return {validations, errorText}
    }
)


export const selectUpdateInfoLoading = (id, infoType) => createSelector(
    selectProductInfoData,
    (Data) => (Data[infoType].updating[id] && Data[infoType].updating[id].loading ? Data[infoType].updating[id].loading : false)
)

export const selectUpdateInfoIsDone = (id, infoType) => createSelector(
    selectProductInfoData,
    (Data) => (Data[infoType].updating[id] && Data[infoType].updating[id].isDone ? Data[infoType].updating[id].isDone : false)
)

export const selectUpdateInfoErrors = (id, infoType) => createSelector(
    selectProductInfoData,
    (Data) => {
        
        const validations = {}
        const errorText = ""
        
           
        if (typeof Data[infoType].updating[id] !== "undefined" && typeof Data[infoType].updating[id].errors !== "undeined") {
            if (Data[infoType].updating[id].errors !== null 
                && typeof (Data[infoType].updating[id].errors.non_field_errors) !== 'undefined'
                && typeof (Data[infoType].updating[id].errors.non_field_errors) !== 'string'
            ) {
                let html = ''

                Data[infoType].updating[id].errors.non_field_errors.map((val) => {
                    html += val.message
                })

                errorText = html
            } else if (Object.keys(Data[infoType].updating[id].errors).length > 0) {
                for (const k in Data[infoType].errors) {
                    validations[k] = Data[infoType].updating[id].errors[k][0]
                }
            }
        }
        

        return {validations, errorText}
    }
)


export const selectDeleteInfoLoading = (id, infoType) => createSelector(
    selectProductInfoData,
    (Data) => (Data[infoType].deleting[id] && Data[infoType].deleting[id].loading ? Data[infoType].deleting[id].loading : false)
)

export const selectDeleteInfoIsDone = (id, infoType) => createSelector(
    selectProductInfoData,
    (Data) => (Data[infoType].deleting[id] && Data[infoType].deleting[id].isDone ? Data[infoType].deleting[id].isDone : false)
)

export const selectDeleteInfoErrors = (id, infoType) => createSelector(
    selectProductInfoData,
    (Data) => {
        const validations = {}
        const errorText = ""

        if (Data[infoType].deleting.hasOwnProperty(id) && typeof Data[infoType].deleting[id] !== "undefined" && Data.deleting[id].errors) {
            if (Data[infoType].deleting[id].errors !== null 
                && typeof (Data[infoType].deleting[id].errors.non_field_errors) !== 'undefined'
                && typeof (Data[infoType].deleting[id].errors.non_field_errors) !== 'string'
            ) {
                let html = ''

                Data[infoType].deleting[id].errors.non_field_errors.map((val) => {
                    html += val.message
                })

                errorText = html
            } else if (Object.keys(Data[infoType].deleting[id].errors).length > 0) {
                for (const k in Data[infoType].errors) {
                    validations[k] = Data[infoType].deleting[id].errors[k][0]
                }
            }
        }

        return {validations, errorText}
    }
)