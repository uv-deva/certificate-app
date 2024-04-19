import { useState } from 'react'
// ** Third Part1y Components
import { useIntl } from "react-intl"
import {
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Input,
  FormGroup,
  Button,
  Label,
  InputGroup,
  Row
} from "reactstrap"
import { Edit2 } from 'react-feather'
const UnknownIcon = require('../../../src/assets/images/icons/noImage.jpeg').default
// ** Styles

const DeviceView = ({ open, onEdit, handleModal, modal }) => {
  const intl = useIntl()
  const [logo, setLogo] = useState(modal.refImage ? modal.refImage : UnknownIcon)
  
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader
        className="bg-white d-flex justify-content-center"
        toggle={handleModal}
      ></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5 modal-body">
        <h1 className="text-center pb-2">
        {modal.name}
        </h1>
        <Row className=' py-1'>
            <Col lg="6" sm="6">
            <FormGroup>
            <Label for='name'>{intl.formatMessage({id:"Device Name"})}</Label>
            <InputGroup>
            <Input
                disabled={true}
                value={modal?.name}
            />
            </InputGroup>
            </FormGroup>
            </Col>

            <Col lg="6" sm="6">
            <FormGroup>
            <Label for='name'>{intl.formatMessage({id:"Identifier"})}</Label>
            <InputGroup>
            <Input
                disabled={true}
                value={modal?.identifier}
            />
            </InputGroup>
            </FormGroup>
            </Col>
        </Row>

        <Row className=' py-1'>
            <Col lg="6" sm="6">
                <FormGroup>
                    <Label for='name'>{intl.formatMessage({id:"Device Type"})}</Label>
                    <InputGroup>
                    <Input
                        disabled={true}
                        value={modal?.refType?.name}
                    />
                    </InputGroup>
                </FormGroup>
            </Col>

            <Col lg="6" sm="6">
                <FormGroup>
                    <Label for='name'>{intl.formatMessage({id:"Pilot"})}</Label>
                    <InputGroup>
                    <Input
                        disabled={true}
                        value={modal?.pilot?.username}
                    />
                    </InputGroup>
                </FormGroup>
            </Col>
        </Row>

        <Row className=' py-1'>
            <Col lg="6" sm="6">
            <FormGroup>
            <Label for='name'>{intl.formatMessage({id:"AI Status"})}</Label>
            <InputGroup>
            <Input
                disabled={true}
                value={modal?.ai_service}
            />
            </InputGroup>
            </FormGroup>
            </Col>
            <Col lg="6" sm="6">
              <Row className=' py-1'>
                <Col lg="6" sm="6">
                    <Label for='name'>{intl.formatMessage({id:"Image"})} {!modal?.refImage && `(${intl.formatMessage({id:"No Image"})})`} </Label>
                      
                    <div className='d-flex w-100 bg-white rounded' >
                        <div className='flex-1 '>
                            <img src={logo} width="100px" height="100px" style={{objectFit:'cover'}} />
                        </div>
                        
                    </div>
                </Col>
                
                </Row>
            </Col>
        </Row>

        <Row className=' py-1'>

            <Col lg="12" sm="12" className="mt-4" >
              <Button size='sm' className='ml-0' color='primary'  onClick={(e) => onEdit(e, modal)}>
              <Edit2 size={15} />
              <span className='align-middle ml-50'>{intl.formatMessage({id:"Edit"})}</span>
              </Button>
            </Col>
            
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default DeviceView
