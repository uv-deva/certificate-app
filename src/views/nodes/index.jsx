// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col, Badge } from 'reactstrap'
import { useIntl } from 'react-intl'

// ** Tables
import TableWithButtons from '@custom_components/Tables'

import { columns } from './data'
import NodeModal from './form'
import ViewModal from './view'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { initTableData, setTableDataPage, ontTableDataSearch, ontTableRowDelete, ontTableDataSort, onTableDataExport, setTableDataPageSize, ontTableDataFilter } from '../../redux/actions/table'
import { 
  selectTableDataItems,
  selectPerPage,
  selectTableCurrentPage,
  selectTableTotalRows,
  selectSearchQuery
} from '../../redux/selectors/table'

const Nodes = () => {
  const intl = useIntl()
  const [viewModal, setViewModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [rowData, setRowData] = useState(null)
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery('nodes'))
  const data = useSelector(selectTableDataItems('nodes'))
  const perPage = useSelector(selectPerPage('nodes'))
  const currentPage = useSelector(selectTableCurrentPage('nodes'))
  const totalRows = useSelector(selectTableTotalRows('nodes'))
  const filters = [
    {
      label:"Status",
      id:"status",
      values: [
        { value:true, label:"Active" },
        { value:false, label:"In Active" }
      ]
    }
  ]

  // ** Function to handle View Modal toggle
  const handleViewModal = () => { setRowData({}); setViewModal(!viewModal) }

  // ** Function to handle Modal toggle
  const handleModal = () => { setRowData(null); setModal(!modal) }

  const setPageSize = size => {
    dispatch(setTableDataPageSize('nodes', size))
  }

  const setCurrentPage = page => {
    dispatch(setTableDataPage('nodes', page))
  }

  const onTableSearch = keyword => {
    dispatch(ontTableDataSearch('nodes', keyword))
  }

  const onTableFilter = filter => {
    dispatch(ontTableDataFilter('nodes', filter))
  }

  useEffect(() => {
    dispatch(initTableData('nodes', 'nodes'))
  }, [])

  // ** Function to handle delete action of the row
  // params : e = Event
  //          row = row data
  const onDelete = (e, row) => {
    e.preventDefault() 
    if (confirm(intl.formatMessage({id:"Are you sure, you want to delete?"})))  dispatch(ontTableRowDelete('nodes', row.id))
  }

  // ** Function to handle edit action of the row
  // params : e = Event
  //          row = row data  
  const onEdit = (e, row) => {
    e.preventDefault() 
    setViewModal(false)
    setRowData(row)
    setModal(!modal)
  }


  // ** renders the view modal based on modal state
  const renderViewModal = () => {
    return viewModal ? <ViewModal open={viewModal} onEdit={onEdit} handleModal={handleViewModal} modal={rowData} /> : null
  }

  // ** renders the modal based on modal state
  const renderModal = () => {
    return modal ? <NodeModal open={modal} handleModal={handleModal} modal={rowData} /> : null
  }
  

  // ** Function to handle view action of the row
  // params : e = Event
  //          row = row data  
  const onView = (e, row) => {
    e.preventDefault() 
    setRowData({...row})
    setViewModal(!viewModal)
  }


  // ** Function to handle sort action of the rows
  // params : column = name of the field
  //          direction = Sort Direction
  const handleSort = (column, sortDirection) => {
    dispatch(ontTableDataSort('nodes', column.selector, sortDirection))
  }

  const exportData = () => {
    dispatch(onTableDataExport('nodes'))
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle={<Badge style={{background:'#6610f2', color:'white'}}>{intl.formatMessage({id:"Nodes"})}</Badge>} breadCrumbParent='Web3 - Services' breadCrumbActive='Nodes' />
      <Row>
        <Col sm='12'>
          <TableWithButtons
            currentPage={currentPage}
            perPage={perPage}
            data={data}
            onSort={handleSort}
            columns={columns}  
            setCurrentPage={setCurrentPage}
            totalRows={totalRows}
            searchQuery={searchQuery}
            onFilter={onTableFilter}
            filters={filters}
            modal={renderModal}
            handleModal={handleModal}
            addLabel={intl.formatMessage({id:"Add Node"})}
            handleDelete={onDelete}
            handleEdit={onEdit}
            viewModal={renderViewModal}
            handleView={onView}
            setPageSize={setPageSize}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Nodes
