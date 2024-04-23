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
  Badge,
  Button,
  Label,
  InputGroup,
  Row
} from "reactstrap"
import { Edit2 } from 'react-feather'
import UnknownIcon from '../../../src/assets/images/icons/noImage.jpeg'
// ** Styles

const PartnerlView = ({ open, onEdit, handleModal, modal }) => {
  const intl = useIntl()
  const [logo, setLogo] = useState(modal.refImage ? modal.refImage : UnknownIcon)
  const [secondaryImage, setSecondaryImage] = useState(modal.secondary_image ? modal.secondary_image : UnknownIcon)
  
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
        {modal.first_name}
        </h1>
        <Row className=' py-1'>
            <Col lg="6" sm="6">
            <FormGroup>
            <Label for='name'>{intl.formatMessage({id:"Company Name"})}</Label>
            <InputGroup>
            <Input
                disabled={true}
                value={modal?.first_name}
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
                    <Label for='name'>{intl.formatMessage({id:"Create Account"})}</Label>
                    <InputGroup>
                    <Input
                        type='switch'
                        disabled={true}
                        value={modal?.create_account}
                        defaultChecked={modal?.create_account}
                    />
                    </InputGroup>
                </FormGroup>
            </Col>

            <Col lg="6" sm="6">
                {modal?.create_account && <FormGroup>
                    <Label for='name'>{intl.formatMessage({id:"Email"})}</Label>
                    <InputGroup>
                    <Input
                        disabled={true}
                        value={modal?.email}
                    />
                    </InputGroup>
                </FormGroup>}
            </Col>
        </Row>

        {modal?.create_account && <Row className=' py-1'>
            <Col lg="6" sm="6">
            <FormGroup>
            <Label for='name'>{intl.formatMessage({id:"Account"})}</Label>
            <InputGroup>
            <Input
                disabled={true}
                value={modal?.username}
            />
            </InputGroup>
            </FormGroup>
            </Col>

            <Col lg="6" sm="6">
            <FormGroup>
            <Label for='name'>{intl.formatMessage({id:"Password"})}</Label>
            <InputGroup>
            <Input
                disabled={true}
                type="password"
                value={modal?.username}
            />
            </InputGroup>
            </FormGroup>
            </Col>
        </Row>}

        <Row className=' py-1'>
            

            <Col lg="6" sm="6">
            <FormGroup>
            <Label for='name'>{intl.formatMessage({id:"Address"})}</Label>
            <InputGroup>
            <Input
                type="textarea"
                rows={5}
                disabled={true}
                value={modal?.address}
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
            

            <Col lg="6" sm="6">
              <FormGroup>
              <Label for='name'>{intl.formatMessage({id:"Document"})}</Label>
              <div className='d-flex w-100 bg-white rounded' >
                    <div className='flex-1 d-flex flex-column'>
                        { modal?.refDocuments && modal?.refDocuments.length > 0 ? modal?.refDocuments.map(link => <a href={link.file} target={"_blank"} >{link.file.split('/').pop()}</a>) : <Badge color='secondary'>{intl.formatMessage({id:"No Document"})}</Badge>}
                    </div>
                              
                </div>
              
              </FormGroup>
            </Col>

            <Col lg="6" sm="6">
              <FormGroup>
                <Label for='name'>{intl.formatMessage({id:"URL"})}</Label>
                <div className='d-flex w-100 bg-white rounded' >
                              <div className='flex-1 '>
                                  { modal?.url ? <a href={modal?.url} target={"_blank"} >{modal?.url}</a> : <Badge color='secondary'>{intl.formatMessage({id:"No URL"})}</Badge>}
                              </div>
                              
                          </div>
              </FormGroup>
              </Col>
        </Row>
        

        <Row className=' py-1'>
            <Col lg="6" sm="6">
                <FormGroup>
                <Label for='name'>{intl.formatMessage({id:"Company"})}</Label>
                <InputGroup>
                <Input
                    disabled={true}
                    value={modal?.company}
                />
                </InputGroup>
                </FormGroup>
            </Col>
            <Col lg="6" sm="6">
              
                <FormGroup>
                <Label for='name'>{intl.formatMessage({id:"Phone"})}</Label>
                <InputGroup>
                <Input
                    disabled={true}
                    value={modal?.phone}
                />
                </InputGroup>
                </FormGroup>
              
            </Col>

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

export default PartnerlView
