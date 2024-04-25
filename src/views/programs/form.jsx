// ** Third Party Components
import { useIntl } from 'react-intl'
import { X, Info } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Label,
  UncontrolledTooltip,
  Row,
  Col
} from 'reactstrap'
import { EditorState, ContentState  } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import Avatar from '@components/avatar'
import Flatpickr from 'react-flatpickr'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectData } from '@src/redux/selectors/routes'
import { searchProgramTypes } from '@src/redux/actions/routes'
import { ontTableRowAdd, ontTableRowUpdate } from '../../redux/actions/table'
import { 
  selectAddErrors, 
  selectTableAddLoading, 
  selectTableAddIsDone,
  selectTableUpdateLoading,
  selectTableUpdateIsDone,
  selectUpdateErrors
} from '../../redux/selectors/table'
import moment from 'moment'

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

const ProgramModal = ({ open, handleModal, modal }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const typesSuggestion = useSelector(selectData('programTypes'))
    const [types, setTypes] = useState(modal &&  modal.refType && modal.refType.length > 0 ? JSON.stringify(modal.refType[0]) : null)
    const [template, setTemplate] = useState(!modal ? EditorState.createEmpty() : EditorState.createWithContent(stateFromHTML(modal?.template)))
    const [editor, setEditor] = useState(false)
    const [tempTemplate, setTempTemplate] = useState(!modal ? EditorState.createEmpty() : EditorState.createWithContent(stateFromHTML(modal?.template)))
    let loading = useSelector(selectTableAddLoading('programs')) //get loading status of adding new data action
    let isDone = useSelector(selectTableAddIsDone('programs'))  //get isDone status of adding new data action completed or not
    let { validations, errorText } = useSelector(selectAddErrors('programs')) //get server field validations and non field errors for adding action
    if (modal && modal.id) {
      //if modal in initiated, it means that the form is an edit/update form
      loading = useSelector(selectTableUpdateLoading('programs', modal.id)) //get loading status of updating data action
      isDone = useSelector(selectTableUpdateIsDone('programs', modal.id)) //get isDone status of updating data action completed or not
      validations = useSelector(selectUpdateErrors('programs', modal.id)).validations //get server field validations for updating action
      errorText = useSelector(selectUpdateErrors('programs', modal.id)).errorText //get server non field errors for updating action
    }
    const date = new Date()
    date.setDate(date.getDate() + 1)
    const [picker, setPicker] = useState(modal && modal.program_date?.length > 0 ? modal.program_date : [new Date(), date])
    const [logo, setLogo] = useState(modal && modal.refImage ? modal.refImage : UnknownIcon)

    //To maintain an internal state about whether it's a new fresh form
    const [done, setDone] = useState(isDone)

    const rules = {
        name: yup.string().required(),
        program_date: yup.array().length(2, 'Please select Program running date'),
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
        })
    }

    if (modal && modal.id) {
      delete rules['document']
      delete rules['image']
    }

    const SignupSchema = yup.object().shape(rules)

    const onSearchTypes = (e) => {
      const q = e.currentTarget.value
      dispatch(searchProgramTypes(q))
    }
    
    const { register, errors, handleSubmit } = useForm({ 
      defaultValues:{status:true, ...modal, refImage:null, refDocuments:null, refTemplate:null},
      mode: 'onChange', 
      resolver: yupResolver(SignupSchema) 
    })
    
    
   //handle form submit data, based on whether add or update form called depending action
    const onSubmit = data => {
      const resp = {...data}
     
      if (data.refType)  resp['refType'] = [JSON.parse(data.refType).id]
      if (template)  resp['template'] = stateToHTML(template.getCurrentContent())
      resp['start_date'] = moment(picker[0]).format('YYYY-MM-DD')
      resp['end_date'] = moment(picker[1]).format('YYYY-MM-DD')
      if (!modal) dispatch(ontTableRowAdd('programs', resp)); else dispatch(ontTableRowUpdate('programs', modal.id, resp))
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

    const renderAlert = () => {
      return editor && <Modal
        isOpen={true}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className="justify-content-center">{intl.formatMessage({id:"Edit Certificate  Template"})}</ModalHeader>
        <ModalBody className="text-center">
          <Editor editorState={tempTemplate} onEditorStateChange={(data) => { setTempTemplate(data); console.log(data) }} />
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <Button color='secondary' onClick={() => { setTempTemplate(template); setEditor(null) }}>
            Cancel
          </Button>
          <Button color='primary' onClick={() => { setTemplate(tempTemplate); setEditor(null) }}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    }

    console.log(picker)

    return (<>
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{!modal ? intl.formatMessage({id:"Add New Program"}) : intl.formatMessage({id:"Update Program"})}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Name"})}<span className="text-danger">*</span> <Info id="programName_tooltip" color="#45866E" size={14}/></Label>
          <InputGroup>
            
            <Input 
                id='name' 
                name='name'
                innerRef={register({ required: true })}
                invalid={errors.name && true}
                placeholder={intl.formatMessage({id:"e.g. name of the program"})} 
            />
            <UncontrolledTooltip placement='right' target='programName_tooltip'>
            Enter the full name
            </UncontrolledTooltip>
          </InputGroup>
          <small className="text-danger">{errors.name ? errors.name.message : null}</small>
          <small className="text-danger">{validations.name ? validations.name : null}</small>
        </FormGroup>
        <FormGroup>
            <Label for='program_date'>{"Program Date" } <Info id="program_date" color="#45866E" size={14} /></Label>
            <InputGroup>

            <Flatpickr
                value={picker}
                id='program_date'
                className='form-control'
                onChange={date => setPicker(date)}
                options={{
                  mode: 'range',
                  defaultDate: ['2023-02-01', '2023-02-15']
                }}
                
              />
              <UncontrolledTooltip placement='top' target='program_date'>
                Program date
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors.issuing_date ? errors.issuing_date.message : null}</small>
            <small className="text-danger">{validations.issuing_date ? validations.issuing_date : null}</small>
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
                Upload a logo. This will be shown in the consumer app. 
                </UncontrolledTooltip>
              </InputGroup>
            </Col>
          </Row>
          <small className="text-danger">{errors.refImage ? errors.refImage.message : null}</small>
          <small className="text-danger">{validations.refImage ? validations.refImage : null}</small>
        </FormGroup>
        <FormGroup>
          <Label for='name'>{intl.formatMessage({id:"Documents"})} <Info id="documents_tooltip" color="#45866E" size={14}/></Label>
          <InputGroup style={{zIndex:0}} >
            
            <Input multiple="multiple" type='file' id='refDocuments' name='refDocuments' innerRef={register({ required: true })} invalid={errors.refDocuments && true} accept="application/pdf" />
            <UncontrolledTooltip placement='right' target='documents_tooltip'>
            Upload any document.
            </UncontrolledTooltip>
          </InputGroup>
          <small className="text-danger">{errors.refDocuments ? errors.refDocuments.message : null}</small>
          <small className="text-danger">{validations.refDocuments ? validations.refDocuments : null}</small>
        </FormGroup>
        <FormGroup className="position-relative" style={{zIndex:0}}>
            <Label for='refTemplate'>{"Template" } <Info id="doc_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>
              <Button size="xs"  color='primary' type="button" onClick={() => setEditor(true)}>
                {intl.formatMessage({id:"Edit"})}
              </Button>
            </InputGroup>
            <small className="text-danger">{errors.template ? errors.template.message : null}</small>
            <small className="text-danger">{validations.template ? validations.template : null}</small>
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
                placeholder={intl.formatMessage({id:"e.g. https://www.unibw.de/entrepreneurship/programme"})} 
            />
            <UncontrolledTooltip placement='right' target='url_tooltip'>
            Enter the Url
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
                placeholder={intl.formatMessage({id:"e.g. Description of the program"})} 
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
    {renderAlert()}
    </>
  )
}

export default ProgramModal
