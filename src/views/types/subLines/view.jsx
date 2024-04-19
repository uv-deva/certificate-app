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
  Label,
  InputGroup,
  Row
} from "reactstrap"

const SublineTypeView = ({ open, handleModal, modal }) => {
  const intl = useIntl()

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
            <Label for='name'>{intl.formatMessage({id:"Name"})}</Label>
            <InputGroup>
            <Input
                id="name"
                name="name"
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
                id="identifier"
                name="identifier"
                disabled={true}
                value={modal?.id}
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
                id="description"
                name="description"
                disabled={true}
                value={modal?.description}
            />
            </InputGroup>
            </FormGroup>
            </Col>

            <Col lg="6" sm="6">
              
            </Col>
        </Row>

      </ModalBody>
    </Modal>
  )
}

export default SublineTypeView
