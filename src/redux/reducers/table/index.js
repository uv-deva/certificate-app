// **  Initial State
const initialState = {
    materials:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'materialCreate',
        updateUrl:'materialUpdate',
        deleteUrl:'materialDelete',
        importUrl:'materialsImport',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    materialTypes:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    nodes:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'nodeCreate',
        updateUrl:'nodeUpdate',
        deleteUrl:'nodeDelete',
        importUrl:'nodesImport',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    nodeTypes:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    programs: {
        items: [],
        loading: true,
        errors: [],
        page_info: {
            page_size: 10,
            current_page: 1,
            total_rows: 0
        },
        search: '',
        url: '',
        addUrl: 'programCreate',
        updateUrl: 'programUpdate',
        deleteUrl: 'programDelete',
        importUrl: 'programImport',
        adding: {
            loading: false,
            isDone: false,
            errors: []
        },
        import: {
            loading: false,
            isDone: false,
            errors: []
        },
        updating: {},
        deleting: {}
    },
    programTypes: {
        items: [],
        loading: true,
        errors: [],
        page_info: {
            page_size: 10,
            current_page: 1,
            total_rows: 0
        },
        search: '',
        url: '',
        addUrl: '',
        updateUrl: '',
        deleteUrl: '',
        adding: {
            loading: false,
            isDone: false,
            errors: []
        },
        updating: {},
        deleting: {}
    },
    wallets:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'walletCreate',
        updateUrl:'walletUpdate',
        deleteUrl:'walletDelete',
        importUrl:'walletsImport',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    walletTypes:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    certificateTypes:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'certificateTypeCreate',
        updateUrl:'certificateTypeUpdate',
        deleteUrl:'certificateTypeDelete',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    partners:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'partnerUpdate',
        importUrl:'partnersImport',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{},
        registering:{},
        registerUrl: 'registerAccount', 
        is_registering: false,
        cellLoadingUrl: 'partner/cellLoading',
        cellLoading: []
    },
    certificates:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        importUrl:'impactCriteriasImport',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    routes:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    productLines:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    subLines:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    receipts:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    receiptsHistory:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    processings:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'processingCreate',
        updateUrl:'processingUpdate',
        deleteUrl:'processingDelete',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    deliveries:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'deliveryCreate',
        updateUrl:'deliveryUpdate',
        deleteUrl:'deliveryDelete',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    stepsAssigned:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    receiptsAssigned:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    processingsAssigned:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    deliveriesAssigned:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'',
        updateUrl:'',
        deleteUrl:'',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{}
    },
    devices:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'deviceCreate',
        updateUrl:'deviceUpdate',
        deleteUrl:'deviceDelete',
        importUrl:'deviceImport',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{},
        registering:{},
        registerUrl: 'registerDevice', 
        is_registering: false,
        toggling:{},
        toggleUrl: 'toggleMode', 
        is_toggling: false,
        pausing:{},
        pauseUrl: 'devicePause', 
        is_pausing: false,
        resuming:{},
        resumeUrl: 'deviceResume', 
        is_resuming: false,
        cancelling:{},
        cancelUrl: 'deviceCancel', 
        is_cancelling: false,
        cellLoadingUrl: 'device/cellLoading',
        cellLoading: [],
        is_deleting: false
    },
    scenarios:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'scenarioCreate',
        updateUrl:'scenarioUpdate',
        deleteUrl:'deviceDelete',
        importUrl:'deviceImport',
        executeUrl: 'scenarioExecute',
        submitUrl: 'scenarioSubmit',
        pauseUrl: 'scenarioPause',
        resumeUrl: 'scenarioResume',
        cancelUrl: 'scenarioCancel',
        commandUrl:'aiCreateExecuteCommand',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        registering:{},
        registerUrl: 'registerMission', 
        is_registering: false,
        updating:{},
        deleting:{},
        execute:{},
        submitting: false,
        executing: false,
        pausing: false,
        resuming: false,
        cancelling: false,
        commandSubmitting: false,
        cellLoadingUrl: 'scenario/cellLoading',
        cellLoading: [],
        is_deleting: false
    },
    conditions:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'conditionCreate',
        updateUrl:'conditionUpdate',
        deleteUrl:'deviceDelete',
        importUrl:'deviceImport',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{},
        is_deleting: false
    },
    commands:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'commandCreate',
        updateUrl:'commandUpdate',
        deleteUrl:'deviceDelete',
        importUrl:'deviceImport',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{},
        is_deleting: false
    },
    requestsLogs:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'requestCreate',
        updateUrl:'requestUpdate',
        deleteUrl:'deviceDelete',
        importUrl:'deviceImport',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{},
        is_deleting: false
    },
    mapSetting:{
        items: [],
        loading:true,
        errors:[],
        page_info:{
            page_size:10,
            current_page:1,
            total_rows:0
        },
        search:'',
        url:'',
        addUrl:'waypointsCreate',
        updateUrl:'waypointsUpdate',
        deleteUrl:'deviceDelete',
        importUrl:'waypoints',
        adding:{
            loading:false,
            isDone:false,
            errors:[]
        },
        import:{
            loading:false,
            isDone:false,
            errors:[]
        },
        updating:{},
        deleting:{},
        is_deleting: false
    }
}
  
