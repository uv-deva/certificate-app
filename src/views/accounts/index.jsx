// ** React Imports
import { Fragment, useEffect, useState, useContext } from 'react'

// ** Utils
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { useIntl } from 'react-intl'
import { Row, Col, Badge } from 'reactstrap'

// ** Tables
import TableWithButtons from '@custom_components/Tables'

import { columns } from './data'
import PartnerModal from './form'
import ViewModal from './view'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { initTableData, setTableDataPage, ontTableDataSearch, ontTableRowDelete, ontTableDataSort, setTableDataPageSize, ontTableDataFilter } from '../../redux/actions/table'
import { 
  selectTableDataItems,
  selectPerPage,
  selectTableCurrentPage,
  selectTableTotalRows,
  selectSearchQuery
} from '../../redux/selectors/table'

const Account = () => {
  const intl = useIntl()
  const [viewModal, setViewModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [rowData, setRowData] = useState(null)
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery('partners'))
  const data = useSelector(selectTableDataItems('partners'))
  const perPage = useSelector(selectPerPage('partners'))
  const currentPage = useSelector(selectTableCurrentPage('partners'))
  const totalRows = useSelector(selectTableTotalRows('partners'))
  // ** ACL Ability Context
  const ability = useContext(AbilityContext)
  
  const filters = [
    {
      label:"Account",
      id:"create_account",
      values: [
        { value:true, label:"Yes" },
        { value:false, label:"No" }
      ]
    }
  ]
 // ** Function to handle View Modal toggle
 const handleViewModal = () => { setRowData({}); setViewModal(!viewModal) }

 // ** Function to handle Modal toggle for adding new record
 const handleModal = () => { setRowData(null); setModal(!modal) }

 const setPageSize = size => {
  dispatch(setTableDataPageSize('partners', size))
 }

 // ** Function to trigger pagination action
 const setCurrentPage = page => {
   dispatch(setTableDataPage('partners', page))
 }

 // ** Function to trigger table search action
 const onTableSearch = keyword => {
   dispatch(ontTableDataSearch('partners', keyword))
 }

 // ** Function to trigger table filter action
 const onTableFilter = filter => {
   dispatch(ontTableDataFilter('partners', filter))
 }

 // ** hook to init the table with type & url for populating it via saga
 useEffect(() => {
   dispatch(initTableData('partners', 'partners'))
 }, [])

 // ** Function to handle delete action of the row
 // params : e = Event
 //          row = row data
 const onDelete = (e, row) => {
  e.preventDefault() 
  if (confirm(intl.formatMessage({id:"Are you sure, you want to delete?"})))  dispatch(ontTableRowDelete('partners', row.id))
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
   return modal ? <PartnerModal open={modal} handleModal={handleModal} modal={rowData} /> : null
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
    dispatch(ontTableDataSort('partners', column.selector, sortDirection))
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle={<Badge style={{background:'#814B38', color:'white'}}>{intl.formatMessage({id:"Accounts"})}</Badge>} breadCrumbParent='Web3 - Services' breadCrumbActive='Accounts' />
      <Row>
        <Col sm='12'>
          <TableWithButtons
            currentPage={currentPage}
            perPage={perPage}
            onSort={handleSort}
            data={data}
            columns={columns}  
            setCurrentPage={setCurrentPage}
            totalRows={totalRows}
            searchQuery={searchQuery}
            onSearch={onTableSearch}
            onFilter={onTableFilter}
            filters={filters}
            modal={renderModal}
            handleModal={handleModal}
            handleDelete={onDelete}
            handleEdit={onEdit}
            addLabel={ability.can('add', "customuser") ? intl.formatMessage({id:"Add Account"}) : null}
            viewModal={renderViewModal}
            handleView={onView}
            setPageSize={setPageSize}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Account
