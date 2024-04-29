// ** React Imports
import { Fragment, useEffect, useState, useContext } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Utils
import { AbilityContext } from '@src/utility/context/Can'

// ** Third Party Components
import { useIntl } from 'react-intl'
import { Row, Col, Badge } from 'reactstrap'

// ** Tables
import TableWithButtons from '@custom_components/Tables'

import { columns } from './data'
import CertificateModal from './form'
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
import { selectUserData } from "../../redux/selectors/auth"

const Certificate = () => {
  const intl = useIntl()
  const [viewModal, setViewModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [rowData, setRowData] = useState(null)
  const dispatch = useDispatch()
  const userData = useSelector(selectUserData())
  const searchQuery = useSelector(selectSearchQuery('certificates'))
  const data = useSelector(selectTableDataItems('certificates'))
  const perPage = useSelector(selectPerPage('certificates'))
  const currentPage = useSelector(selectTableCurrentPage('certificates'))
  const totalRows = useSelector(selectTableTotalRows('certificates'))
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

  // ** ACL Ability Context
  const ability = useContext(AbilityContext)

  // ** Function to handle View Modal toggle
  const handleViewModal = () => { setRowData({}); setViewModal(!viewModal) }

  // ** Function to handle Modal toggle
  const handleModal = () => { setRowData(null); setModal(!modal) }

  const setPageSize = size => {
    dispatch(setTableDataPageSize('certificates', size))
  }

  const setCurrentPage = page => {
    dispatch(setTableDataPage('certificates', page))
  }

  const onTableSearch = keyword => {
    dispatch(ontTableDataSearch('certificates', keyword))
  }

  const onTableFilter = filter => {
    dispatch(ontTableDataFilter('certificates', filter))
  }

  useEffect(() => {
    dispatch(initTableData('certificates', 'certificates'))
  }, [])

  // ** Function to handle delete action of the row
  // params : e = Event
  //          row = row data
  const onDelete = (e, row) => {
    e.preventDefault() 
    if (confirm(intl.formatMessage({id:"Are you sure, you want to delete?"})))  dispatch(ontTableRowDelete('certificates', row.id))
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
    return modal ? <CertificateModal open={modal} handleModal={handleModal} modal={rowData} /> : null
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
    dispatch(ontTableDataSort('certificates', column.selector, sortDirection))
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle={<Badge style={{background:'#0c5bcf', color:'white'}}>{intl.formatMessage({id:"Certificates"})}</Badge>} breadCrumbParent='Web3 - Services' breadCrumbActive='Certificates' />
      <Row>
        <Col sm='12'>
          <TableWithButtons
            currentPage={currentPage}
            perPage={perPage}
            onSort={handleSort}
            data={data}
            columns={columns}  
            setCurrentPage={setCurrentPage}
            totalRows={""}
            onFilter={onTableFilter}
            filters={filters}
            modal={renderModal}
            handleModal={handleModal}
            handleDelete={onDelete}
            handleEdit={onEdit}
            addLabel={ability.can('add', "certificate") && userData.groups[0].name !== "administrator" ? intl.formatMessage({id:"Add Certificate"}) : null}
            viewModal={renderViewModal}
            handleView={onView}
            setPageSize={setPageSize}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Certificate
