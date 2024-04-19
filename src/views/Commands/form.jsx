// ** Third Party Components
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form as ReactForm,
  FormGroup,
  InputGroup,
  Input,
  Label,
  UncontrolledTooltip
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
import Select from 'react-select'
import UnknownIcon from '@src/assets/images/icons/noImage.jpeg'
import {
  selectData,
  selectDataLoading
} from '@src/redux/selectors/routes'
import { searchTable } from '../../redux/actions/routes'

const typeOptions = {
  administrator: [
    { id: 'operator', name: 'Operator' },
    { id: 'pilot', name: 'Pilot' }
  ],
  operator: [{ id: 'pilot', name: 'Pilot' }],
  commandType: [
    { id: 'TAKEOFF', name: 'TAKEOFF' },
    { id: 'WAYPOINTS', name: 'WAYPOINTS' },
    { id: 'LANDING-POSITION', name: 'LANDING-POSITION' },
    { id: 'BC-ARM', name: 'BC-ARM' },
    { id: 'BC-TAKEOFF', name: 'BC-TAKEOFF' },
    { id: 'BC-WAYPOINTS', name: 'BC-WAYPOINTS' },
    { id: 'BC-LAND', name: 'BC-LAND' }

  ], 
  commandAction: [
    { id: 'execute', name: 'Execute' },
    { id: 'submit', name: 'Submit' }
  ]
}

