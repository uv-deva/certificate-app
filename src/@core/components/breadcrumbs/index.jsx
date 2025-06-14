// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { useIntl } from 'react-intl'
import Proptypes from 'prop-types'
import {
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap'

const BreadCrumbs = props => {
  const intl = useIntl()
  // ** Props
  const { breadCrumbTitle, breadCrumbParent, breadCrumbParent2, breadCrumbParent3, breadCrumbActive } = props

  return (
    <div className='content-header row'>
      <div className='content-header-left col-md-9 col-12 mb-2'>
        <div className='row breadcrumbs-top'>
          <div className='col-12'>
            {breadCrumbTitle ? <h2 className='content-header-title float-left mb-0'>{breadCrumbTitle}</h2> : ''}
            <div className='breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12'>
              <Breadcrumb>
                <BreadcrumbItem tag='li'>
                  <Link to='/'>{intl.formatMessage({id:"Home"})}</Link>
                </BreadcrumbItem>
                <BreadcrumbItem tag='li' className='text-primary'>
                  {intl.formatMessage({id:breadCrumbParent})}
                </BreadcrumbItem>
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    {intl.formatMessage({id:breadCrumbParent2})}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    {intl.formatMessage({id:breadCrumbParent3})}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                <BreadcrumbItem tag='li' active>
                {intl.formatMessage({id:breadCrumbActive})}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired
}
