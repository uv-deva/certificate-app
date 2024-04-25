import { useState, useEffect } from 'react'
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
  UncontrolledTooltip 
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectData } from '@src/redux/selectors/routes'
import { useDispatch, useSelector } from 'react-redux'
import { ontTableRowAdd, ontTableRowUpdate } from '../../redux/actions/table'
import { searchTable } from '../../redux/actions/routes'
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

const CertificateModal = ({ open, handleModal, modal }) => {
  const intl = useIntl()
  const dispatch = useDispatch()

  const programs = useSelector(selectData('programs'))

  const accounts = useSelector(selectData('partners'))

  const [refProgram, setRefProgram] = useState(modal && modal.refProgram[0] ? JSON.stringify(modal.refProgram[0]) : null)
  const [refAccount, setRefAccount] = useState(modal && modal.refAccount[0] ? JSON.stringify(modal.refAccount[0]) : null)

  let loading = useSelector(selectTableAddLoading('certificates')) //get loading status of adding new data action
  let isDone = useSelector(selectTableAddIsDone('certificates'))  //get isDone status of adding new data action completed or not
  let { validations, errorText } = useSelector(selectAddErrors('certificates')) //get server field validations and non field errors for adding action
  if (modal && modal.id) {
    //if modal in initiated, it means that the form is an edit/update form
    loading = useSelector(selectTableUpdateLoading('certificates', modal.id)) //get loading status of updating data action
    isDone = useSelector(selectTableUpdateIsDone('certificates', modal.id)) //get isDone status of updating data action completed or not
    validations = useSelector(selectUpdateErrors('certificates', modal.id)).validations //get server field validations for updating action
    errorText = useSelector(selectUpdateErrors('certificates', modal.id)).errorText //get server non field errors for updating action
  }

  const [logo, setLogo] = useState(modal && modal.refImage ? modal.refImage : UnknownIcon)

  //To maintain an internal state about whether it's a new fresh form
  const [done, setDone] = useState(isDone)

  const rules = {
    name: yup.string().required(),
    refProgram: yup.string().required(),
    refAccount: yup.string().required(),
    // refImage: yup
    //   .mixed()
    //   .test(
    //     "fileSize",
    //     intl.formatMessage({ id: "File too large" }),
    //     value => (!value[0] ? true : value[0].size < FILE_SIZE)
    //   )
    //   .test(
    //     "fileFormat",
    //     intl.formatMessage({ id: "Unsupported Format, accepts .jpg .png .gif" }),
    //     value => (!value[0] ? true : SUPPORTED_FORMATS.includes(value[0].type))
    //   ),
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
    delete rules['refDocuments']
    delete rules['refImage']
    delete rules['refProof']
  }

  const SignupSchema = yup.object().shape(rules)

  const onSearchProgram = (e) => {
    const q = e.currentTarget.value
    dispatch(searchTable('programs', q))
  }

  const onSearchAccounts = (e) => {
    const q = e.currentTarget.value
    //dispatch(searchTable('partners', q))
    dispatch(searchTable('partners', q, 'role=student'))
  }

  const { register, errors, handleSubmit } = useForm({
    defaultValues: { status: true, ...modal, refImage: null, refDocuments: null },
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })


  //handle form submit data, based on whether add or update form called depending action
  const onSubmit = data => {
    const resp = { ...data }
    //return console.log(data)
    if (data.refAccount) resp['refAccount'] = [JSON.parse(data.refAccount).id]
    if (data.refProgram) resp['refProgram'] = [JSON.parse(data.refProgram).id]

    if (!modal) dispatch(ontTableRowAdd('certificates', resp)); else dispatch(ontTableRowUpdate('certificates', modal.id, resp))
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

  const curr = new Date()
  curr.setDate(curr.getDate())
  const date = curr.toISOString().substring(0, 10)

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{!modal ? intl.formatMessage({ id: "Add Certificate" }) : intl.formatMessage({ id: "Update Certificate" })}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <Form onSubmit={handleSubmit(onSubmit)}>
         
          <FormGroup>
            <Label for='label_name'>{"Name"}<span className="text-danger">*</span> <Info id="name_tooltip" color="#45866E" size={14} /></Label>
            <InputGroup>

              <Input
                id='name'
                name='name'
                innerRef={register({ required: true })}
                invalid={errors.name && true}
                placeholder={intl.formatMessage({ id: "e.g. Certificate XYZ" })}
              />
              <UncontrolledTooltip placement='right' target='name_tooltip'>
                Enter the name of the certifice.
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors.name ? errors.name.message : null}</small>
            <small className="text-danger">{validations.name ? validations.name : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='issuing_date'>{intl.formatMessage({ id: "Issuing Date" })} <Info id="issuing_date" color="#45866E" size={14} /></Label>
            <InputGroup>

              <Input
                id='issuing_date'
                name='issuing_date'
                type='date'
                defaultValue={date}
                innerRef={register({ required: true })}
                invalid={errors.sku && true}
                placeholder={intl.formatMessage({ id: "issuing date" })}
              />
              <UncontrolledTooltip placement='top' target='issuing_date'>
                Issuing date of the certificate.
              </UncontrolledTooltip>
            </InputGroup>
            <small className="text-danger">{errors.issuing_date ? errors.issuing_date.message : null}</small>
            <small className="text-danger">{validations.issuing_date ? validations.issuing_date : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='label_program'>{intl.formatMessage({ id: "Select Program" })} <Info id="program_tooltip" color="#45866E" size={14} /></Label>

            <Select
              defaultValue={JSON.stringify(modal && modal.refProgram ? modal.refProgram[0] : null)}
              onChange={(value) => setRefProgram(JSON.stringify(value))}
              value={JSON.parse(refProgram)}
              options={programs}
              placeholder={intl.formatMessage({ id: "e.g. EEP Program" })}
              onInputChange={(newValue) => onSearchProgram({ currentTarget: { value: newValue } })}
              getOptionLabel={(program) => program.name}
              getOptionValue={(program) => program.id}
              noOptionsMessage={() => null}
            />
            <UncontrolledTooltip placement='top' target='program_tooltip'>
              Choose program (e.g. EEP program) to generate the digital certificate.
            </UncontrolledTooltip>
            <Input
              hidden
              id='refProgram'
              name='refProgram'
              innerRef={register({ required: true })}
              invalid={errors.type && true}
              placeholder={intl.formatMessage({ id: "Enter type Name" })}
              value={refProgram}
            />
            {errors.type && true ? 'Please select program' : ''}
            <small className="text-danger">{errors.refProgram ? errors.refProgram.message : null}</small>
            <small className="text-danger">{validations.refProgram ? validations.refProgram : null}</small>
          </FormGroup>
          <FormGroup>
            <Label for='label_account'>{intl.formatMessage({ id: "Select Account" })} <Info id="account_tooltip" color="#45866E" size={14} /></Label>

            <Select
              defaultValue={JSON.stringify(modal && modal.refAccount ? modal.refAccount[0] : null)}
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
              id='refAccount'
              name='refAccount'
              innerRef={register({ required: true })}
              invalid={errors.type && true}
              placeholder={intl.formatMessage({ id: "Enter type Name" })}
              value={refAccount}
            />
            {errors.type && true ? 'Please select type' : ''}
            <small className="text-danger">{errors.refAccount ? errors.refAccount.message : null}</small>
            <small className="text-danger">{validations.refAccount ? validations.refAccount : null}</small>

          </FormGroup>
         
          <Button className='mr-1' color='secondary' onClick={handleModal} outline>
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button color='primary' type="submit">
            {loading ? intl.formatMessage({ id: "Submitting" }) : intl.formatMessage({ id: "Submit" })}
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default CertificateModal
