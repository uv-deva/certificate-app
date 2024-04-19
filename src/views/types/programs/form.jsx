// ** Third Party Components
import {useIntl} from 'react-intl'
import { X, AlertCircle } from 'react-feather'
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
  Alert
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { ontTableRowAdd, ontTableRowUpdate } from '../../../redux/actions/table'
import { 
  selectAddErrors, 
  selectTableAddLoading, 
  selectTableAddIsDone,
  selectTableUpdateLoading,
  selectTableUpdateIsDone,
  selectUpdateErrors
} from '../../../redux/selectors/table'
import { useEffect, useState } from 'react'


const ProgramTypeModal = ({ open, handleModal, modal }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    let loading = useSelector(selectTableAddLoading('programTypes')) //get loading status of adding new data action
  let isDone = useSelector(selectTableAddIsDone('programTypes'))  //get isDone status of adding new data action completed or not
  let { validations, errorText } = useSelector(selectAddErrors('programTypes')) //get server field validations and non field errors for adding action
    if (modal && modal.id) {
      //if modal in initiated, it means that the form is an edit/update form
      loading = useSelector(selectTableUpdateLoading('programTypes', modal.id)) //get loading status of updating data action
      isDone = useSelector(selectTableUpdateIsDone('programTypes', modal.id)) //get isDone status of updating data action completed or not
      validations = useSelector(selectUpdateErrors('programTypes', modal.id)).validations //get server field validations for updating action
      errorText = useSelector(selectUpdateErrors('programTypes', modal.id)).errorText //get server non field errors for updating action
    }

    //To maintain an internal state about whether it's a new fresh form
    const [done, setDone] = useState(isDone)

    //create validation schema for Type form
    const CreateSchema = yup.object().shape({
        name: yup.string().required()
    })
    
    //init hook form
    const { register, errors, handleSubmit } = useForm({ 
      defaultValues:{...modal},
      mode: 'onChange', 
      resolver: yupResolver(CreateSchema) 
    })
    
    //handle form submit data, based on whether add or update form called depending action
    const onSubmit = data => {
      if (!modal) dispatch(ontTableRowAdd('programTypes', data)); else dispatch(ontTableRowUpdate('programTypes', modal.id, data))
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

    return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{!modal ? intl.formatMessage({id:"New Program Type"}) : intl.formatMessage({id:"Update Node Type"})}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Program Type Name"})}</Label>
          <InputGroup>
            {modal && modal?.id ? <Input 
                hidden={true}
                id='id' 
                name='id'
                innerRef={register({ required: true })}
                invalid={errors.id && true}
            /> : null }
            <Input 
                id='name' 
                name='name'
                innerRef={register({ required: true })}
                invalid={errors.name && true}
                placeholder='Enter Type Name' 
            />
            
          </InputGroup>
          <small className="text-danger">{validations.name ? validations.name : null}</small>
        </FormGroup>
        
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Type Description"})}</Label>
          <InputGroup>
            
            <Input 
                type="textarea"
                id='description' 
                name='description'
                innerRef={register({ required: true })}
                invalid={errors.description && true}
                placeholder={intl.formatMessage({id:"Enter Type Description"})} 
            />
          </InputGroup>
          <small className="text-danger">{validations.description ? validations.description : null}</small>
        </FormGroup>
        <Button className='mr-1' color='secondary' onClick={handleModal} outline>
          {intl.formatMessage({id:"Cancel"})}
        </Button>
        <Button  color='primary' type="submit">
          {loading ? intl.formatMessage({id:"Submitting"}) : intl.formatMessage({id:"Submit"})}
        </Button>
        
          <Alert color='danger' isOpen={errorText}>
          <div className='alert-body'>
            <AlertCircle size={15} />{' '}
            <span className='ml-1'>
              {errorText}
            </span>
          </div>
        </Alert>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ProgramTypeModal
