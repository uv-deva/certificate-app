import { Fragment, useState } from 'react'
import Tabs from './Tabs'
import {useIntl} from 'react-intl'
import Breadcrumbs from '@components/breadcrumbs'
import GeneralTabContent from './GeneralTabContent'
import PasswordTabContent from './PasswordTabContent'
import MissionControlTab from './MissionControlContract'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'
import { selectUserData } from '@src/redux/selectors/auth'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import { useSelector } from 'react-redux'

const AccountSettings = () => {
  const intl = useIntl()
  const data = useSelector(selectUserData())
  const [activeTab, setActiveTab] = useState(data.pwdUpdate_needed ? '2' : '1')
  

  const toggleTab = tab => {
    setActiveTab(data.pwdUpdate_needed ? "2" : tab)
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id:"Account Settings"})} breadCrumbParent='Pages' breadCrumbActive='Account Settings' />
      {data !== null ? (
        <Row>
          <Col className='mb-2 mb-md-0' md='3'>
            <Tabs activeTab={activeTab} toggleTab={toggleTab} data={data} />
          </Col>
          <Col md='9'>
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='1'>
                    <GeneralTabContent data={data} />
                  </TabPane>
                  <TabPane tabId='2'>
                    <PasswordTabContent />
                  </TabPane>
                  <TabPane tabId='3'>
                    <MissionControlTab data={data}/>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}

export default AccountSettings
