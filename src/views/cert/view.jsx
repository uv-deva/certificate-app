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
  Badge,
  Label,
  InputGroup,
  CustomInput,
  Row
} from "reactstrap"
import { Edit2 } from 'react-feather'
const UnknownIcon = require('../../../src/assets/images/icons/noImage.jpeg').default
// ** Styles

const CertificateView = ({ open, onEdit, handleModal, modal }) => {
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
        {modal.identifier}
        </h1>
        <Row className=' py-1'>
            <Col lg="6" sm="6">
            <FormGroup>
            <Label for='name'>{intl.formatMessage({id:"Name"})}</Label>
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
            <Label for='name'>{intl.formatMessage({id:"Description"})}</Label>
            <InputGroup>
            <Input
                type="textarea"
                rows={5}
                disabled={true}
                value={modal?.description}
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
                <Label for='name'>{intl.formatMessage({id:"Impact Criteria Type"})}</Label>
                <InputGroup>
                <Input
                    disabled={true}
                    value={modal?.refType.map(o => o.name).join(',')}
                />
                </InputGroup>
                </FormGroup>
            </Col>
            <Col lg="6" sm="6">
              
                <FormGroup>
                <Label for='name'>{intl.formatMessage({id:"Proof"})}</Label>
                <InputGroup>
                <Input
                    disabled={true}
                    value={modal?.proof}
                />
                </InputGroup>
                </FormGroup>
              
            </Col>

            
        </Row>
        <Row className=' py-1'>
            <Col lg="6" sm="6">
                <FormGroup>
                <Label for='name'>{intl.formatMessage({id:"Trained"})}</Label>
                <InputGroup>
                <CustomInput
                    
                    type='switch'
                    name="process_step"
                    disabled={true}
                    value={modal?.trained}
                    defaultChecked={modal?.trained}
                />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col lg="6" sm="6">
              

              <FormGroup>
                <Label for='name'>{intl.formatMessage({id:"Paid"})}</Label>
                <InputGroup>
                <CustomInput
                    
                    type='switch'
                    name="process_step"
                    disabled={true}
                    value={modal?.paid}
                    defaultChecked={modal?.paid}
                />
                </InputGroup>
              </FormGroup>
              
            </Col>

            
        </Row>
        <Row className=' py-1'>
            
            <Col lg="6" sm="6">
              

              <FormGroup>
                <Label for='name'>{intl.formatMessage({id:"Status"})}</Label>
                <InputGroup>
                <CustomInput
                    id="url"
                    type='switch'
                    name="process_step"
                    disabled={true}
                    value={modal?.status}
                    defaultChecked={modal?.status}
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

export default CertificateView
