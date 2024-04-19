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
  CustomInput,
  Input,
  Label,
  UncontrolledTooltip,
  Row,
  Col
} from 'reactstrap'

import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
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
import { selectUserData } from '@src/redux/selectors/auth'
import InputPasswordToggle from '@components/input-password-toggle'
import classnames from 'classnames'
import Select from 'react-select'

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

const UnknownIcon = require('@src/assets/images/icons/noImage.jpeg').default


const typeOptions = {
  administrator : [
    { id: 'issuer', name: 'Issuer' },
    { id: 'lecturer', name: 'Lecturer' },
    { id: 'student', name: 'Student' },
    { id: 'operator', name: 'Operator' },
    { id: 'pilot', name: 'Pilot' }
  ],
  issuer :[ 
    { id: 'lecturer', name: 'Lecturer' },
    { id: 'student', name: 'Student' } 
  ],
  lecturer:[{ id: 'student', name: 'Student' }],
  operator :[{ id: 'pilot', name: 'Pilot' }]
}

const accountTypes = [
  { id: 'human', name: 'Human' },
  { id: 'artificial', name: 'Artificial'}
]

const PartnersModal = ({ open, handleModal, modal }) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const userData = useSelector(selectUserData())
  const group = userData.groups[0]?.name
  const [type, setType] = useState(modal &&  modal.groups && modal.groups.length > 0 ? JSON.stringify(modal.groups[0]) : null)
  const [refType, setRefType] = useState(modal && modal?.type ? JSON.stringify(accountTypes.filter((e) => modal.type === e.id)) : null)

  let loading = useSelector(selectTableAddLoading('partners')) //get loading status of adding new data action
  let isDone = useSelector(selectTableAddIsDone('partners'))  //get isDone status of adding new data action completed or not
  let { validations, errorText } = useSelector(selectAddErrors('partners')) //get server field validations and non field errors for adding action
  if (modal && modal.id) {
    //if modal in initiated, it means that the form is an edit/update form
    loading = useSelector(selectTableUpdateLoading('partners', modal.id)) //get loading status of updating data action
    isDone = useSelector(selectTableUpdateIsDone('partners', modal.id)) //get isDone status of updating data action completed or not
    validations = useSelector(selectUpdateErrors('partners', modal.id)).validations //get server field validations for updating action
    errorText = useSelector(selectUpdateErrors('partners', modal.id)).errorText //get server non field errors for updating action
  }

  const [logo, setLogo] = useState(modal && modal.refImage ? modal.refImage : UnknownIcon)

  //To maintain an internal state about whether it's a new fresh form
  const [done, setDone] = useState(isDone)

  const rules = {
    first_name: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    refImage: yup
      .mixed()
      .test(
        "fileSize",
        intl.formatMessage({ id: "File too large" }),
        value => (!value[0] ? true : value[0].size < FILE_SIZE)
      )
      .test(
        "fileFormat",
        intl.formatMessage({ id: "Unsupported Format, accepts .jpg .png .gif" }),
        value => (!value[0] ? true : SUPPORTED_FORMATS.includes(value[0].type))
      ),
    refDocuments: yup
      .mixed()
      .test(
        "fileSize",
        intl.formatMessage({ id: "File too large" }),
        value => {
          let valid = true
          if (!value || value?.length <= 0) return valid
          for (const k in value) if (value[k].size > PDF_FILE_SIZE) valid = false
          return valid
        })
      .test(
        "fileFormat",
        intl.formatMessage({ id: "Unsupported Format, accepts pdf" }),
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
    delete rules.password
    delete rules.username
    delete rules.email
  }

  const SignupSchema = yup.object().shape(rules)

  const { register, watch, errors, handleSubmit } = useForm({
    defaultValues: { ...modal, refImage: null, refDocuments: null },
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })

  //watching over the create account option to toggle the additional fields
  const createAccount = watch('create_account', false)


  //handle form submit data, based on whether add or update form called depending action
  const onSubmit = data => {
    const resp = { ...data }

    if (refType) {
      resp['account_type'] = JSON.parse(refType).id
    } else {
      resp['account_type'] = accountTypes[0].id
    }
    if (data.type?.length > 0) {
      resp['type'] = JSON.parse(data.type).id
    }
    //console.log(resp)
    if (!modal) dispatch(ontTableRowAdd('partners', resp)); else dispatch(ontTableRowUpdate('partners', modal.id, resp))
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

  const onTypeChange = (value, { action, removedValue }) => {
    switch (action) {
      case 'remove-value':
      case 'pop-value':
        if (removedValue.isFixed) {
          return
        }
        break
      case 'clear':
        value = typeOptions[group].filter(v => v.isFixed)
        break
      default:
        break
    }

    setType(value)
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

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{!modal ? intl.formatMessage({ id: "Add New Account" }) : intl.formatMessage({ id: "Update Account" })}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for='first_name'>{intl.formatMessage({ id: "Name" })}<span className="text-danger">*</span> <Info id="name_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>

              <Input
                id='first_name'
                name='first_name'
                innerRef={register({ required: true })}
                invalid={errors.first_name && true}
                placeholder={intl.formatMessage({ id: "e.g. John Doe" })}
              />
              <UncontrolledTooltip placement='right' target='name_tooltip'>
                Enter the full name <br />of the partner
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors.first_name ? errors.first_name.message : null}</small>
            <small className="text-danger">{validations.first_name ? validations.first_name : null}</small>
          </FormGroup>
          {(group === 'administrator') && <div>
            <FormGroup style={{zIndex:1}}>
              <Label for='account_type'>{"Type"}<span className="text-danger">*</span> <i className="fa fa-info" id="type_tooltip" color="#45866E" size={14} /></Label>   
              {(!modal || !modal.groups || modal.groups[0].name !== 'administrator') && <Select
                isClearable={false}
                defaultValue={JSON.stringify(modal && modal.type ? modal.type : null)}
                value={JSON.parse(refType)}
                onChange={(value) => setRefType(JSON.stringify(value))}
                name='colors'
                className='react-select'
                classNamePrefix='select'
                options={accountTypes}
                getOptionLabel = {(option) => option.name}
                getOptionValue = {(option) => option.name}
                styles={colourStyles}
              />}
              
              <Input
                  disabled={modal && modal.groups}
                  id='account_type'
                  name='account_type'
                  innerRef={register({ required: true })}
                  invalid={errors?.account_type && true}
                  hidden={!modal || modal.groups[0].name !== 'administrator'}
                  value={modal ? JSON.parse(refType)[0]?.name : refType}
              />
              <UncontrolledTooltip placement='right' target='type_tooltip'>
                  Select account type
                </UncontrolledTooltip>
              <small className="text-danger">{errors?.account_type ? errors?.account_type.message : null}</small>
              <small className="text-danger">{validations.account_type ? validations.account_type : null}</small>
            </FormGroup>

          </div>}
          <FormGroup>
            <Label for='type'>{intl.formatMessage({ id: "Profile" })}<span className="text-danger">*</span> <Info id="type_tooltip" color="#45866E" size={14} /></Label>
            
            {(!modal || !modal.groups) && <Select
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
                disabled={modal && modal.groups}
                id='type'
                name='type'
                innerRef={register({ required: true })}
                invalid={errors.type && true}
                hidden={!modal}
                value={modal ? JSON.parse(type)?.name : type}
            />
            <UncontrolledTooltip placement='right' target='type_tooltip'>
                Select account type
              </UncontrolledTooltip>
            <small className="text-danger">{errors.type ? errors.type.message : null}</small>
            <small className="text-danger">{validations.type ? validations.type : null}</small>
          </FormGroup>

          {!modal && <div>
            <FormGroup className="position-relative" style={{zIndex:0}}>
              <Label for='username'>{intl.formatMessage({ id: "Username" })}<span className="text-danger">*</span> <Info id="username_tooltip" color="#45866E" size={14} /></Label>
              <InputGroup>

                <Input
                  id='username'
                  name='username'
                  innerRef={register({ required: true })}
                  invalid={errors.username && true}
                  placeholder={intl.formatMessage({ id: "Enter Username" })}
                />
                <UncontrolledTooltip placement='right' target='username_tooltip'>
                  Username should be lowercase letters and no spaces (eg. john_smith).
                </UncontrolledTooltip>
              </InputGroup>
              <small className="text-danger">{errors.username ? errors.username.message : null}</small>
              <small className="text-danger">{validations.username ? validations.username : null}</small>
            </FormGroup>
            <FormGroup className="position-relative" style={{zIndex:0}}>
              <Label for='password'>{intl.formatMessage({ id: "Password" })}<span className="text-danger">*</span> <Info id="password_tooltip" color="#45866E" size={14} /></Label>
              <InputPasswordToggle
                htmlFor='password'
                name='password'
                innerRef={register({ required: true })}
                placeholder={intl.formatMessage({ id: "e.g. Password_123" })}
                className={classnames('input-group-merge', {
                  'is-invalid': errors['password']
                })}
              />
              <small className='text-danger'>{validations.password ? validations.password : ""}</small>
              <UncontrolledTooltip placement='right' target='password_tooltip'>
                enter a first time password here.
              </UncontrolledTooltip>
              <small className="text-danger">{errors.password ? errors.password.message : null}</small>
              <small className="text-danger">{validations.password ? validations.password : null}</small>
            </FormGroup>
            </div>}
            <FormGroup className="position-relative" style={{zIndex:0}}>
              <Label for='email'>{intl.formatMessage({ id: "Email" })}<span className="text-danger">*</span> <Info id="email_tooltip" color="#45866E" size={14} /></Label>
              <InputGroup>
                <Input
                  id='email'
                  name='email'
                  innerRef={register({ required: true })}
                  invalid={errors.email && true}
                  placeholder={intl.formatMessage({ id: "e.g. john@university.com" })}
                />
                <UncontrolledTooltip placement='right' target='email_tooltip'>
                  If you want your partner to access the platform, enter his e-mail address here
                </UncontrolledTooltip>
              </InputGroup>
              <small className="text-danger">{errors.email ? errors.email.message : null}</small>
              <small className="text-danger">{validations.email ? validations.email : null}</small>
            </FormGroup>
          
          <FormGroup className="position-relative" style={{zIndex:0}}>
            <Label for='refImage'>{intl.formatMessage({ id: "Logo" })} <Info id="img_tooltip" color="#45866E" size={14} /></Label>
            <Row>
              <Col md="3">
                <Avatar imgHeight={50} imgWidth={50} img={logo} style={{ cursor: 'default' }} />
              </Col>
              <Col md="9" className="pl-0">
                <InputGroup>

                  <CustomInput onChange={onChange} type='file' id='refImage' name='refImage' innerRef={register({ required: true })} invalid={errors.refImage && true} />
                  <UncontrolledTooltip placement='right' target='img_tooltip'>
                    Upload a logo of the partner.
                  </UncontrolledTooltip>
                </InputGroup>
              </Col>
            </Row>
            <small className="text-danger">{errors.refImage ? errors.refImage.message : null}</small>
            <small className="text-danger">{validations.refImage ? validations.refImage : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='refDocuments'>{intl.formatMessage({ id: "Document" })} <Info id="doc_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>

              <CustomInput multiple="multiple" type='file' id='refDocuments' name='refDocuments' innerRef={register({ required: true })} invalid={errors.refDocuments && true} accept="application/pdf" />
              <UncontrolledTooltip placement='right' target='doc_tooltip'>
                Upload any document<br /> about the partner
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors.refDocuments ? errors.refDocuments.message : null}</small>
            <small className="text-danger">{validations.refDocuments ? validations.refDocuments : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='url'>{intl.formatMessage({ id: "URL" })} <Info id="url_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>
              <Input
                id='url'
                name='url'
                type="url"
                innerRef={register({ required: true })}
                invalid={errors.url && true}
                placeholder={intl.formatMessage({ id: "e.g. https://www.unibw.online" })}
              />
              <UncontrolledTooltip placement='right' target='url_tooltip'>
                Enter the Partners Website
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors.url ? errors.url.message : null}</small>
            <small className="text-danger">{validations.url ? validations.url : null}</small>
          </FormGroup>
         
          <FormGroup>
            <Label for='company'>{intl.formatMessage({ id: "Company" })} <Info id="comp_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>

              <Input
                id='company'
                name='company'
                innerRef={register()}
                invalid={errors.company && true}
                placeholder={intl.formatMessage({ id: "e.g. Universität der Bundeswehr München" })}
              />
              <UncontrolledTooltip placement='right' target='comp_tooltip'>
                If the partners name differs from the companys name, you can enter here the companys name.
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors.company ? errors.company.message : null}</small>
            <small className="text-danger">{validations.company ? validations.company : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='address'>{intl.formatMessage({ id: "Address" })} <Info id="addr_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>

              <Input
                type="textarea"
                id='address'
                name='address'
                innerRef={register({ required: true })}
                invalid={errors.address && true}
                placeholder={intl.formatMessage({ id: "e.g. Werner-Heisenberg-Weg 39, 85579 Neubiberg" })}
              />
              <UncontrolledTooltip placement='right' target='addr_tooltip'>
                Enter the address of the partner.
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors.address ? errors.address.message : null}</small>
            <small className="text-danger">{validations.address ? validations.address : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='description'>{intl.formatMessage({ id: "Description" })} <Info id="desc_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>

              <Input
                type="textarea"
                id='description'
                name='description'
                innerRef={register({ required: true })}
                invalid={errors.description && true}
                placeholder={null}
              />
              <UncontrolledTooltip placement='right' target='desc_tooltip'>
                Enter any additional description for the account.
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors.description ? errors.description.message : null}</small>
            <small className="text-danger">{validations.description ? validations.description : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='phone'>{intl.formatMessage({ id: "Phone" })} <Info id="phone_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>

              <Input
                id='phone'
                name='phone'
                innerRef={register({ required: true })}
                invalid={errors.phone && true}
                placeholder={intl.formatMessage({ id: "e.g. +49 89 6004-0" })}
              />
              <UncontrolledTooltip placement='right' target='phone_tooltip'>
                Enter the phone number.
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors.phone ? errors.phone.message : null}</small>
            <small className="text-danger">{validations.phone ? validations.phone : null}</small>
          </FormGroup>

          <Button className='mr-1' color='secondary' onClick={handleModal} outline>
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button color='primary' type="submit">
            {loading ? intl.formatMessage({ id: "Submitting..." }) : intl.formatMessage({ id: "Submit" })}
          </Button>
        </Form>
        <small className="text-danger">{errorText ? errorText : null}</small>
      </ModalBody>
    </Modal >
  )
}

export default PartnersModal
