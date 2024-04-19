// ** Logo
import logo from '@src/assets/images/logo/logo.png'
import { Spinner } from 'reactstrap'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner vh-100'>
      <img width="100px" className='fallback-logo mb-3' src={logo} alt='logo' />
      <div className='loading ml-2'>
      <Spinner type='grow' color='success' />
      </div>
    </div>
  )
}

export default SpinnerComponent
