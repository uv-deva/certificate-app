import { createSelector } from 'reselect'

const selectAuth = (state) => state.auth

export const selectLoading = () => createSelector(
    selectAuth,
    (authState) => { 
        
        return authState.loading
    }
)

export const selectUserData = () => createSelector(
    selectAuth,
    (authState) => { 
        
        return authState.userData
    }
)

export const selectAbility = () => createSelector(
    selectAuth,
    (authState) => {
        
        if (authState.userData?.username) {
            // const ability = authState.userData.groups[0]
            return true //ability.action === 'manage'
        }
        return false
    }
)

export const selectIsLoggedIn = () => createSelector(
    selectAuth,
    (authState) => { return typeof (authState.userData) !== "undefined" && typeof (authState.userData?.username) !== 'undefined' }
)

export const selectToken = () => createSelector(
    selectAuth,
    (authState) => authState.accessToken
)

export const selectUsername = () => createSelector(
    selectAuth,
    (authState) => authState.userData.username
)

export const selectErrors = () => createSelector(
    selectAuth,
    (authState) => {
        const validations = {}
        let errorText = ""

        if (authState.errors !== null && authState.errors.non_field_errors && typeof (authState.errors.non_field_errors) !== 'string') {
            let html = ''

            authState.errors.non_field_errors.map((val) => {
                html += val.message
            })

            errorText = html
        } else if (Object.keys(authState.errors).length > 0) {
            for (const k in authState.errors) {
                validations[k] = authState.errors[k][0]
            }
        }

        return {validations, errorText}
    }
)

export const selectUpdateProfileLoading = () => createSelector(
    selectAuth,
    (authState) => { 
        
        return authState.updateProfile ? authState.updateProfile.loading : false
    }
)

export const selectUpdateProfileErrors = () => createSelector(
    selectAuth,
    (authState) => {
        const validations = {}
        let errorText = ""

        if (authState.updateProfile && authState.updateProfile.errors !== null && authState.updateProfile.errors.non_field_errors && typeof (authState.updateProfile.errors.non_field_errors) !== 'string') {
            let html = ''

            authState.updateProfile.errors.non_field_errors.map((val) => {
                html += val.message
            })

            errorText = html
        } else if (authState.updateProfile && Object.keys(authState.updateProfile.errors).length > 0) {
            for (const k in authState.updateProfile.errors) {
                validations[k] = authState.updateProfile.errors[k][0]
            }
        }

        return {validations, errorText}
    }
)

export const selectProfileContractDataSet = () => createSelector(
    selectAuth,
    (authState) => {
        return authState.userData?.groups[0]?.name === 'pilot' ? true : (
        !!authState.userData?.refContractFile &&
        authState.userData?.refContractFile.trim() !== '' &&
        !!authState.userData?.smart_contract_address &&
        authState.userData?.smart_contract_address.trim() !== ''
      )
    }
)

export const selectGlobalSettings = () => createSelector(
    selectAuth,
    (data) => {
        return data.globalSettings
    }
  )