const FormModal = ({ open, handleModal, modal }) => {
  const dispatch = useDispatch()
  const [deviceTypeSuggestion, setDeviceTypeSuggestion] = useState(null)
  const deviceTypeSuggestionLoading = useSelector(selectDataLoading('devices'))
  const scenarioTypeSuggestion = useSelector(selectData('scenarios'))
  const scenarioTypeSuggestionLoading = useSelector(selectDataLoading('scenarios'))
  const [refDevice, setRefDevice] = useState(
    modal && modal?.id ? JSON.stringify(modal.device) : null
  )

  const [refMission, setRefMission] = useState(
    modal && modal?.id ? JSON.stringify(modal.scenario) : null
  )
  const [refType, setRefType] = useState(
    modal && modal?.id ? {name: modal?.command_type} : null
  )

  const [refAction, setRefAction] = useState(
    modal && modal?.id ? {name: modal?.command_action} : null
  )

  let loading = useSelector(selectTableAddLoading('commands')) //get loading status of adding new data action
  let isDone = useSelector(selectTableAddIsDone('commands')) //get isDone status of adding new data action completed or not
  let { validations, errorText } = useSelector(selectAddErrors('commands')) //get server field validations and non field errors for adding action
  if (modal && modal.id) {
    //if modal in initiated, it means that the form is an edit/update form
    loading = useSelector(selectTableUpdateLoading('commands', modal.id)) //get loading status of updating data action
    isDone = useSelector(selectTableUpdateIsDone('commands', modal.id)) //get isDone status of updating data action completed or not
    validations = useSelector(
      selectUpdateErrors('commands', modal.id)
    ).validations //get server field validations for updating action
    errorText = useSelector(
      selectUpdateErrors('commands', modal.id)
    ).errorText //get server non field errors for updating action
  }

  const [logo, setLogo] = useState(
    modal && modal.refImage ? modal.refImage : UnknownIcon
  )

  //To maintain an internal state about whether it's a new fresh form
  const [done, setDone] = useState(isDone)

  const rules = {
    command_type: yup.string().required(),
    name: yup.string().required(),
    identifier: yup.string().required(),
    command_action: yup.string().required()
    // command: modal?.id ? yup.string() : yup.string().required(),
  }

  if (modal && modal.id) {
    delete rules.device
  }

  const SignupSchema = yup.object().shape(rules)
  const vals = {...modal}
  vals.command = JSON.stringify(vals.command)

  const { register, watch, handleSubmit, errors } = useForm({
    defaultValues: { ...vals },
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })

  //handle form submit data, based on whether add or update form called depending action
  const onSubmit = (data) => {
    const resp = { ...data }
    if (data?.refDevice) resp['device'] = JSON.parse(data.refDevice).id
    if (data?.refMission) resp['scenario'] = JSON.parse(data.refMission).id
    delete resp.refDevice
    delete resp.refMission
    console.log(resp)
    if (modal) {
      delete resp.command_type
      delete resp.command_action
    }

    if (!modal) dispatch(ontTableRowAdd('commands', resp))
    else dispatch(ontTableRowUpdate('commands', modal.id, resp))
  }

  //update internal state that form is submitted
  useEffect(() => {
    setDone(isDone)
  }, [isDone])

  //if internal state says add action is complete, hide the form
  useEffect(() => {
    if (done === false && isDone === true) handleModal()
  }, [done, isDone])


  const onSearchMissions = (e) => {
    const q = e.currentTarget.value
    if (q?.length > 0) dispatch(searchTable('scenarios', q, ''))
  }

  // ** Custom close btn
  const CloseBtn = (
    <i className='cursor-pointer fa fa-close' size={15} onClick={handleModal} />
  )

  //On change Image
  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setLogo(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

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

  console.log('errors', errors)

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader
        className='mb-3'
        toggle={handleModal}
        close={CloseBtn}
        tag='div'
      >
        <h5 className='modal-title'>
          {!modal ? 'Create command' : 'Update command'}
        </h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <ReactForm onSubmit={handleSubmit(onSubmit)} id='form1'>
          <FormGroup>
            <Label for='name'>{"Condition Name"}<span className="text-danger">*</span> <i className='fa fa-i className="fa fa-info"' id="name_tooltip" color="#45866E" size={14} /></Label>
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
            <Label for='name'>
              {'Mission'}
              <span className='text-danger'>*</span>{' '}
              <i
                className='fa fa-info'
                id='type_tooltip'
                color='#45866E'
                size={14}
              />
            </Label>
            <Select
              isMulti={false}
              value={JSON.parse(refMission)}
              options={scenarioTypeSuggestion}
              onChange={(value) => {
                  setRefDevice(null)
                  setRefMission(JSON.stringify(value))
                  setDeviceTypeSuggestion(value.refDevice)
                }
              }
              onInputChange={(newValue) => onSearchMissions({ currentTarget: { value: newValue } }) }
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => option.id}
              noOptionsMessage={() => null}
              placeholder='e.g. Mission to be associated with the condition'
              isDisabled={modal?.scenario}
              isLoading={scenarioTypeSuggestionLoading}
              styles={colourStyles}
            />

            <Input
              hidden={true}
              name='refMission'
              innerRef={register({ required: true })}
              invalid={errors.refMission && true}
              placeholder='Enter Mission'
              value={refMission}
            />
            <UncontrolledTooltip placement='top' target='type_tooltip'>
              Choose your Mission
            </UncontrolledTooltip>
            {errors.refMission && true ? errors.refMission.message : ''}
            <small className='text-danger'>
              {validations.refMission ? validations.refMission : null}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for='name'>
              {'Device'}
              <span className='text-danger'>*</span>{' '}
              <i
                className='fa fa-info'
                id='type_tooltip'
                color='#45866E'
                size={14}
              />
            </Label>
            <Select
              isMulti={false}
              value={JSON.parse(refDevice)}
              options={deviceTypeSuggestion}
              onChange={(value) => setRefDevice(JSON.stringify(value))}
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => option.id}
              noOptionsMessage={() => null}
              placeholder='e.g. Device to be associated with the condition'
              isDisabled={modal?.device || refMission === null}
              isLoading={deviceTypeSuggestionLoading}
              styles={colourStyles}
            />

            <Input
              hidden={true}
              name='refDevice'
              innerRef={register({ required: true })}
              invalid={errors.refDevice && true}
              placeholder='Enter Device'
              value={refDevice}
            />
            <UncontrolledTooltip placement='top' target='type_tooltip'>
              Choose your Device
            </UncontrolledTooltip>
            {errors.refDevice && true ? errors.refDevice.message : ''}
            <small className='text-danger'>
              {validations.refDevice ? validations.refDevice : null}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for='name'>{"Command"}<span className="text-danger">*</span> <i className='fa fa-i className="fa fa-info"' id="name_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>
              <Input
                id='command_type'
                name='command_type'
                innerRef={register({ required: true })}
                invalid={errors?.command_type && true}
                placeholder={"e.g. Type to be associated with the command"}
              />
              <UncontrolledTooltip placement='right' target='name_tooltip'>
                Enter your command type
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors?.command_type ? errors?.command_type.message : null}</small>
            <small className="text-danger">{validations.command_type ? validations.command_type : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='name'>
              {'Action'}
              <span className='text-danger'>*</span>{' '}
              <i
                className='fa fa-info'
                id='type_tooltip'
                color='#45866E'
                size={14}
              />
            </Label>
            <Select
              isMulti={false}
              value={modal?.id && refAction}
              options={typeOptions.commandAction}
              onChange={(value) => setRefAction(value.id)}
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => option.id}
              noOptionsMessage={() => null}
              placeholder='e.g. Action to be associated with the command'
              isDisabled={modal?.command_type}
              styles={colourStyles}
            />
            <Input
              hidden={true}
              id='command_action'
              name='command_action'
              innerRef={register({ required: true })}
              invalid={errors.command_action && true}
              placeholder='Enter Action'
              value={refAction}
            />

            <UncontrolledTooltip placement='top' target='type_tooltip'>
              Choose your command
            </UncontrolledTooltip>
            {errors.refDevice && true ? errors.refDevice.message : ''}
            <small className='text-danger'>
              {validations.refDevice ? validations.refDevice : null}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for='command'>
              {'Parameters'}{' '}
              <i
                className='fa fa-info'
                id='command_tooltip'
                color='#45866E'
                size={14}
              />
            </Label>
            <InputGroup>
              <Input
                id='command'
                type='textarea'
                name='command'
                rows={4}
                innerRef={register({ required: true })}
                invalid={errors?.command && true}
                // value={modal?.id && JSON.stringify(modal?.command)}
                defaultValue={'{}'}
              />
              <UncontrolledTooltip placement='right' target='command_tooltip'>
                Enter the parameters.
              </UncontrolledTooltip>
            </InputGroup>
            <small className='text-danger'>
              {errors?.command ? errors?.command.message : null}
            </small>
            <small className='text-danger'>
              {validations.command ? validations.command : null}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for='order'>
              {'Order'}{' '}
              <i
                className='fa fa-info'
                id='order_tooltip'
                color='#45866E'
                size={14}
              />
            </Label>
            <InputGroup>
              <Input
                id='order'
                type='number'
                name='order'
                innerRef={register({ required: false })}
                invalid={errors?.order && true}
                // value={modal?.id && modal?.order}
                defaultValue={''}
              />
              <UncontrolledTooltip placement='right' target='order_tooltip'>
                Enter the parameters.
              </UncontrolledTooltip>
            </InputGroup>
            <small className='text-danger'>
              {errors?.order ? errors?.order.message : null}
            </small>
            <small className='text-danger'>
              {validations.order ? validations.order : null}
            </small>
          </FormGroup>

          <Button
            className='mr-1'
            color='secondary'
            onClick={handleModal}
            outline
          >
            {'Cancel'}
          </Button>
          {<Button className='btn-dark mx-2' color='primary' type='submit'>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>}
        </ReactForm>
        <small className='text-danger'>{errorText ? errorText : null}</small>
      </ModalBody>
    </Modal>
  )
}

export default FormModal
