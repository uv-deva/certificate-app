import { Fragment, useState } from 'react'
import { useIntl } from 'react-intl'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import ImpactCriteriaTypes from './impacts'
import ProductLines from './productLines'
import SubLines from './subLines'
import MaterialTypes from './materials'

const Types = () => {
    const intl = useIntl()
    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
        setActive(tab)
        }
    }

    return <Fragment>
        <Nav tabs>
            <NavItem>
                <NavLink
                    active={active === '1'}
                    onClick={() => {
                    toggle('1')
                    }}
                >
                    {intl.formatMessage({id:"Product Lines"})} 
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    active={active === '2'}
                    onClick={() => {
                    toggle('2')
                    }}
                >
                    {intl.formatMessage({id:"Product Sub Lines"})} 
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent className='py-50' activeTab={active}>
            <TabPane tabId='1'>
                <ProductLines />
            </TabPane>
            <TabPane tabId='2'>
                <SubLines />
            </TabPane>
        </TabContent>
    </Fragment>
}

export default Types