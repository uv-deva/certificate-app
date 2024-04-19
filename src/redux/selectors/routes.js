import { createSelector } from 'reselect'

const selectRoutesData = (state) => state.routes

export const selectSearchQuery = (key) => createSelector(
    selectRoutesData,
    (State) => { 
        return State[key].q
    }
)

export const selectSearchUrl = (key) => createSelector(
    selectRoutesData,
    (State) => { 
        return State[key].url
    }
)

export const selectData = (key) => createSelector(
    selectRoutesData,
    (State) => { 
        const html = []
        State[key].items.map(function(item) {

            html.push({...item, label:item.name, value:item.id})
        })

        return html
    }
)

export const selectDataLoading = (key) => createSelector(
    selectRoutesData,
    (State) => { 
        return State[key].loading
    }
)