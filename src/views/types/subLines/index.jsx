// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col, Badge } from 'reactstrap'
import {useIntl} from 'react-intl'

// ** Tables
import TableWithButtons from '@custom_components/Tables'

import { columns } from './data'
import ProductLineModal from './form'
import ViewModal from './view'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { initTableData, setTableDataPage, ontTableDataSearch, ontTableRowDelete, ontTableDataSort, setTableDataPageSize } from '../../../redux/actions/table'
import { 
  selectTableDataItems,
  selectPerPage,
  selectTableCurrentPage,
  selectTableTotalRows,
  selectSearchQuery
} from '../../../redux/selectors/table'

const SubLines = () => {
  const intl = useIntl()
  const [viewModal, setViewModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [rowData, setRowData] = useState(null)
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery('subLines'))
  const data = useSelector(selectTableDataItems('subLines'))
  const perPage = useSelector(selectPerPage('subLines'))
  const currentPage = useSelector(selectTableCurrentPage('subLines'))
  const totalRows = useSelector(selectTableTotalRows('subLines'))
  
  // ** Function to handle View Modal toggle
  const handleViewModal = () => { setRowData({}); setViewModal(!viewModal) }

  // ** Function to handle Modal toggle for adding new record
  const handleModal = () => { setRowData(null); setModal(!modal) }

  const setPageSize = size => {
    dispatch(setTableDataPageSize('subLines', size))
  }

  // ** Function to trigger pagination action
  const setCurrentPage = page => {
    dispatch(setTableDataPage('subLines', page))
  }

  // ** Function to trigger table search action
  const onTableSearch = keyword => {
    dispatch(ontTableDataSearch('subLines', keyword))
  }

  // ** Function to trigger table filter action
  const onTableFilter = filters => {
    dispatch()
  }

  // ** hook to init the table with type & url for populating it via saga
  useEffect(() => {
    dispatch(initTableData('subLines', 'productSubLines'))
  }, [])

  // ** renders the view modal based on modal state
  const renderViewModal = () => {
    return viewModal ? <ViewModal open={viewModal} handleModal={handleViewModal} modal={rowData} /> : null
  }

  // ** renders the modal based on modal state
  const renderModal = () => {
    return modal ? <ProductLineModal open={modal} handleModal={handleModal} modal={rowData} /> : null
  }

  // ** Function to handle delete action of the row
  // params : e = Event
  //          row = row data
  const onDelete = (e, row) => {
    e.preventDefault() 
    if (confirm(intl.formatMessage({id:"Are you sure, you want to delete?"})))  dispatch(ontTableRowDelete('subLines', row.id))
  }

  // ** Function to handle edit action of the row
  // params : e = Event
  //          row = row data  
  const onEdit = (e, row) => {
    e.preventDefault() 
    setRowData(row)
    setModal(!modal)
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
    dispatch(ontTableDataSort('subLines', column.selector, sortDirection))
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id:"Product Sub Lines"})} breadCrumbParent='System' breadCrumbActive='Product Sub Lines' />
      <Row>
        <Col sm='12'>
          <TableWithButtons
            currentPage={currentPage}
            perPage={perPage}
            data={data}
            columns={columns}  
            setCurrentPage={setCurrentPage}
            totalRows={totalRows}
            searchQuery={searchQuery}
            onSearch={onTableSearch}
            onFilter={onTableFilter}
            onSort={handleSort}
            modal={renderModal}
            handleModal={handleModal}
            addLabel={intl.formatMessage({id:"Add Product Sub Line"})}
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

export default SubLines