const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_TABLE_DATA_LOAD':
            const  { url } = action
            const  crudUrl = url.substring(0, url.length - 1)
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], url, deleteUrl:`${crudUrl}Delete`, addUrl:`${crudUrl}Create`, updateUrl:`${crudUrl}Update`, errors:[], sort:{}, filters: action.filters }
            }
        case 'TABLE_DATA_LOAD':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], loading:true, errors:[] }
            }
        
        case 'TABLE_DATA_LOAD_SUCCESS':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    items: action.data.results,
                    page_info: {
                        page_size:action.data.page_size || 10, 
                        current_page:action.data.current_page,
                        total_rows:action.data.count
                    },
                    loading:false,
                    errors:[]
                }
                
            }

        case 'TABLE_DATA_LOAD_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    errors:action.errors,
                    loading:false 
                }
                
            }

        case 'TABLE_DATA_SET_PAGE':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    page_info: { ...state[action.tableType].page_info, current_page: action.page }
                }
            }
            
        case 'TABLE_DATA_CHANGE_PAGE_SIZE':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    page_info: { ...state[action.tableType].page_info, page_size: action.size }
                }
            }

        
        case 'TABLE_DATA_SEARCH':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    search: action.search
                }
                
            }

        case 'TABLE_DATA_SORT':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    sort: {sort : action.sort, dir: action.direction}
                }
                
            }

        case 'TABLE_DATA_FILTER':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    filters: {...state[action.tableType].filters, ...action.filter}
                }
                
            }
    

        case 'TABLE_ROW_DELETE':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    deleting:{...state[action.tableType].deleting,  [action.rowId] : { loading:true, errors:[] } }
                }
                
            }
        case 'TABLE_ROW_DELETE_SUCCESS':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    items : state[action.tableType].items.filter((o) => o.id !== action.rowId),
                    deleting:{...state[action.tableType].deleting,  [action.rowId] : { loading:false, errors:[] } }
                }
                
            }
        case 'TABLE_ROW_DELETE_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    deleting:{...state[action.tableType].deleting,  [action.rowId] : { loading:false, errors:action.errors } }
                }
                
            }
        case 'TABLE_ROW_ADD':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    adding:{ isDone:false, loading:true, errors:[] }
                }
                
            }
        case 'TABLE_ROW_ADD_SUCCESS':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    items : [...state[action.tableType].items, action.rowData],
                    adding:{ isDone:true, loading:false, errors:[] }
                }
                
            }
        case 'TABLE_ROW_ADD_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    adding:{ isDone:false, loading:false, errors:action.errors }
                }
                
            }
        case 'TABLE_ROW_UPDATE':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    updating:{...state[action.tableType].updating, [action.id]:{ isDone:false, loading:true, errors:[] } }
                }
                
            }
        case 'TABLE_ROW_UPDATE_SUCCESS':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    items : state[action.tableType].items.map((o) =>  { if (o.id === action.id) return action.rowData; else return o }),
                    updating:{...state[action.tableType].updating, [action.id]:{ isDone:true, loading:false, errors:[] } }
                }
                
            }
        case 'TABLE_ROW_UPDATE_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    updating:{...state[action.tableType].updating, [action.id]:{ isDone:false, loading:false, errors:action.errors } }
                }
                
            }
        //import
        case 'TABLE_IMPORT':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    import:{...state[action.tableType].import, isDone:false, loading:true, errors:[] }
                }
                
            }
        case 'TABLE_IMPORT_SUCCESS':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    import :{...state[action.tableType].import, isDone:true, loading:false, errors:[] }
                }
                
            }
        case 'TABLE_IMPORT_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    import:{...state[action.tableType].import, isDone:false, loading:false, errors:action.errors }
                }
                
            }
        case 'DEVICE_TOGGLE':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_toggling:true,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:true, isDone: false }}
                }
            }
        case 'DEVICE_TOGGLE_SUCCESS':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], is_toggling:false, errors:[] }
            }
        case 'DEVICE_TOGGLE_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_toggling:false,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:false, isDone: true }}
                }
            }

        // device pause
        case 'DEVICE_PAUSE':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_pausing:true,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:true, isDone: false }}
                }
            }
        case 'DEVICE_PAUSE_SUCCESS':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], is_pausing:false, errors:[] }
            }
        case 'DEVICE_PAUSE_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_pausing:false,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:false, isDone: true }}
                }
            }
        // device resume
        case 'DEVICE_RESUME':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_resuming:true,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:true, isDone: false }}
                }
            }
        case 'DEVICE_RESUME_SUCCESS':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], is_resuming:false, errors:[] }
            }
        case 'DEVICE_RESUME_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_resuming:false,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:false, isDone: true }}
                }
            }
        // device cancel
        case 'DEVICE_CANCEL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_cancelling:true,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:true, isDone: false }}
                }
            }
        case 'DEVICE_CANCEL_SUCCESS':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], is_cancelling:false, errors:[] }
            }
        case 'DEVICE_CANCEL_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_cancelling:false,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:false, isDone: true }}
                }
            }
        case 'TABLE_ROW_REGISTER':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_registering:true,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:true, isDone: false }}
                 }
            }
        case 'TABLE_ROW_REGISTER_SUCCESS':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_registering:false,
                    errors:[]
                }
            }
        case 'TABLE_ROW_REGISTER_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    is_registering:false,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:false, isDone: true } }
                 }
            }
        // cell 
        case 'CELL_LOADING':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:true, isDone: false } }
                }
            }
        case 'CELL_LOADING_SUCCESS':
            const { tableType, id, rowData } = action
        
            return {
                ...state,
                [tableType]: {
                    ...state[tableType],
                    cellLoading: {
                        ...state[tableType].cellLoading,
                        [id]: { loading: false, isDone: true }
                    },
                    items: state[tableType].items.map(item => (
                        item.id === id ? { ...item, ...rowData, isDone: true, loading: false, errors: [] } : item
                        )
                    )
                }
            }
        case 'CELL_LOADING_FAIL':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], 
                    cellLoading: [{[action.rowId]: {loading: false,  errors:[]}}]
             }  
            }
        //misson pause
        case 'MISSION_PAUSE':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    pausing:true,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:true, isDone: false }}
                }
            }
        case 'MISSION_PAUSE_SUCCESS':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], pausing:false, errors:[] }
            }
        case 'MISSION_PAUSE_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    pausing:false,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:false, isDone: true }}
                }
            }
        //misson resume
        case 'MISSION_RESUME':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    resuming:true,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:true, isDone: false }}
                }
            }
        case 'MISSION_RESUME_SUCCESS':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], resuming:false, errors:[] }
            }
        case 'MISSION_RESUME_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    resuming:false,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:false, isDone: true }}
                }
            }
        //misson cancel
        case 'MISSION_CANCEL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    cancelling:true,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:true, isDone: false }}
                }
            }
        case 'MISSION_CANCEL_SUCCESS':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], cancelling:false, errors:[] }
            }
        case 'MISSION_CANCEL_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    cancelling:false,
                    errors:[],
                    cellLoading:{...state[action.tableType].cellLoading, [action.id]:{ loading:false, isDone: true }}
                }
            }
        case 'TABLE_MAP_LOAD':
            return {
                ...state,
                [action.tableType]: {...state[action.tableType], loading:true, errors:[] }
            }

        case 'TABLE_MAP_LOAD_SUCCESS':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    items: action.data.results,
                    loading:false,
                    errors:[]
                }            
            }

        case 'TABLE_MAP_LOAD_FAIL':
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    errors:action.errors,
                    loading:false 
                }    
            }

        case 'ADD_WAYPOINTS':
            return {
                ...state,
                [action.tableType]:{...state[action.tableType],  adding:{ isDone:false, loading:true, errors:[] }}
            }

        case 'ADD_WAYPOINTS_SUCCESS':      
            return {
                ...state,
                [action.tableType]:{...state[action.tableType],  adding:{ isDone:true, loading:false, errors:[] }}
            }
                
        case 'ADD_WAYPOINTS_FAILED':          
            return {
                ...state,
                [action.tableType]:{...state[action.tableType],  adding:{ isDone:false, loading:false, errors:action.errors  }}
            }
                
        case 'UPDATE_WAYPOINTS':
            return {
                ...state,
                ...state[action.tableType],
                updating:{...state[action.tableType].updating, [action.id]:{ isDone:false, loading:true, errors:[] }}
            }

        case 'UPDATE_WAYPOINTS_SUCCESS':      
            return {
                ...state,
                [action.tableType]: {
                    ...state[action.tableType],
                    items : state[action.tableType].items.map((o) => {
                        if (o.id === action.data.id) return {...o, show_waypoints: action.data.show_waypoints, show_waypoints_lable: action.data.show_waypoints_lable, upload_waypoints: action.data.upload_waypoints, map_icon_color: action.data.map_icon_color, map_icon_type: action.data.map_icon_type}
                    else return o 
                    }),
                    updating:{...state[action.tableType].updating, [action.data.id]:{ isDone:true, loading:false, errors:[] } }
                }
            }
            
            case 'UPDATE_WAYPOINTS_FAILED':          
                return {
                    ...state,
                    [action.tableType]: {
                        ...state[action.tableType],
                        updating:{...state[action.tableType].updating, [action.data.id]:{ isDone:false, loading:false, errors:action.errors } }
                    }
                }
                case 'ADD_MISSION_COMMAND':
                    return {
                        ...state,
                        [action.tableType]: {
                            ...state[action.tableType],
                            updating:{...state[action.tableType].updating, [action.data.mission]:{ isDone:false, loading:true, errors:action.errors }}
                        }
                    }
                
                case 'UPDATE_MISSION_COMMAND_SUCCESS':
                    return {
                        ...state,
                        [action.tableType]: {
                            ...state[action.tableType],
                            items : state[action.tableType].items.map((o) =>  { 
                                if (o.id === action.id) return {...o, command: action.data.execute_data}
                                else return o
                            }),
                            updating:{...state[action.tableType].updating, [action.id]:{ isDone:true, loading:false, errors:action.errors }}
                        }
                    }
                    
                case 'UPDATE_MISSION_COMMAND_FAIL':
                    return {
                        ...state,
                        [action.tableType]: {
                            ...state[action.tableType], 
                            updating:{...state[action.tableType].updating, [action.id]:{ isDone:false, loading:false, errors:action.errors }}
                        }
                    }
        default:
        return state
    }
}
  
  export default tableReducer
  