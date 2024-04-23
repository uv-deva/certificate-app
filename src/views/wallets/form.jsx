// ** Third Party Components
import { useIntl } from 'react-intl'
import { X, Info } from 'react-feather'
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
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Select from 'react-select'
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectData } from '@src/redux/selectors/routes'
import { searchWalletTypes } from '@src/redux/actions/routes'
import { ontTableRowAdd, ontTableRowUpdate } from '../../redux/actions/table'
import { 
  selectAddErrors, 
  selectTableAddLoading, 
  selectTableAddIsDone,
  selectTableUpdateLoading,
  selectTableUpdateIsDone,
  selectUpdateErrors
} from '../../redux/selectors/table'
import { selectUserData } from '@src/redux/selectors/auth'


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

import { searchTable } from '../../redux/actions/routes'

import UnknownIcon from '@src/assets/images/icons/noImage.jpeg'


const typeOptions = {
  administrator : [
    { id: 'issuer', name: 'Issuer' },
    { id: 'lecturer', name: 'Lecturer' },
    { id: 'student', name: 'Student' },
    { id: 'operator', name: 'Operator' },
    { id: 'pilot', name: 'Pilot' },
    { id: 'device', name: 'Device' }
  ],
  issuer :[ 
    { id: 'lecturer', name: 'Lecturer' },
    { id: 'student', name: 'Student' } 
  ],
  lecturer:[{ id: 'student', name: 'Student' }],
  operator :[
    { id: 'pilot', name: 'Pilot' },
    { id: 'device', name: 'Device' }
  ]
}

