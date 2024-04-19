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
  action: [
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
  const [refAction, setRefAction] = useState(
    modal && modal?.id ? {name: modal?.action} : null
  )
  console.log(modal)
  const [refDevice, setRefDevice] = useState(
    modal && modal?.id ? JSON.stringify(modal.device) : null
  )
  const [refMission, setRefMission] = useState(
    modal && modal?.id ? JSON.stringify(modal.scenario) : null
  )

  let loading = useSelector(selectTableAddLoading('conditions')) //get loading status of adding new data action
  let isDone = useSelector(selectTableAddIsDone('conditions')) //get isDone status of adding new data action completed or not
  let { validations, errorText } = useSelector(selectAddErrors('conditions')) //get server field validations and non field errors for adding action
  if (modal && modal.id) {
    //if modal in initiated, it means that the form is an edit/update form
    loading = useSelector(selectTableUpdateLoading('conditions', modal.id)) //get loading status of updating data action
    isDone = useSelector(selectTableUpdateIsDone('conditions', modal.id)) //get isDone status of updating data action completed or not
    validations = useSelector(
      selectUpdateErrors('conditions', modal.id)
    ).validations //get server field validations for updating action
    errorText = useSelector(
      selectUpdateErrors('conditions', modal.id)
    ).errorText //get server non field errors for updating action
  }

  const [logo, setLogo] = useState(
    modal && modal.refImage ? modal.refImage : UnknownIcon
  )

  //To maintain an internal state about whether it's a new fresh form
  const [done, setDone] = useState(isDone)

  const rules = {
    automatic: yup.string().required(),
    delay: yup.string().required(),
    hagl: yup.string().required(),
    ied: yup.string().required(),
    name: yup.string().required(),
    identifier: yup.string().required(),
    action: yup.string().required()
  }

  if (modal && modal.id) {
    delete rules.device
  }

  const SignupSchema = yup.object().shape(rules)

  const { register, watch, handleSubmit, errors } = useForm({
    defaultValues: { ...modal },
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
    delete resp.action
    //console.log(resp)
    if (!modal) dispatch(ontTableRowAdd('conditions', resp))
    else dispatch(ontTableRowUpdate('conditions', modal.id, resp))
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
          {!modal ? 'Create condition' : 'Update Condition'}
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
                id='type_tooltip_device'
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
            <UncontrolledTooltip placement='top' target='type_tooltip_device'>
              Choose your Device
            </UncontrolledTooltip>
            {errors.refDevice && true ? errors.refDevice.message : ''}
            <small className='text-danger'>
              {validations.refDevice ? validations.refDevice : null}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for='automatic'>
              {'Automatic'}{' '}
              <i
                className='fa fa-info'
                id='automatic_tooltip'
                color='#45866E'
                size={14}
              />
            </Label>
            <InputGroup>
              <Input
                id='automatic'
                type='number'
                name='automatic'
                innerRef={register({ required: true })}
                invalid={errors?.automatic && true}
                defaultValue={0}
              />
              <UncontrolledTooltip placement='right' target='automatic_tooltip'>
                Enter the automatic number.
              </UncontrolledTooltip>
            </InputGroup>
            <small className='text-danger'>
              {errors?.automatic ? errors?.automatic.message : null}
            </small>
            <small className='text-danger'>
              {validations.automatic ? validations.automatic : null}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for='delay'>
              {'Delay'}{' '}
              <i
                className='fa fa-info'
                id='delay_tooltip'
                color='#45866E'
                size={14}
              />
            </Label>
            <InputGroup>
              <Input
                id='delay'
                type='number'
                name='delay'
                innerRef={register({ required: true })}
                invalid={errors?.delay && true}
                defaultValue={0}
              />
              <UncontrolledTooltip placement='right' target='delay_tooltip'>
                Enter the delay number.
              </UncontrolledTooltip>
            </InputGroup>
            <small className='text-danger'>
              {errors?.delay ? errors?.delay.message : null}
            </small>
            <small className='text-danger'>
              {validations.delay ? validations.delay : null}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for='hagl'>
              {'HAGL'}{' '}
              <i
                className='fa fa-info'
                id='hagl_tooltip'
                color='#45866E'
                size={14}
              />
            </Label>
            <InputGroup>
              <Input
                id='hagl'
                type='number'
                name='hagl'
                innerRef={register({ required: true })}
                invalid={errors?.hagl && true}
                defaultValue={0}
              />
              <UncontrolledTooltip placement='right' target='hagl_tooltip'>
                Enter the HAGL number.
              </UncontrolledTooltip>
            </InputGroup>
            <small className='text-danger'>
              {errors?.hagl ? errors?.hagl.message : null}
            </small>
            <small className='text-danger'>
              {validations.hagl ? validations.hagl : null}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for='ied'>
              {'IED'}{' '}
              <i
                className='fa fa-info'
                id='ied_tooltip'
                color='#45866E'
                size={14}
              />
            </Label>
            <InputGroup>
              <Input
                id='ied'
                type='number'
                name='ied'
                innerRef={register({ required: true })}
                invalid={errors?.ied && true}
                defaultValue={0}
              />
              <UncontrolledTooltip placement='right' target='ied_tooltip'>
                Enter the IED number.
              </UncontrolledTooltip>
            </InputGroup>
            <small className='text-danger'>
              {errors?.ied ? errors?.ied.message : null}
            </small>
            <small className='text-danger'>
              {validations.ied ? validations.ied : null}
            </small>
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
              options={typeOptions.action}
              onChange={(value) => setRefAction(value.id)}
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => option.id}
              noOptionsMessage={() => null}
              placeholder='e.g. Action to be associated with the condition'
              isDisabled={modal?.action}
              styles={colourStyles}
            />
            <Input
              hidden={true}
              id='action'
              name='action'
              innerRef={register({ required: true })}
              invalid={errors.action && true}
              placeholder='Enter Action'
              value={refAction}
            />

            <UncontrolledTooltip placement='top' target='type_tooltip'>
              Choose your action
            </UncontrolledTooltip>
            {errors.action && true ? errors.action.message : ''}
            <small className='text-danger'>
              {validations.action ? validations.action : null}
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
          <Button className='btn-dark mx-2' color='primary' type='submit'>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </ReactForm>
        <small className='text-danger'>{errorText ? errorText : null}</small>
      </ModalBody>
    </Modal>
  )
}

export default FormModal
