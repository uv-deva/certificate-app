// ** Third Party Components
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Label,
  UncontrolledTooltip,
  Row,
  Col
} from 'reactstrap'

// ** Styles
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { ontTableRowAdd, ontTableRowUpdate } from '../../redux/actions/table'
import {
  selectAddErrors,
  selectTableAddLoading,
  selectTableAddIsDone,
  selectTableUpdateLoading,
  selectTableUpdateIsDone,
  selectUpdateErrors
} from '../../redux/selectors/table'
import { selectUserData } from '../../redux/selectors/auth'
import Select from 'react-select'
import Avatar from '@components/avatar'
import UnknownIcon from '@src/assets/images/icons/noImage.jpeg'
import { selectData, selectDataLoading } from '@src/redux/selectors/routes'
import { searchTable } from '../../redux/actions/routes'

const FILE_SIZE = 1024 * 1024 * 1024
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
]

const PDF_FILE_SIZE = 1024 * 1024 * 10240
const SUPPORTED_PDF_FORMATS = [
  "text/pdf",
  "application/pdf"
]

const typeOptions = {
  administrator: [
    { id: 'operator', name: 'Operator' },
    { id: 'pilot', name: 'Pilot' }
  ],
  operator: [{ id: 'pilot', name: 'Pilot' }]
}

const aiStatusOptions = [
    { id: 'allowed', name: 'Allowed' },
    { id: 'forbidden', name: 'Forbidden' }
]

const colourStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#343a40' : '#FFF',
    '&:hover': {
      backgroundColor: '#343a40',
      color: '#FFF'
    }
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: '#FFF' // Set the background color of the control (search box) to white
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: '#FFF',
    zIndex: 999
  }),
  menuPortal: provided => ({ ...provided, zIndex: 9999 }),
  menu: provided => ({ ...provided, zIndex: 9999 })
}

