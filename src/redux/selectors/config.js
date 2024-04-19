import { createSelector } from 'reselect'

const selectConfig = (state) => state.config

export const selectBaseUrl = () => createSelector(
    selectConfig,
    (State) => { 
        
        return State.baseUrl
    }
)

export const selectLocale = () => createSelector(
    selectConfig,
    (State) => { 
        
        return State.locale
    }
)

