// **  Initial State
const initialState = {
    partners: {
        items:[],
        loading:false,
        search:'',
        url:'partners'
    },
    programs: {
        items: [],
        loading: false,
        search: '',
        url: 'programs'
    },
    programTypes: {
        items: [],
        loading: false,
        search: '',
        url: 'programTypes'
    },
    nodes: {
        items:[],
        loading:false,
        search:'',
        url:'nodes'
    },
    nodeTypes:{
        items:[],
        loading:false,
        search:'',
        url:'nodeTypes'
    },
    wallets: {
        items:[],
        loading:false,
        search:'',
        url:'wallets'
    },
    walletTypes:{
        items:[],
        loading:false,
        search:'',
        url:'walletTypes'
    },
    partnerGroups:{
        items:[],
        loading:false,
        search:'',
        url:'partnerGroups'
    },
    device_types: {
        items:[],
        loading:false,
        search:'',
        url:'deviceTypes'
    },
    devices: {
        items:[],
        loading:false,
        search:'',
        url:'devices'
    },
    conditions: {
        items:[],
        loading:false,
        search:'',
        url:'conditions'
    },
    scenarios: {
        items:[],
        loading:false,
        search:'',
        url:'scenarios'
    },
    commands: {
        items:[],
        loading:false,
        search:'',
        url:'commands'
    },
    requests: {
        items:[],
        loading:false,
        search:'',
        url:'requests'
    },
    mapSetting: {
        items:[],
        loading:false,
        search:'',
        url:'mapSetting'
    }
}
  
const routeReducer = (state = initialState, action) => {
    switch (action.type) {
       
        case 'MATERIAL_TYPES_SEARCH':
            return {
                ...state,
                materialTypes: {...state.materialTypes, loading:true, q: action.q}
            }
        
        case 'MATERIAL_TYPES_SEARCH_SUCCESS':
            
            return {
                ...state,
                materialTypes: {...state.materialTypes, loading:false, items: action.data.results}
            }

        case 'MATERIAL_TYPES_SEARCH_FAIL':
            return {
                ...state,
                materialTypes: {...state.materialTypes, loading:false, errors: action.errors}
            }
        case 'NODE_TYPES_SEARCH':
            return {
                ...state,
                materialTypes: {...state.nodeTypes, loading:true, q: action.q}
            }
        
        case 'NODE_TYPES_SEARCH_SUCCESS':
            
            return {
                ...state,
                nodeTypes: {...state.nodeTypes, loading:false, items: action.data.results}
            }

        case 'NODE_TYPES_SEARCH_FAIL':
            return {
                ...state,
                nodeTypes: {...state.nodeTypes, loading:false, errors: action.errors}
            }

        case 'TABLE_AUTOCOMPLETE':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], loading:true, q: action.q}
            }
        
        case 'TABLE_AUTOCOMPLETE_SUCCESS':
            
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], loading:false, items: action.data?.results ? action.data?.results : action.data.length > 0 ? action.data : []}
            }

        case 'TABLE_AUTOCOMPLETE_FAIL':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], loading:false, errors: action.errors}
            }
    

        default:
        return state
    }
}
  
  export default routeReducer
  