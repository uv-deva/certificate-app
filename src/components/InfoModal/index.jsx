import { useState } from 'react'
import {useIntl} from 'react-intl'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

const InfoModal = ({ smallText, largeText }) => {
    const [basicModal, setBasicModal] = useState(false)
    const intl = useIntl()
    
    return <>
        <Button.Ripple className="p-0 text-left" color='default' outline onClick={() => setBasicModal(!basicModal)}>
            {smallText}
        </Button.Ripple>
        <Modal className={`modal-dialog-centered modal-md`} isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
            <ModalBody>
                
            {largeText}
            
            </ModalBody>
        </Modal>
    </>
}

export default InfoModal