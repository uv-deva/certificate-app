// ** Third Party Components
import {useIntl} from 'react-intl'
import ReactCountryFlag from 'react-country-flag'
import { useDispatch, useSelector } from 'react-redux'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { setLocale } from '../../../../redux/actions/config'
import { selectLocale } from '../../../../redux/selectors/config'

const IntlDropdown = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const locale = useSelector(selectLocale())
  // ** Vars
  const langObj = {
    en: intl.formatMessage({id:"English"}),
    de: intl.formatMessage({id:"German"})
  }

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    dispatch(setLocale(lang))
  }

  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link' onClick={e => e.preventDefault()}>
        <ReactCountryFlag
          className='country-flag flag-icon'
          countryCode={locale === 'en' ? 'us' : locale}
          svg
        />
        <span className='selected-language'>{langObj[locale]}</span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' right>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'en')}>
          <ReactCountryFlag className='country-flag' countryCode='us' svg />
          <span className='ml-1'>{intl.formatMessage({id:"English"})}</span>
        </DropdownItem>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'de')}>
          <ReactCountryFlag className='country-flag' countryCode='de' svg />
          <span className='ml-1'>{intl.formatMessage({id:"German"})}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
