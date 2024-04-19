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
import { selectUserData } from '../../redux/selectors/auth'
import Select from 'react-select'
import UnknownIcon from '@src/assets/images/icons/noImage.jpeg'
import {
  selectData,
  selectDataLoading
} from '@src/redux/selectors/routes'
import { searchTable } from '../../redux/actions/routes'

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
  const [deviceTypeSuggestion, setDeviceTypeSuggestion] = useState(null)
  const scenarioTypeSuggestion = useSelector(selectData('scenarios'))
  const scenarioTypeSuggestionLoading = useSelector(selectDataLoading('scenarios'))

  const [refDevice, setRefDevice] = useState(
    modal && modal?.id ? JSON.stringify(modal.device) : null
  )
  const [refMission, setRefMission] = useState(
    modal && modal?.id ? JSON.stringify(modal.scenario) : null
  )

  let loading = useSelector(selectTableAddLoading('requests')) //get loading status of adding new data action
  let isDone = useSelector(selectTableAddIsDone('requests')) //get isDone status of adding new data action completed or not
  let { validations, errorText } = useSelector(selectAddErrors('requests')) //get server field validations and non field errors for adding action
  if (modal && modal.id) {
    //if modal in initiated, it means that the form is an edit/update form
    loading = useSelector(selectTableUpdateLoading('requests', modal.id)) //get loading status of updating data action
    isDone = useSelector(selectTableUpdateIsDone('requests', modal.id)) //get isDone status of updating data action completed or not
    validations = useSelector(
      selectUpdateErrors('requests', modal.id)
    ).validations //get server field validations for updating action
    errorText = useSelector(
      selectUpdateErrors('requests', modal.id)
    ).errorText //get server non field errors for updating action
  }

  const [logo, setLogo] = useState(
    modal && modal.refImage ? modal.refImage : UnknownIcon
  )

  //To maintain an internal state about whether it's a new fresh form
  const [done, setDone] = useState(isDone)

  const rules = {
    contract_address: yup.string().required()
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
    //console.log(resp)
    if (!modal) dispatch(ontTableRowAdd('requests', resp))
    else dispatch(ontTableRowUpdate('requests', modal.id, resp))
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

  console.log('errors', errors)
  return (
    <Modal isOpen={open} toggle={handleModal} direction='end'>
      <ModalHeader
        className='mb-3'
        toggle={handleModal}
        close={CloseBtn}
        tag='div'
      >
        <h5 className='modal-title'>
          {/* {!modal ? 'Create condition' : 'Update Condition'} */}
        </h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <ReactForm onSubmit={handleSubmit(onSubmit)} id='form1'>
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
            <Label for='contract_address'>
              {'Contract Address'}{' '}
              <i
                className='fa fa-info'
                id='automatic_tooltip'
                color='#45866E'
                size={14}
              />
            </Label>
            <InputGroup>
              <Input
                id='contract_address'
                type='number'
                name='contract_address'
                innerRef={register({ required: true })}
                invalid={errors?.contract_address && true}
                defaultValue={0}
              />
              <UncontrolledTooltip placement='right' target='contract_address'>
                Enter the contract_address number.
              </UncontrolledTooltip>
            </InputGroup>
            <small className='text-danger'>
              {errors?.contract_address ? errors?.contract_address.message : null}
            </small>
            <small className='text-danger'>
              {validations.contract_address ? validations.contract_address : null}
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
          {/* <Button className='btn-dark mx-2' color='primary' type='submit'>
            {loading ? 'Submitting...' : 'Submit'}
          </Button> */}
        </ReactForm>
        <small className='text-danger'>{errorText ? errorText : null}</small>
      </ModalBody>
    </Modal>
  )
}

export default FormModal
