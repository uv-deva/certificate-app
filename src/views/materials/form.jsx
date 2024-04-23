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

import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Select from 'react-select'
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectData } from '@src/redux/selectors/routes'
import { searchMaterialTypes } from '@src/redux/actions/routes'
import { ontTableRowAdd, ontTableRowUpdate } from '../../redux/actions/table'
import { 
  selectAddErrors, 
  selectTableAddLoading, 
  selectTableAddIsDone,
  selectTableUpdateLoading,
  selectTableUpdateIsDone,
  selectUpdateErrors
} from '../../redux/selectors/table'

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

import UnknownIcon from '@src/assets/images/icons/noImage.jpeg'

const MaterialModal = ({ open, handleModal, modal }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const typesSuggestion = useSelector(selectData('materialTypes'))
    const [types, setTypes] = useState(modal && modal.refType[0] ? JSON.stringify(modal.refType[0]) : null)

    let loading = useSelector(selectTableAddLoading('materials')) //get loading status of adding new data action
    let isDone = useSelector(selectTableAddIsDone('materials'))  //get isDone status of adding new data action completed or not
    let { validations, errorText } = useSelector(selectAddErrors('materials')) //get server field validations and non field errors for adding action
    if (modal && modal.id) {
      //if modal in initiated, it means that the form is an edit/update form
      loading = useSelector(selectTableUpdateLoading('materials', modal.id)) //get loading status of updating data action
      isDone = useSelector(selectTableUpdateIsDone('materials', modal.id)) //get isDone status of updating data action completed or not
      validations = useSelector(selectUpdateErrors('materials', modal.id)).validations //get server field validations for updating action
      errorText = useSelector(selectUpdateErrors('materials', modal.id)).errorText //get server non field errors for updating action
    }

    const [logo, setLogo] = useState(modal && modal.refImage ? modal.refImage : UnknownIcon)

    //To maintain an internal state about whether it's a new fresh form
    const [done, setDone] = useState(isDone)

    const rules = {
        name: yup.string().required(),
        refImage:yup
        .mixed()
        .test(
          "fileSize",
          intl.formatMessage({id:"File too large"}),
          value => (!value[0] ? true : value[0].size < FILE_SIZE)
        )
        .test(
          "fileFormat",
          intl.formatMessage({id:"Unsupported Format, accepts .jpg .png .gif"}),
          value => (!value[0] ? true : SUPPORTED_FORMATS.includes(value[0].type))
        ),
        refDocuments: yup
        .mixed()
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
          intl.formatMessage({id:"Unsupported Format, accepts pdf"}),
          value => {
            let valid = true
            if (!value || value?.length <= 0) return valid
            
            for (const k in value) {
            if (value[k].type && !SUPPORTED_PDF_FORMATS.includes(value[k].type)) valid = false
            }
            return valid
        }),
        identifier: yup.string().min(3).required()
    }

    if (modal && modal.id) {
      delete rules['document']
      delete rules['image']
    }

    const SignupSchema = yup.object().shape(rules)

    const onSearchTypes = (e) => {
      const q = e.currentTarget.value
      dispatch(searchMaterialTypes(q))
    }
    
    const { register, errors, handleSubmit } = useForm({ 
      defaultValues:{status:true, ...modal, refImage:null, refDocuments:null},
      mode: 'onChange', 
      resolver: yupResolver(SignupSchema) 
    })
    
    
   //handle form submit data, based on whether add or update form called depending action
    const onSubmit = data => {
      const resp = {...data}
      if (data.refType)  resp['refType'] = [JSON.parse(data.refType).id]

      if (!modal) dispatch(ontTableRowAdd('materials', resp)); else dispatch(ontTableRowUpdate('materials', modal.id, resp))
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
        <h5 className='modal-title'>{!modal ? intl.formatMessage({id:"Add New Material"}) : intl.formatMessage({id:"Update Material"})}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Name"})}<span className="text-danger">*</span> <Info id="materialName_tooltip" color="#45866E" size={14}/></Label>
          <InputGroup>
            
            <Input 
                id='name' 
                name='name'
                innerRef={register({ required: true })}
                invalid={errors.name && true}
                placeholder={intl.formatMessage({id:"e.g. flour, eggs"})} 
            />
            <UncontrolledTooltip placement='right' target='materialName_tooltip'>
            Enter the full name of the material
            </UncontrolledTooltip>
          </InputGroup>
          <small className="text-danger">{errors.name ? errors.name.message : null}</small>
          <small className="text-danger">{validations.name ? validations.name : null}</small>
        </FormGroup>
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
            Enter a unique material number.
            </UncontrolledTooltip>
          </InputGroup>
          <small className="text-danger">{errors.identifier ? errors.identifier.message : null}</small>
          <small className="text-danger">{validations.identifier ? validations.identifier : null}</small>
        </FormGroup>
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Type"})} <Info id="type_tooltip" color="#45866E" size={14}/></Label>
          
          <Select
                defaultValue={JSON.stringify(modal && modal.refType ? modal.refType[0] : null)}
                onChange={(value) => setTypes(JSON.stringify(value))}
                value={JSON.parse(types)}
                options={typesSuggestion}
                onInputChange={(newValue) => onSearchTypes({currentTarget:{ value: newValue }})}
                getOptionLabel = {(option) => option.name}
                getOptionValue = {(option) => option.id}
            />
            <UncontrolledTooltip placement='right' target='type_tooltip'>
            Select here the Type of material
            </UncontrolledTooltip>
            <Input 
                hidden
                id='refType' 
                name='refType'
                innerRef={register({ required: true })}
                invalid={errors.type && true}
                placeholder='Enter type Name' 
                value={types}
            />
            {errors.type && true ? 'Please select type' : ''}
            <small className="text-danger">{errors.refType ? errors.refType.message : null}</small>
            <small className="text-danger">{validations.refType ? validations.refType : null}</small>
          
        </FormGroup>
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Image"})} <Info id="image_tooltip" color="#45866E" size={14}/></Label>
          <Row>
            <Col md="3">
              <Avatar imgHeight={50} imgWidth={50} img={logo} style={{cursor:'default'}} />
            </Col>
            <Col md="9" className="pl-0">
              <InputGroup style={{zIndex:0}} >
                
                <Input onChange={onChange} type='file' id='refImage' name='refImage' innerRef={register({ required: true })} invalid={errors.image && true} accept="image/*" />
                <UncontrolledTooltip placement='right' target='image_tooltip'>
                Upload a logo of the material. This will be shown in the consumer app. 
                </UncontrolledTooltip>
              </InputGroup>
            </Col>
          </Row>
          <small className="text-danger">{errors.refImage ? errors.refImage.message : null}</small>
          <small className="text-danger">{validations.refImage ? validations.refImage : null}</small>
        </FormGroup>
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Document"})} <Info id="documents_tooltip" color="#45866E" size={14}/></Label>
          <InputGroup style={{zIndex:0}} >
            
            <Input multiple="multiple" type='file' id='refDocuments' name='refDocuments' innerRef={register({ required: true })} invalid={errors.refDocuments && true} accept="application/pdf" />
            <UncontrolledTooltip placement='right' target='documents_tooltip'>
            Upload any document about the material.
            </UncontrolledTooltip>
          </InputGroup>
          <small className="text-danger">{errors.refDocuments ? errors.refDocuments.message : null}</small>
          <small className="text-danger">{validations.refDocuments ? validations.refDocuments : null}</small>
        </FormGroup>
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"URL"})} <Info id="url_tooltip" color="#45866E" size={14}/></Label>
          <InputGroup>
            
            <Input 
                id='url' 
                name='url'
                type="url"
                innerRef={register({ required: true })}
                invalid={errors.url && true}
                placeholder={intl.formatMessage({id:"e.g. https://www.lakoma.com"})} 
            />
            <UncontrolledTooltip placement='right' target='url_tooltip'>
            Enter the materials Website
            </UncontrolledTooltip>
          </InputGroup>
          <small className="text-danger">{errors.url ? errors.url.message : null}</small>
          <small className="text-danger">{validations.url ? validations.url : null}</small>
        </FormGroup>
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Description"})} <Info id="description_tooltip" color="#45866E" size={14}/></Label>
          <InputGroup>
            
            <Input 
                type="textarea"
                id='description' 
                name='description'
                innerRef={register({ required: true })}
                invalid={errors.description && true}
                placeholder={intl.formatMessage({id:"e.g. best eggs cake in the world"})} 
            />
            <UncontrolledTooltip placement='right' target='description_tooltip'>
            Describe your product in more detail.
            </UncontrolledTooltip>
          </InputGroup>
          <small className="text-danger">{errors.document ? errors.document.message : null}</small>
          <small className="text-danger">{validations.document ? validations.document : null}</small>
        </FormGroup>
        <FormGroup >
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
          If this Material is active or not inactive
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

export default MaterialModal
