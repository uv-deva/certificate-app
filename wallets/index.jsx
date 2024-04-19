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
import WalletModal from './form'
import ViewModal from './view'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { initTableData, setTableDataPage, ontTableDataSearch, ontTableRowDelete, ontTableDataSort, onTableDataExport, setTableDataPageSize } from '../../redux/actions/table'
import { 
  selectTableDataItems,
  selectPerPage,
  selectTableCurrentPage,
  selectTableTotalRows,
  selectSearchQuery
} from '../../redux/selectors/table'

const Wallets = () => {
  const intl = useIntl()
  const [viewModal, setViewModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [rowData, setRowData] = useState(null)
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery('wallets'))
  const data = useSelector(selectTableDataItems('wallets'))
  const perPage = useSelector(selectPerPage('wallets'))
  const currentPage = useSelector(selectTableCurrentPage('wallets'))
  const totalRows = useSelector(selectTableTotalRows('wallets'))
  const filters = [
    {
      label:"Status",
      values: [
        { value:0, label:"Active" },
        { value:1, label:"In Active" }
      ]
    }
  ]

  // ** Function to handle View Modal toggle
  const handleViewModal = () => { setRowData({}); setViewModal(!viewModal) }

  // ** Function to handle Modal toggle
  const handleModal = () => { setRowData(null); setModal(!modal) }

  const setPageSize = size => {
    dispatch(setTableDataPageSize('wallets', size))
  }

  const setCurrentPage = page => {
    dispatch(setTableDataPage('wallets', page))
  }

  const onTableSearch = keyword => {
    dispatch(ontTableDataSearch('wallets', keyword))
  }

  const onTableFilter = filters => {
    dispatch()
  }

  useEffect(() => {
    dispatch(initTableData('wallets', 'wallets'))
  }, [])

  // ** Function to handle delete action of the row
  // params : e = Event
  //          row = row data
  const onDelete = (e, row) => {
    e.preventDefault() 
    if (confirm(intl.formatMessage({id:"Are you sure, you want to delete?"})))  dispatch(ontTableRowDelete('wallets', row.id))
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
    return modal ? <WalletModal open={modal} handleModal={handleModal} modal={rowData} /> : null
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
    dispatch(ontTableDataSort('wallets', column.selector, sortDirection))
  }

  const exportData = () => {
    dispatch(onTableDataExport('wallets'))
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle={<Badge style={{background:'#6610f2', color:'white'}}>{intl.formatMessage({id:"Nodes"})}</Badge>} breadCrumbParent='Web3 - Services' breadCrumbActive='Wallets' />
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
            onSearch={onTableSearch}
            onFilter={onTableFilter}
            filters={filters}
            modal={renderModal}
            handleModal={handleModal}
            addLabel={intl.formatMessage({id:"Add Wallet"})}
            handleDelete={onDelete}
            handleEdit={onEdit}
            exportData={exportData}
            viewModal={renderViewModal}
            handleView={onView}
            importData={"wallets"}
            sampleImportFile={"wallets"}
            setPageSize={setPageSize}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Wallets
