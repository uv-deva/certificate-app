// ** React Imports
import { Fragment, useState, useContext } from 'react'

// ** Add New Modal Component
//import AddNewModal from './AddNewModal'

// ** Utils
import { AbilityContext } from '@src/utility/context/Can'

// ** Third Party Components
import { useIntl } from 'react-intl'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Plus } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from 'reactstrap'
import ImportModal from './importModal'

const DataTableWithButtons = ({
  modal = () => {}, 
  viewModal = () => {},
  totalRows, 
  currentPage, 
  perPage, 
  data, 
  columns, 
  setCurrentPage, 
  setPageSize,
  searchQuery, 
  onSearch, 
  filters, 
  onFilter, 
  onSort,
  handleModal,
  handleEdit,
  handleDelete,
  handleView,
  handleMapModalOpen,
  addLabel,
  exportData,
  importData,
  sampleImportFile,
  shadow = true,
  customPage
}) => {
  const intl = useIntl()

  // ** ACL Ability Context
  const ability = useContext(AbilityContext)

  const dataColumns = columns(handleEdit, handleDelete, handleView, handleMapModalOpen).map((rowItem) => {
    return {...rowItem, name:rowItem.name ? rowItem.name : rowItem.name}
  })
  
  // ** States
  const [filteredData, setFilteredData] = useState([])
  const [importToggle, setImportToggle] = useState(false) //for import modal

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    onSearch(value)
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={parseInt(currentPage) - 1}
      initialPage={0}
      onPageChange={page => handlePagination(page)}
      pageCount={totalRows / perPage}
      breakLabel='...'
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
      disableInitialCallback={true}
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  const Filter = (filter, i) => {

      return <div key={filter.label} className='d-flex align-items-center mr-1 ml-1'>
              <UncontrolledButtonDropdown>
                <DropdownToggle color='secondary' caret outline>
                  
                  <span className='align-middle ml-50'>{intl.formatMessage({id:filter.label})}</span>
                </DropdownToggle>
                <DropdownMenu right>
                  
                  {filter.values.map(function(val, i) {
                    return  <DropdownItem key={i.label} className='w-100' onClick={() => onFilter({[filter.id]:val.value})}>
                              <span className='align-middle ml-50'>{intl.formatMessage({id:val.label})}</span>
                            </DropdownItem>
                  })}
                  
                </DropdownMenu>
            </UncontrolledButtonDropdown>
      </div>
  }

  const renderFilter = () => {
    
    if (filters && filters.length > 0) {
      return filters.map(function(filter, i) {
        return Filter(filter, i)
      })
    }
    
  }

  const importModal = () => {
    return importData && <ImportModal open={importToggle} handleModal={() => setImportToggle(!importToggle)} importType={importData} sampleImportFile={sampleImportFile} />
  }
console.log(data)
  return (
    <Fragment>
      <Card className={`${ !shadow ? 'shadow-none' : ''}`}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          
          <div className='d-flex mt-md-0 mt-1 '>
            {!customPage && customPage !== 'mission' ? renderFilter() : null}
            {exportData ? <Button className='ml-0' color='primary' onClick={exportData}>
             
              <span className='align-middle ml-50'>{intl.formatMessage({id:"Export"})}</span>
            </Button> : null}
            {importData ? <Button className='ml-50' color='primary' onClick={() => setImportToggle(!importToggle)} >
             
              <span className='align-middle ml-50'>{intl.formatMessage({id:"Import"})}</span>
            </Button> : null}
          </div>
          <div className='d-flex mt-md-0 mt-1'>
            {onSearch && <div className='d-flex align-items-center ml-1'>
              <Input
                id='search-invoice'
                className='ml-0 mr-2'
                type='text'
                value={searchQuery}
                onChange={handleFilter}
                placeholder={intl.formatMessage({id:"Search"})}
              />
            </div>}
            {addLabel && <Button className='ml-0' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ml-50'>{addLabel ? intl.formatMessage({id:addLabel}) : intl.formatMessage({id:"Add New"})}</span>
            </Button>}
          </div>
        </CardHeader>
        
        <DataTable
          noHeader
          pagination
          paginationServer
          columns={dataColumns}
          paginationPerPage={perPage}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage}
          paginationComponent={() => { 
            return totalRows > 10 ? <div className='col-12'><Row className="align-items-center">
            {setPageSize ? <Col>{intl.formatMessage({id:"Items per page"})}:  
              <UncontrolledButtonDropdown className="ml-2" size="sm">
                  <DropdownToggle color='secondary' caret outline>
                    
                    <span className='align-middle ml-50'>{perPage}</span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className='w-100' onClick={() => setPageSize(20)}>
                      <span className='align-middle ml-50'>20</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={() => setPageSize(40)}>
                      <span className='align-middle ml-50'>40</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={() => setPageSize(60)}>
                      <span className='align-middle ml-50'>60</span>
                    </DropdownItem>
                  </DropdownMenu>
              </UncontrolledButtonDropdown>
            </Col> : null}
            <Col>{CustomPagination()}</Col></Row>
          </div> : <div className='col-12'>
                    <Row className="align-items-center">
                    <Col><br/>&nbsp;</Col>
                    <Col><br/>&nbsp;</Col>
                    </Row>
                  </div> 
          }}
          paginationTotalRows={totalRows}
          data={data}
          onSort={onSort}
          sortServer
          style={{minHeight: '400px'}}
        />
      </Card>
      {modal()}
      {viewModal()}
      {importModal()}
    </Fragment>
  )
}

export default DataTableWithButtons