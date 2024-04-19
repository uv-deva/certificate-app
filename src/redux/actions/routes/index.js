
  
  // ** Search Partner
  export const searchPartners = (q) => {
    return dispatch => {
      dispatch({
        type: 'PARTNERS_SEARCH',
        q
      })
    }
  }
  
  // ** Table data load success
  export const searchPartnersSuccess = data => {
      return dispatch => {
        dispatch({
          type: 'PARTNERS_SEARCH_SUCCESS',
          data
        })
      }
  }
  
  
  // ** Table data load fail
  export const searchPartnersFail = errors => {
      return dispatch => {
        dispatch({
          type: 'PARTNERS_SEARCH_FAIL',
          errors
        })
      }
  }

// ** Search Program
export const searchProgram = (q) => {
  return dispatch => {
    dispatch({
      type: 'PROGRAM_SEARCH',
      q
    })
  }
}

// ** Table data load success
export const searchProgramSuccess = data => {
  return dispatch => {
    dispatch({
      type: 'PROGRAM_SEARCH_SUCCESS',
      data
    })
  }
}


// ** Table data load fail
export const searchProgramFail = errors => {
  return dispatch => {
    dispatch({
      type: 'PROGRAM_SEARCH_FAIL',
      errors
    })
  }
}

  // ** Search Impact
  export const searchImpact = (q) => {
    return dispatch => {
      dispatch({
        type: 'IMPACT_SEARCH',
        q
      })
    }
  }
      
    // ** Impact data load success
  export const searchImpactSuccess = data => {
      return dispatch => {
        dispatch({
          type: 'IMPACT_SEARCH_SUCCESS',
          data
        })
      }
  }
    
    
  // ** Impact data load fail
  export const searchImpactFail = errors => {
      return dispatch => {
        dispatch({
          type: 'IMPACT_SEARCH_FAIL',
          errors
        })
      }
  }


  // ** Search Material
  export const searchMaterial = (q) => {
    return dispatch => {
      dispatch({
        type: 'MATERIAL_SEARCH',
        q
      })
    }
  }
      
  // ** Impact data load success
  export const searchMaterialSuccess = data => {
      return dispatch => {
        dispatch({
          type: 'MATERIAL_SEARCH_SUCCESS',
          data
        })
      }
  }
      
      
  // ** Impact data load fail
  export const searchMaterialFail = errors => {
      return dispatch => {
        dispatch({
          type: 'MATERIAL_SEARCH_FAIL',
          errors
        })
      }
  }


  // ** Search Material
  export const searchMaterialTypes = (q) => {
    return dispatch => {
      dispatch({
        type: 'MATERIAL_TYPES_SEARCH',
        q
      })
    }
  }
      
  // ** Impact data load success
  export const searchMaterialTypesSuccess = data => {
      return dispatch => {
        dispatch({
          type: 'MATERIAL_TYPES_SEARCH_SUCCESS',
          data
        })
      }
  }
      
      
  // ** Impact data load fail
  export const searchMaterialTypesFail = errors => {
      return dispatch => {
        dispatch({
          type: 'MATERIAL_TYPES_SEARCH_FAIL',
          errors
        })
      }
  }
  
    // ** Search Node
    export const searchNodeTypes = (q) => {
      return dispatch => {
        dispatch({
          type: 'NODE_TYPES_SEARCH',
          q
        })
      }
    }
        
    // ** Impact data load success
    export const searchNodeTypesSuccess = data => {
        return dispatch => {
          dispatch({
            type: 'NODE_TYPES_SEARCH_SUCCESS',
            data
          })
        }
    }
        
        
    // ** Impact data load fail
    export const searchNodeTypesFail = errors => {
        return dispatch => {
          dispatch({
            type: 'NODE_TYPES_SEARCH_FAIL',
            errors
          })
        }
    }

      // ** Search Program
      export const searchProgramTypes = (q) => {
        return dispatch => {
          dispatch({
            type: 'PROGRAM_TYPES_SEARCH',
            q
          })
        }
      }

      // ** Impact data load success
      export const searchProgramTypesSuccess = data => {
        return dispatch => {
          dispatch({
            type: 'PROGRAM_TYPES_SEARCH_SUCCESS',
            data
          })
        }
      }


      // ** Impact data load fail
      export const searchProgramTypesFail = errors => {
        return dispatch => {
          dispatch({
            type: 'PROGRAM_TYPES_SEARCH_FAIL',
            errors
          })
        }
      }

      // ** Search Wallet
      export const searchWalletTypes = (q) => {
        return dispatch => {
          dispatch({
            type: 'WALLET_TYPES_SEARCH',
            q
          })
        }
      }
          
      // ** Wallet data load success
      export const searchWalletTypesSuccess = data => {
          return dispatch => {
            dispatch({
              type: 'WALLET_TYPES_SEARCH_SUCCESS',
              data
            })
          }
      }
          
          
      // ** Wallet data load fail
      export const searchWalletTypesFail = errors => {
          return dispatch => {
            dispatch({
              type: 'WALLET_TYPES_SEARCH_FAIL',
              errors
            })
          }
      }
 
      // ** Search Certificate
      export const searchCertificateTypes = (q) => {
        return dispatch => {
          dispatch({
            type: 'CERTIFICATE_TYPES_SEARCH',
            q
          })
        }
      }
          
      // ** Certificate data load success
      export const searchCertificateTypesSuccess = data => {
          return dispatch => {
            dispatch({
              type: 'CERTIFICATE_TYPES_SEARCH_SUCCESS',
              data
            })
          }
      }
          
          
      // ** Certificate data load fail
      export const searchCertificateTypesFail = errors => {
          return dispatch => {
            dispatch({
              type: 'CERTIFICATE_TYPES_SEARCH_FAIL',
              errors
            })
          }
      }

   // ** Init Search Action for autocomplete data for dropdown
   export const searchTable = (tableType, q, additionalParam = null) => {
    return dispatch => {
      dispatch({
        type: 'TABLE_AUTOCOMPLETE',
        tableType,
        q,
        additionalParam
      })
    }
  }
      
  // ** Search Action for autocomplete data for dropdown success
  export const searchTableSuccess = (tableType, data) => {
      return dispatch => {
        dispatch({
          type: 'TABLE_AUTOCOMPLETE_SUCCESS',
          tableType,
          data
        })
      }
  }
      
      
  // ** Search Action for autocomplete data for dropdown fail
  export const searchTableFail = (tableType, errors) => {
      return dispatch => {
        dispatch({
          type: 'TABLE_AUTOCOMPLETE_FAIL',
          tableType,
          errors
        })
      }
  }