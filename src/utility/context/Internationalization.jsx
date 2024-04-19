// ** Intl Provider Import
import { IntlProvider } from 'react-intl'

// ** Core Language Data
import messagesEn from '@assets/data/locales/en.json'
import messagesDe from '@assets/data/locales/de.json'

// ** User Language Data
import userMessagesEn from '@src/assets/data/locales/en.json'
import userMessagesDe from '@src/assets/data/locales/de.json'
import { useSelector } from 'react-redux'

// ** Menu msg obj
const menuMessages = {
  en: { ...messagesEn, ...userMessagesEn },
  de: { ...messagesDe, ...userMessagesDe }
}

import { selectLocale } from '@src/redux/selectors/config'


const IntlProviderWrapper = ({ children }) => {
  const locale = useSelector(selectLocale())

  return (<IntlProvider key={locale} locale={locale} messages={menuMessages[locale]} defaultLocale='en'>
        {children}
    </IntlProvider>
  )
}

export { IntlProviderWrapper }
