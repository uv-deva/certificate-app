import { Fragment } from 'react'
import {useIntl} from 'react-intl'
import Avatar from '@components/avatar'
import { CheckCircle, XOctagon, Info, AlertTriangle } from 'react-feather'

const ToastContent = ({ type = "info", title, body }) => {
    const intl = useIntl()
    const renderIcon = () => {
        switch (type) {
            case 'success':
            return <CheckCircle size={12} />
            case 'error':
            return <XOctagon size={12} />
            case 'info':
            return <Info size={12} />
            case 'warning':
            return <AlertTriangle size={12} />
        }
    }

    return <Fragment>
        <div className='toastify-header'>
        <div className='title-wrapper'>
            <Avatar size='sm' color={type} icon={renderIcon()} />
            <h6 className='toast-title font-weight-bold'>{intl.formatMessage({id:title})}</h6>
        </div>
        </div>
        <div className='toastify-body'>
        <span>{intl.formatMessage({id:body})}</span>
        </div>
    </Fragment>
}

export default ToastContent