// **  Initial State
const initialState = {
    download:{},
    nonce:{
        loading:false,
        isDone:false,
        errors:[],
        items:[]
    },
    ipfs:{
        loading:false,
        isDone:false,
        errors:[],
        items:[]
    }
}
  
const certificateReducer = (state = initialState, action) => {

    const { certificateId } = action
    
    switch (action.type) {
        case 'DOWNLOAD_CERTIFICATE':
            return {
                ...state,
                download:{
                    [certificateId] : {
                        loading:true, 
                        isDone:false,
                        errors:[] 
                    }
                }
            }
        
        case 'DOWNLOAD_CERTIFICATE_SUCCESS':

            return {
                ...state,
                download:{
                    [certificateId] : {
                        loading:false, 
                        isDone:true, 
                        errors:[]
                    }
                }
               
            }

        case 'DOWNLOAD_CERTIFICATE_FAIL':
            return {
                ...state,
                download:{
                    [certificateId] : {
                        loading:false, 
                        isDone:false, 
                        errors:action.errors
                    }
                }
                
            }
            case 'GET_NONCE':
                return {
                    ...state,
                    nonce:{
                        ...state['nonce'],
                        loading:true, 
                        isDone:false
                    }            
                }
            case 'GET_NONCE_SUCCESS':
                return {
                    ...state,
                    nonce:{
                        ...state['nonce'],
                        items:action.data['nonce_token'],
                        loading:false, 
                        isDone:true
                    }            
                }
            case 'GET_NONCE_FAIL':
                return {
                    ...state,
                    nonce:{
                        ...state['nonce'],
                        loading:false, 
                        isDone:false, 
                        errors:action.errors
                    }            
                }
            case 'FETCH_CERTIFICATE_IPFS':
                return {
                    ...state,
                    ipfs:{
                        ...state['ipfs'],
                        loading:true, 
                        isDone:false
                    }            
                }
            case 'FETCH_CERTIFICATE_IPFS_SUCCESS':
                return {
                    ...state,
                    ipfs:{
                        ...state['ipfs'],
                        items:action.data["Certificate Image"],
                        loading:false, 
                        isDone:true
                    }            
                }
            case 'FETCH_CERTIFICATE_IPFS_FAIL':
                return {
                    ...state,
                    ipfs:{
                        ...state['ipfs'],
                        loading:false, 
                        isDone:false, 
                        errors:action.errors
                    }            
                }
        default:
        return state
    }
}
  
  export default certificateReducer
  