const FormModal = ({ open, handleModal, modal }) => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUserData())
  const group = userData.groups[0]?.name
  const deviceTypeSuggestion = useSelector(selectData('device_types'))
  const deviceTypeSuggestionLoading = useSelector(selectDataLoading('device_types'))

  const accounts = useSelector(selectData('partners'))

  const [refType, setRefType] = useState(modal && modal?.refType ? JSON.stringify(modal.refType) : null)
  const [refPilot, setRefPilot] = useState(modal && modal.pilot ? JSON.stringify(modal.pilot) : null)
  const [aiStatus, setAIStatus] = useState(modal && modal.ai_service ? JSON.stringify(aiStatusOptions.filter((e) => modal.ai_service === e.id)) : null)

  const [type, setType] = useState(modal && modal.groups && modal.groups.length > 0 ? JSON.stringify(modal.groups[0]) : null)
  let loading = useSelector(selectTableAddLoading('devices')) //get loading status of adding new data action
  let isDone = useSelector(selectTableAddIsDone('devices'))  //get isDone status of adding new data action completed or not
  let { validations, errorText } = useSelector(selectAddErrors('devices')) //get server field validations and non field errors for adding action
  if (modal && modal.id) {
    //if modal in initiated, it means that the form is an edit/update form
    loading = useSelector(selectTableUpdateLoading('devices', modal.id)) //get loading status of updating data action
    isDone = useSelector(selectTableUpdateIsDone('devices', modal.id)) //get isDone status of updating data action completed or not
    validations = useSelector(selectUpdateErrors('devices', modal.id)).validations //get server field validations for updating action
    errorText = useSelector(selectUpdateErrors('devices', modal.id)).errorText //get server non field errors for updating action
  }

  const [logo, setLogo] = useState(modal && modal.refImage ? modal.refImage : UnknownIcon)

  //To maintain an internal state about whether it's a new fresh form
  const [done, setDone] = useState(isDone)

  const rules = {
    name: yup.string().required(),
    identifier: yup.string().required(),
    refType: yup.string().required(),
    refImage: yup
      .mixed()
      .test(
        "fileSize",
        "File too large",
        value => (!value[0] ? true : value[0].size < FILE_SIZE)
      )
      .test(
        "fileFormat",
        "Unsupported Format, accepts .jpg .png .gif",
        value => (!value[0] ? true : SUPPORTED_FORMATS.includes(value[0].type))
      )
  }

  if (modal && modal.id) {
    delete rules.password
    delete rules.username
    delete rules.email
  }

  const SignupSchema = yup.object().shape(rules)

  const { register, watch, handleSubmit, errors } = useForm({
    defaultValues: { ...modal, refImage: null },
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })


  //handle form submit data, based on whether add or update form called depending action
  const onSubmit = data => {
    const resp = { ...data }

    if (data.refPilot?.length > 0) {
      resp['refPilot'] = JSON.parse(data.refPilot).id
    }
    if (data.refType?.length > 0) {
      resp['refType'] = JSON.parse(data.refType).id
    }
    if (data?.ai_service) resp['ai_service'] = JSON.parse(data.ai_service).id

    //console.log(resp)
    if (!modal) dispatch(ontTableRowAdd('devices', resp)); else dispatch(ontTableRowUpdate('devices', modal.id, resp))
  }

  //update internal state that form is submitted
  useEffect(() => {
    setDone(isDone)
  }, [isDone])


  //if internal state says add action is complete, hide the form
  useEffect(() => {
    if (done === false && isDone === true) handleModal()
  }, [done, isDone])

  const onSearchDeviceTypes = (e) => {
    const q = e.currentTarget.value
    if (q?.length > 0) dispatch(searchTable('device_types', q, 'role=all_users'))
  }

  const onSearchPilots = (e) => {
    const q = e.currentTarget.value
    dispatch(searchTable('partners', q, 'role=pilot'))
  }

  // ** Custom close btn
  const CloseBtn = <i className='cursor-pointer fa fa-close' size={15} onClick={handleModal} />

  //On change Image
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setLogo(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  console.log('errors', errors)

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{!modal ? "Add New Device" : "Update Device"}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for='name'>{"Device Name"}<span className="text-danger">*</span> <i className='fa fa-i className="fa fa-info"' id="name_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>

              <Input
                id='name'
                name='name'
                innerRef={register({ required: true })}
                invalid={errors?.name && true}
                placeholder={"e.g. John Doe"}
              />
              <UncontrolledTooltip placement='right' target='name_tooltip'>
                Enter the full name <br />of the partner
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors?.name ? errors?.name.message : null}</small>
            <small className="text-danger">{validations.name ? validations.name : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='identifier'>{"Identifier"}<span className="text-danger">*</span> <i className='fa fa-i className="fa fa-info"' id="identifier_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>

              <Input
                id='identifier'
                name='identifier'
                innerRef={register({ required: true })}
                invalid={errors?.identifier && true}
                placeholder={"e.g. 1000XD"}
              />
              <UncontrolledTooltip placement='right' target='identifier_tooltip'>
                Enter the full name <br />of the partner
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors?.identifier ? errors?.identifier.message : null}</small>
            <small className="text-danger">{validations.identifier ? validations.identifier : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='name'>{"Device Type"}<span className="text-danger">*</span> <i id="type_tooltip" color="#45866E" size={14} />
            </Label>


            <Select
              isMulti={false}
              value={JSON.parse(refType)}
              options={deviceTypeSuggestion}
              onChange={(value) => setRefType(JSON.stringify(value))}
              onInputChange={(newValue) => onSearchDeviceTypes({ currentTarget: { value: newValue } })}
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => option.id}
              noOptionsMessage={() => null}
              placeholder="e.g. Drone etc"
              isDisabled={modal?.id}
              isLoading={deviceTypeSuggestionLoading}
              styles={colourStyles}
            />

            <Input
              hidden={true}
              name='refType'
              innerRef={register({ required: true })}
              invalid={errors.refType && true}
              placeholder='Enter Device Type'
              value={refType}
            />
            <UncontrolledTooltip placement='right' target='type_tooltip'>
              Choose your refType
            </UncontrolledTooltip>
            {errors.refType && true ? 'Please select device type' : ''}
            <small className="text-danger">{validations.refType ? validations.refType : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='label_account'>{"Select Pilot"}<span className="text-danger">*</span>  <i id="account_tooltip" color="#45866E" size={14} /></Label>

            <Select
              defaultValue={JSON.stringify(modal && modal.refPilot ? modal.refPilot : null)}
              onChange={(value) => setRefPilot(JSON.stringify(value))}
              value={JSON.parse(refPilot)}
              options={accounts}
              placeholder={"e.g. Pilot associated with the device"}
              onInputChange={(newValue) => onSearchPilots({ currentTarget: { value: newValue } })}
              getOptionLabel={(account) => account.first_name}
              getOptionValue={(account) => account.id}
              noOptionsMessage={() => null}
              isDisabled={modal && modal?.id}
              styles={colourStyles}
            />
            <UncontrolledTooltip placement='top' target='account_tooltip'>
              Choose Pilot
            </UncontrolledTooltip>
            <Input
              hidden
              id='refPilot'
              name='refPilot'
              innerRef={register({ required: true })}
              invalid={errors.refPilot && true}
              placeholder={"Enter type Name"}
              value={refPilot}
            />
            {errors.type && true ? 'Please select type' : ''}
            <small className="text-danger">{errors.refPilot ? errors.refPilot.message : null}</small>
            <small className="text-danger">{validations.refPilot ? validations.refPilot : null}</small>

          </FormGroup>
          {userData.type === 'artificial' && <div>
            <FormGroup>
              <Label for='ai_status'>{"Select AI Status"}<span className="text-danger">*</span>  <i id="aiStatus_tooltip" color="#45866E" size={14} /></Label>
              <Select
                defaultValue={JSON.stringify(modal && modal.aiServices ? modal.aiServices : null)}
                onChange={(value) => setAIStatus(JSON.stringify(value))}
                value={JSON.parse(aiStatus)}
                options={aiStatusOptions}
                getOptionLabel={(account) => account.name}
                getOptionValue={(account) => account.id}
                noOptionsMessage={() => null}
                isDisabled={!(group === 'administrator' || group === 'operator')}
                styles={colourStyles}
              />
              <UncontrolledTooltip placement='top' target='aiStatus_tooltip'>
                Choose AI Status
              </UncontrolledTooltip>
              <Input
                hidden
                id='ai_status'
                name='ai_status'
                innerRef={register({ required: true })}
                invalid={errors.aiStatus && true}
                value={aiStatus}
              />
              {errors.type && true ? 'Please select AI Status' : ''}
              <small className="text-danger">{errors.ai_status ? errors.ai_status.message : null}</small>
              <small className="text-danger">{validations.ai_status ? validations.ai_status : null}</small>
            </FormGroup>
          </div>}
          <FormGroup className="position-relative" style={{ zIndex: 0 }}>
            <Label for='refImage'>{"Logo"} <i className="fa fa-info" id="img_tooltip" color="#45866E" size={14} /></Label>
            <Row>
              <Col md="3">
                <Avatar imgHeight={50} imgWidth={50} img={logo} style={{ cursor: 'default' }} />
              </Col>
              <Col md="9" className="pl-0">
                <InputGroup>

                  <Input onChange={onChange} type='file' id='refImage' name='refImage' innerRef={register({ required: true })} invalid={errors?.refImage && true} />
                  <UncontrolledTooltip placement='right' target='img_tooltip'>
                    Upload a logo of the partner.
                  </UncontrolledTooltip>
                </InputGroup>
              </Col>
            </Row>
            <small className="text-danger">{errors?.refImage ? errors?.refImage.message : null}</small>
            <small className="text-danger">{validations.refImage ? validations.refImage : null}</small>
          </FormGroup>

          <Button className='mr-1' color='secondary' onClick={handleModal} outline>
            {"Cancel"}
          </Button>
          <Button className="btn-dark mx-2" color='primary' type="submit">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form>
        <small className="text-danger">{errorText ? errorText : null}</small>
      </ModalBody>
    </Modal>
  )
}

export default FormModal
