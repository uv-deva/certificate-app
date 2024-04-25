// ** React Imports
import { Fragment, useEffect, useState, useContext } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Utils
import { AbilityContext } from '@src/utility/context/Can'

// ** Third Party Components
import { Row, Col, Badge } from 'reactstrap'
import { useIntl } from 'react-intl'

// ** Tables
import TableWithButtons from '@custom_components/Tables'

import { columns } from './data'
import ProgramModal from './form'
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

const Programs = () => {
  const intl = useIntl()
  const [viewModal, setViewModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [rowData, setRowData] = useState(null)
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery('programs'))
  const data = useSelector(selectTableDataItems('programs'))
  const perPage = useSelector(selectPerPage('programs'))
  const currentPage = useSelector(selectTableCurrentPage('programs'))
  const totalRows = useSelector(selectTableTotalRows('programs'))
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
    dispatch(setTableDataPageSize('programs', size))
  }

  const setCurrentPage = page => {
    dispatch(setTableDataPage('programs', page))
  }

  const onTableSearch = keyword => {
    dispatch(ontTableDataSearch('programs', keyword))
  }

  const onTableFilter = filter => {
    dispatch(ontTableDataFilter('programs', filter))
  }

  useEffect(() => {
    dispatch(initTableData('programs', 'programs'))
  }, [])

  // ** Function to handle delete action of the row
  // params : e = Event
  //          row = row data
  const onDelete = (e, row) => {
    e.preventDefault() 
    if (confirm("Are you sure, you want to delete?")) dispatch(ontTableRowDelete('programs', row.id))
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
    return modal ? <ProgramModal open={modal} handleModal={handleModal} modal={rowData} /> : null
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
    dispatch(ontTableDataSort('programs', column.selector, sortDirection))
  }


  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle={<Badge style={{background:'#6610f2', color:'white'}}>{intl.formatMessage({id:"Programs"})}</Badge>} breadCrumbParent='Web3 - Services' breadCrumbActive='Programs' />
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
            addLabel={ability.can('add', "program") ? intl.formatMessage({id:"Add Program"}) : null}
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

export default Programs
