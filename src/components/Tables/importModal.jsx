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
  FormText,
  Label,
  UncontrolledTooltip
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { onTableDataImport } from '../../redux/actions/table'
import { 
    selectTableImportIsDone,
    selectTableImportLoading,
    selectTableImportErrors
} from '../../redux/selectors/table'

const PDF_FILE_SIZE = 1024 * 1024 * 10240
const SUPPORTED_PDF_FORMATS = [
  "text/csv",
  "application/csv"
]

const ImportModal = ({ open, handleModal, importType, sampleImportFile }) => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const loading = useSelector(selectTableImportLoading(importType)) //get loading status of adding new data action
    const isDone = useSelector(selectTableImportIsDone(importType))  //get isDone status of adding new data action completed or not
    const { validations, errorText } = useSelector(selectTableImportErrors(importType)) //get server field validations and non field errors for adding action

    //To maintain an internal state about whether it's a new fresh form
    const [done, setDone] = useState(isDone)

    const rules = {
        file: yup
        .mixed()
        .test(
            "fileSize",
            intl.formatMessage({id:"File is required"}),
            value => {
              
              if (!value[0]) return false
              return true
        })
        .test(
          "fileSize",
          intl.formatMessage({id:"File too large"}),
          value => {
            let valid = true
            if (!value || value?.length <= 0) return valid
            for (const k in value) if (value[k].size > PDF_FILE_SIZE) valid = false
            return valid
        })
        .test(
          "fileFormat",
          intl.formatMessage({id:"Unsupported Format, accepts csv"}),
          value => {
            let valid = true
            if (!value || value?.length <= 0) return valid
            
            for (const k in value) {
            if (value[k].type && !SUPPORTED_PDF_FORMATS.includes(value[k].type)) valid = false
            }
            return valid
        })
    }

    const ImportSchema = yup.object().shape(rules)
    
    const { register, errors, handleSubmit } = useForm({ 
      defaultValues:{ file:null },
      mode: 'onChange', 
      resolver: yupResolver(ImportSchema) 
    })
    
    
   //handle form submit data, based on whether add or update form called depending action
    const onSubmit = data => {
      const resp = {...data}
      dispatch(onTableDataImport(importType, resp))
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
   
    console.log(errors)

    return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{intl.formatMessage({id:"Import Data"})}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Import File"})} <Info id="name_tooltip" color="#45866E" size={14}/></Label>
          <InputGroup style={{zIndex:0}} >
            
            <Input type='file' id='file' name='file' innerRef={register({ required: true })} invalid={errors.file && true} accept="*/csv" />
            <UncontrolledTooltip placement='right' target='name_tooltip'>
            {intl.formatMessage({id:"Select csv file for the material."})}
            </UncontrolledTooltip>
          </InputGroup>
          {sampleImportFile && <FormText className='text-muted'>{intl.formatMessage({id:"Download sample file"})} <a href={`http://0.0.0.0:8080/api_react/media/import_export/${sampleImportFile}_import.csv`} target={"_blank"} >{intl.formatMessage({id:"Click here"})}</a></FormText>}
          <small className="text-danger">{errors.file ? errors.file.message : null}</small>
          <small className="text-danger">{validations.file ? validations.file : null}</small>
        </FormGroup>
        
        <Button className='mr-1' color='primary' type="submit">
          {loading ? intl.formatMessage({id:"Importing..."}) : intl.formatMessage({id:"Import"})}
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          {intl.formatMessage({id:"Cancel"})}
        </Button>
        <small className="text-danger">{errorText ? errorText : null}</small>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ImportModal
