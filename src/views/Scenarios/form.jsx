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
import { ontTableRowAdd, ontTableRowUpdate, addMissionCommand } from '../../redux/actions/table'
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
import UnknownIcon from '@src/assets/images/icons/noImage.jpeg'
import { selectData, selectDataLoading } from '@src/redux/selectors/routes'
import { searchTable } from '../../redux/actions/routes'


const aiStatusOptions = [
  { id: 'allowed', name: 'Allowed' },
  { id: 'forbidden', name: 'Forbidden' }
]

const FormModal = ({ open, handleModal, modal, formType }) => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUserData())
  const group = userData.groups[0]?.name

  const deviceTypeSuggestion = useSelector(selectData('devices'))
  const deviceTypeSuggestionLoading = useSelector(selectDataLoading('devices'))

  const [refDevice, setRefDevice] = useState(modal && modal?.id ? JSON.stringify(modal.refDevice) : null)
  const [modalOpen, setModalOpen] = useState(false)
  const [refSafetyPilot, setRefSafetyPilots] = useState(modal && modal?.id ? JSON.stringify(modal.refDevice) : null)
  const [refCoditions, setRefCoditions] = useState(modal && modal?.id ? JSON.stringify(modal.conditions) : null)
  const [refCommands, setRefCommands] = useState(modal && modal?.id ? JSON.stringify(modal.commands) : null)
  const [aiStatus, setAIStatus] = useState(modal && modal.ai_service ? JSON.stringify(aiStatusOptions.filter((e) => modal.ai_service === e.id)) : null)

  let loading = useSelector(selectTableAddLoading('scenarios')) //get loading status of adding new data action
  let isDone = useSelector(selectTableAddIsDone('scenarios'))  //get isDone status of adding new data action completed or not
  let { validations, errorText } = useSelector(selectAddErrors('scenarios')) //get server field validations and non field errors for adding action
  if (modal && modal.id) {
    //if modal in initiated, it means that the form is an edit/update form
    loading = useSelector(selectTableUpdateLoading('scenarios', modal.id)) //get loading status of updating data action
    isDone = useSelector(selectTableUpdateIsDone('scenarios', modal.id)) //get isDone status of updating data action completed or not
    validations = useSelector(selectUpdateErrors('scenarios', modal.id)).validations //get server field validations for updating action
    errorText = useSelector(selectUpdateErrors('scenarios', modal.id)).errorText //get server non field errors for updating action
  }

  const [logo, setLogo] = useState(modal && modal.refImage ? modal.refImage : UnknownIcon)
  const [message, setMessage] = useState(null)

  //To maintain an internal state about whether it's a new fresh form
  const [done, setDone] = useState(isDone)

  const JSONSchema = yup.string().test('valid-json', 'Invalid JSON', (value) => {
    try {
      JSON.parse(value)
      return true
    } catch (error) {
      return false
    }
  })

  const commandsSchema = (fieldIds) => {
    const schema = {}
    fieldIds.forEach((fieldId) => {
      schema[`id_${fieldId}`] = JSONSchema
    })
    return yup.object().shape(schema)
  }

  const rules = {
    name: (formType === 'command') ? yup.string() : yup.string().required(),
    identifier: yup.string().required()
    // command: modal?.id ? yup.string() : yup.string().required(),
  }
  
  if (modal && modal.id) {
    delete rules.refDevice
    delete rules.command
    delete rules.identifier

    if (modalOpen) {
      const commandIds = modal?.scenario_device_commands?.map(item => item.command && item.command.id)
      .filter(id => id !== undefined)
  
      rules.commands = commandsSchema(commandIds)
    }
  }

  const SignupSchema = yup.object().shape(rules)

  const commands = {}
  modal?.scenario_device_commands?.forEach((deviceCommand) => {
    const { id, command } = deviceCommand
    commands[`id_${command.id}`] = JSON.stringify(command.command)
  })

  const { register, watch, handleSubmit, errors } = useForm({
    defaultValues: { ...modal, command: [], commands},
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })

  //handle form submit data, based on whether add or update form called depending action
  const onSubmit = data => {
    const resp = { ...data }
    resp.commands = JSON.stringify(resp.commands)
    if (data?.refDevice) resp['refDevice'] = JSON.parse(data.refDevice).map((o) => o.id)
    if (data?.ai_service) resp['ai_service'] = JSON.parse(data.ai_service).id
    // console.log(resp)
    if (formType === 'command') {
      resp['refDevice'] = JSON.parse(data.refDevice)[0].id
      resp['mission'] = modal.id
      dispatch(addMissionCommand('scenarios', resp))
    } else { if (!modal) dispatch(ontTableRowAdd('scenarios', resp)); else dispatch(ontTableRowUpdate('scenarios', modal.id, resp)) }
  }

  //update internal state that form is submitted
  useEffect(() => {
    setDone(isDone)
  }, [isDone])


  //if internal state says add action is complete, hide the form
  useEffect(() => {
    if (done === false && isDone === true) handleModal()
  }, [done, isDone])

  const onSearchDevices = (e) => {
    const q = e.currentTarget.value
    if (q?.length > 0) dispatch(searchTable('devices', q, 'onlyActive=false'))
  }

  // ** Custom close btn
  const CloseBtn = <i className='cursor-pointer fa fa-close' size={15} onClick={handleModal} />


  console.log('errors', errors)


  const [activeTab, setActiveTab] = useState(0)
  const [formDatas, setFormDatas] = useState({}) // State to hold form data for each iteration
  const [temporaryFormData, setTemporaryFormData] = useState({})

  const toggleTab = (tabIndex) => {
    setActiveTab(tabIndex)
    setTemporaryFormData(formDatas[`id_${modal?.scenario_device_commands[tabIndex]?.command?.id}`] || {})
  }

  console.clear()

  const updatedFormDatas = { ...formDatas }

  // Iterate through the keys in formDatas
  for (const key in updatedFormDatas) {
    if (updatedFormDatas.hasOwnProperty(key)) {
      // Iterate through the 'commands' array for each key
      if (updatedFormDatas[key].commands) {
        updatedFormDatas[key].commands = updatedFormDatas[key].commands.map(command => {
          if (command.parameters) {
            // Try to parse the 'parameters' property as JSON
            try {
              command.parameters = JSON.parse(command.parameters)
            } catch (error) {
              // If parsing fails, keep it as a string
            }
          }
          return command
        })
      }
    }
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
  
  const parsedRefCommands = JSON.parse(refCommands)

  let sortedCommands
  console.log(parsedRefCommands)
  if (parsedRefCommands && Array.isArray(parsedRefCommands)) {
      sortedCommands = parsedRefCommands.sort((a, b) => {
          if (a.command_action < b.command_action) {
              return -1
          } else if (a.command_action > b.command_action) {
              return 1
          } else {
              if (a.command_action === "execute") {
                  return a.order - b.order
              } else {
                  return 0 // Assuming no specific sorting for "submit"
              }
          }
      })
  } else {
      sortedCommands = []
  }

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{!modal ? "Add New Mission" : formType === 'command' ? 'Create Command' : "Update Mission"}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <ReactForm onSubmit={handleSubmit(onSubmit)} id='form1'>
          {formType !== 'command' && <div>
            <FormGroup>
              <Label for='name'>{"Mission Name"}<span className="text-danger">*</span> <i className='fa fa-info' id="name_tooltip" color="#45866E" size={14} /></Label>
              <InputGroup>

                <Input
                  id='name'
                  name='name'
                  innerRef={register({ required: true })}
                  invalid={errors?.name && true}
                  placeholder={"e.g. Name for the mission scenario"}
                />
                <UncontrolledTooltip placement='top' target='name_tooltip'>
                  Enter the full name <br />of the mission scenario
                </UncontrolledTooltip>
              </InputGroup>
              <small className="text-danger">{errors?.name ? errors?.name.message : null}</small>
              <small className="text-danger">{validations.name ? validations.name : null}</small>
            </FormGroup>

            <FormGroup>
              <Label for='identifier'>{"Identifier"}<span className="text-danger">*</span> <i className='fa fa-info' id="identifier_tooltip" color="#45866E" size={14} /></Label>
              <InputGroup>

                <Input
                  id='identifier'
                  name='identifier'
                  innerRef={register({ required: true })}
                  invalid={errors?.identifier && true}
                  placeholder={"e.g. 1000XD"}
                  disabled={modal?.id}
                  readOnly={modal?.id}
                />
                <UncontrolledTooltip placement='top' target='identifier_tooltip'>
                  Enter the identifier <br />for the mission scenario
                </UncontrolledTooltip>
              </InputGroup>
              <small className="text-danger">{errors?.identifier ? errors?.identifier.message : null}</small>
              <small className="text-danger">{validations.identifier ? validations.identifier : null}</small>
            </FormGroup>

            <FormGroup>
              <Label for='name'>{"Devices"}<span className="text-danger">*</span> <i className="fa fa-info" id="type_tooltip" color="#45866E" size={14} />
              </Label>
              
              <Select
                isMulti={true}
                value={JSON.parse(refDevice)}
                options={deviceTypeSuggestion}
                onChange={(value) => setRefDevice(JSON.stringify(value))}
                onInputChange={(newValue) => onSearchDevices({ currentTarget: { value: newValue } })}
                getOptionLabel={(option) => `${option.name}`}
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => null}
                placeholder="e.g. Device to be associated with the wallet"
                isDisabled={modal?.refDevice}
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
              <small className="text-danger">{validations.refDevice ? validations.refDevice : null}</small>
            </FormGroup>
            {userData.type === 'artificial' && <div>
              <FormGroup>
                <Label for='ai_service'>{"Select AI Status"}<span className="text-danger">*</span>  <i id="aiStatus_tooltip" color="#45866E" size={14} /></Label>
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
                  id='ai_service'
                  name='ai_service'
                  innerRef={register({ required: true })}
                  invalid={errors.aiStatus && true}
                  value={aiStatus}
                />
                {errors.type && true ? 'Please select AI Status' : ''}
                <small className="text-danger">{errors.ai_service ? errors.ai_service.message : null}</small>
                <small className="text-danger">{validations.ai_service ? validations.ai_service : null}</small>
              </FormGroup>
            </div>}
            {modal?.id && <FormGroup>
              <Label for='name'>{"Safety Pilots"}<span className="text-danger">*</span> <i className="fa fa-info" id="safety_pilot_tooltip" color="#45866E" size={14} />
              </Label>

              <Select
                isMulti={true}
                value={JSON.parse(refSafetyPilot)}
                getOptionLabel={(option) => `${option?.pilot?.first_name}`}
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => null}
                isDisabled={true}
                isLoading={deviceTypeSuggestionLoading}
                styles={colourStyles}
              />
              <UncontrolledTooltip placement='top' target='safety_pilot_tooltip'>
                Choose your safety pilot
              </UncontrolledTooltip>
            </FormGroup>}

            {modal?.id && <FormGroup>
              <Label for='name'>{"Conditions (Submit / Execute)"}<span className="text-danger">*</span> <i className="fa fa-info" id="conditions__tooltip" color="#45866E" size={14} />
              </Label>

              <Select
                isMulti={true}
                value={JSON.parse(refCoditions)}
                getOptionLabel={(option) => `${option?.identifier}`}
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => null}
                isDisabled={true}
                isLoading={deviceTypeSuggestionLoading}
                styles={colourStyles}
              />
              <UncontrolledTooltip placement='top' target='conditions__tooltip'>
                Choose your safety pilot
              </UncontrolledTooltip>
            </FormGroup>}

            {modal?.id && <FormGroup>
              <Label for='name'>{"Commands (Submit / Execute)"}<span className="text-danger">*</span> <i className="fa fa-info" id="commands_tooltip" color="#45866E" size={14} />
              </Label>

              <Select
                isMulti={true}
                value={sortedCommands}
                getOptionLabel={(option) => `${option?.identifier} - ${option?.command_type}`}
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => null}
                isDisabled={true}
                isLoading={deviceTypeSuggestionLoading}
                styles={colourStyles}
              />
              <UncontrolledTooltip placement='top' target='commands_tooltip'>
                Choose your safety pilot
              </UncontrolledTooltip>
            </FormGroup>}

            {modal?.id && <FormGroup>
                  <Label for='submit'>{"Submit"} <span className="text-danger">*</span><i  className="fa fa-info" id="submit_tooltip" color="#45866E" size={14} /></Label>
                  <InputGroup>
                    <Input
                      value={JSON.stringify(modal?.submit, undefined, 4)}
                      type="textarea"
                      disabled={true}
                      rows={10}
                      readOnly={true}
                    />
                  </InputGroup>
                  <UncontrolledTooltip placement='top' target='submit_tooltip'>
                    Submit data
                  </UncontrolledTooltip>
            </FormGroup>}

            {modal?.id && <FormGroup>
                  <Label for='execute'>{"Execute"} <span className="text-danger">*</span><i  className="fa fa-info" id="command_tooltip" color="#45866E" size={14} /></Label>
                  <InputGroup>
                    <Input
                      value={JSON.stringify(modal?.command, undefined, 4)}
                      type="textarea"
                      disabled={true}
                      rows={10}
                      readOnly={true}
                    />
                  </InputGroup>
                  <UncontrolledTooltip placement='top' target='command_tooltip'>
                    Execute data
                  </UncontrolledTooltip>
            </FormGroup>}
          </div>}
          {modal && formType === 'command' && group === 'operator' && <div>
          <FormGroup>
              <Label for='devices'>{"Devices"}<span className="text-danger">*</span> <i className="fa fa-info" id="type_tooltip" color="#45866E" size={14} />
              </Label>
              
              <Select
                isMulti={true}
                value={JSON.parse(refDevice)}
                options={deviceTypeSuggestion}
                onChange={(value) => setRefDevice(JSON.stringify(value))}
                onInputChange={(newValue) => onSearchDevices({ currentTarget: { value: newValue } })}
                getOptionLabel={(option) => `${option.name}`}
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => null}
                placeholder="e.g. Device to be associated with the wallet"
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
              <small className="text-danger">{validations.refDevice ? validations.refDevice : null}</small>
            </FormGroup>
            <FormGroup>
              <Label for='textPrompt'>{"Command"} <span className="text-danger">*</span><i  className="fa fa-info" id="command_tooltip" color="#45866E" size={14} /></Label>
              <InputGroup>
                <Input
                  name='message'
                  onChange={(e) => setMessage(e.target.value)}
                  innerRef={register({ required: true })}
                  type="textarea"
                  rows={10}
                />
              </InputGroup>
            </FormGroup>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="ai_command_execution"
                ref={register({ required: true })}
              />
              <label
                className="form-check-label"
                htmlFor="ai_command_execution"
              >
                Command Execution
              </label>
            </div>
          </div>}
          <Button className='mr-1' color='secondary' onClick={handleModal} outline>
            {"Cancel"}
          </Button>
          <Button className="btn-dark mx-2" color='primary' type="submit">
            {loading ? "Saving..." : "Save"}
          </Button>
        </ReactForm>
        <small className="text-danger">{errorText ? errorText : null}</small>
      </ModalBody>
    </Modal>
  )
}

export default FormModal