const WalletModal = ({ open, handleModal, modal }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const accounts = useSelector(selectData('partners'))
    const userData = useSelector(selectUserData())

    const group = userData.groups[0]?.name

    const [refAccount, setRefAccount] = useState(null)
    const [type, setType] = useState(modal &&  modal.groups && modal.groups.length > 0 ? JSON.stringify(modal.groups[0]) : null)
    let loading = useSelector(selectTableAddLoading('wallets')) //get loading status of adding new data action
    let isDone = useSelector(selectTableAddIsDone('wallets'))  //get isDone status of adding new data action completed or not
    let { validations, errorText } = useSelector(selectAddErrors('wallets')) //get server field validations and non field errors for adding action
    if (modal && modal.id) {
      //if modal in initiated, it means that the form is an edit/update form
      loading = useSelector(selectTableUpdateLoading('wallets', modal.id)) //get loading status of updating data action
      isDone = useSelector(selectTableUpdateIsDone('wallets', modal.id)) //get isDone status of updating data action completed or not
      validations = useSelector(selectUpdateErrors('wallets', modal.id)).validations //get server field validations for updating action
      errorText = useSelector(selectUpdateErrors('wallets', modal.id)).errorText //get server non field errors for updating action
    }

    //To maintain an internal state about whether it's a new fresh form
    const [done, setDone] = useState(isDone)

    const rules = {
        identifier: yup.string().min(3).required(),
        refUser: yup.string().required(!modal)
    }

    const SignupSchema = yup.object().shape(rules)
    
    const { register, errors, handleSubmit } = useForm({ 
      defaultValues:{status:true, ...modal},
      mode: 'onChange', 
      resolver: yupResolver(SignupSchema) 
    })
    
    const onSearchAccounts = (e) => {
      const q = e.currentTarget.value
      //dispatch(searchTable('partners', q))
      JSON.parse(type).id === 'device' ? dispatch(searchTable('devices', q, '')) : dispatch(searchTable('partners', q, `group=${JSON.parse(type).id}`))
    }
    
    //handle form submit data, based on whether add or update form called depending action
    const onSubmit = data => {
      const resp = {...data}
      if (!modal && data.model_type) resp['model_type'] = JSON.parse(data.model_type).id
      if (!modal && data.refUser)  resp[JSON.parse(data.model_type).id === 'device' ? 'refDevice' : 'refAccount'] = JSON.parse(data.refUser).id
      delete resp.refUser
      if (!modal) dispatch(ontTableRowAdd('wallets', resp)); else dispatch(ontTableRowUpdate('wallets', modal.id, resp))
    }

    //update internal state that form is submitted
    useEffect(() => {
      setDone(isDone)
    }, [isDone])


    //if internal state says add action is complete, hide the form
    useEffect(() => {
      if (done === false && isDone === true) handleModal()
    }, [done, isDone])

    // ** Custom close btn
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
   
    //On change Image
    const onChange = e => {
      const reader = new FileReader(),
        files = e.target.files
      reader.onload = function () {
        setLogo(reader.result)
      }
      reader.readAsDataURL(files[0])
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
        <h5 className='modal-title'>{!modal ? intl.formatMessage({id:"Add New Wallet"}) : intl.formatMessage({id:"Update Node"})}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Identifier"})}<span className="text-danger">*</span> <Info id="identifier_tooltip" color="#45866E" size={14}/></Label>
          <InputGroup>
            
            <Input 
                id='identifier' 
                name='identifier'
                innerRef={register({ required: true })}
                invalid={errors.identifier && true}
                placeholder={intl.formatMessage({id:"e.g. 4711"})} 
            />
            <UncontrolledTooltip placement='right' target='identifier_tooltip'>
            Enter a unique number.
            </UncontrolledTooltip>
          </InputGroup>
          <small className="text-danger">{errors.identifier ? errors.identifier.message : null}</small>
          <small className="text-danger">{validations.identifier ? validations.identifier : null}</small>
        </FormGroup>
        <FormGroup>
          <Label for='model_type'>{intl.formatMessage({ id: "Profile" })}<span className="text-danger">*</span> <Info id="type_tooltip" color="#45866E" size={14} /></Label>
            
          {!modal && <Select
            isClearable={false}
            defaultValue={JSON.stringify(modal && modal.groups  ? modal.groups[0] : null)}
            value={JSON.parse(type)}
            styles={{with:'100%'}}
            onChange={(value) => setType(JSON.stringify(value))}
            name='colors'
            className='react-select'
            classNamePrefix='select'
            options={typeOptions[group]}
            getOptionLabel = {(option) => option.name}
            getOptionValue = {(option) => option.name}
          />}  
          <Input
              id='model_type'
              name='model_type'
              innerRef={register({ required: true })}
              invalid={errors.model_type && true}
              hidden
              value={modal ? JSON.parse(type)?.name : type}
          />
            <UncontrolledTooltip placement='right' target='type_tooltip'>
                Select account type
              </UncontrolledTooltip>
            <small className="text-danger">{errors.model_type ? errors.model_type.message : null}</small>
            <small className="text-danger">{validations.model_type ? validations.model_type : null}</small>
          </FormGroup>
        {!modal && <FormGroup>
            <Label for='label_account'>{intl.formatMessage({ id: "Select Account" })} <Info id="account_tooltip" color="#45866E" size={14} /></Label>

            <Select
              defaultValue={JSON.stringify(null)}
              onChange={(value) => setRefAccount(JSON.stringify(value))}
              value={JSON.parse(refAccount)}
              options={accounts}
              placeholder={intl.formatMessage({ id: "e.g. Student" })}
              onInputChange={(newValue) => onSearchAccounts({ currentTarget: { value: newValue } })}
              getOptionLabel={(account) => account.first_name}
              getOptionValue={(account) => account.id}
              noOptionsMessage={() => null}
            />
            <UncontrolledTooltip placement='top' target='account_tooltip'>
              Choose Account (e.g. student) who will assigned with the digital certificate.
            </UncontrolledTooltip>
            <Input
              hidden
              id='refUser'
              name='refUser'
              innerRef={register({ required: true })}
              invalid={errors.type && true}
              placeholder={intl.formatMessage({ id: "Enter type Name" })}
              value={refAccount}
            />
            {errors.type && true ? 'Please select type' : ''}
            <small className="text-danger">{errors.refUser ? errors.refUser.message : null}</small>
            <small className="text-danger">{validations.refUser ? validations.refUser : null}</small>

        </FormGroup> }

        {modal && <FormGroup>
          <Input
              disabled
              invalid={errors.type && true}
              placeholder={intl.formatMessage({ id: "Enter type Name" })}
              value={modal?.name}
            />
            <Input
              hidden
              id='refUser'
              name='refUser'
              innerRef={register({ required: true })}
              invalid={errors.type && true}
              placeholder={intl.formatMessage({ id: "Enter type Name" })}
              value={refAccount}
            />
        </FormGroup>}
        <FormGroup className="position-relative" style={{zIndex:0}}>
          <Label for='name'>Status <Info id="status_tooltip" color="#45866E" size={14}/></Label>
          <InputGroup className="shadow-none">
            
            <Input
                
                type='switch'
                id='status'
                name='status'
                label=''
                inline
                innerRef={register({ required: true })}
                invalid={errors.status && true}
          />
          <UncontrolledTooltip placement='right' target='status_tooltip'>
          If this active or not inactive
            </UncontrolledTooltip>
          </InputGroup>
          <small className="text-danger">{errors.status ? errors.status.message : null}</small>
          <small className="text-danger">{validations.status ? validations.status : null}</small>
        </FormGroup>
        <Button className='mr-1' color='secondary' onClick={handleModal} outline>
          {intl.formatMessage({id:"Cancel"})}
        </Button>
        <Button  color='primary' type="submit">
          {loading ? intl.formatMessage({id:"Submitting..."}) : intl.formatMessage({id:"Submit"})}
        </Button>
        
        <small className="text-danger">{errorText ? errorText : null}</small>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default WalletModal
