export const setLocale = (locale) => {
    return dispatch => {
      dispatch({
        type: 'SET_LOCALE',
        locale
      })
    }
  }
  