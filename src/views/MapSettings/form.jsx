// ** Third Party Components
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form as ReactForm,
  FormGroup,
  Row,
  Col,
  Input,
  Label,
  Media
} from 'reactstrap'
import classnames from "classnames"

// ** Styles
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addWayPointsData, updateWayPointsData } from "../../redux/actions/table"
import {
  selectAddErrors,
  selectTableAddLoading,
  selectTableAddIsDone,
  selectTableUpdateLoading,
  selectTableUpdateIsDone,
  selectUpdateErrors
} from '../../redux/selectors/table'
import ToastContent from "../../components/Toast"
import { Slide, toast } from "react-toastify"
import Select from 'react-select'
import { yupResolver } from '@hookform/resolvers/yup'

const colorList = [
  {id: 'blue', name: 'Blue'},
  {id: 'red', name: 'Red'},
  {id: 'ltblue', name: 'Light Blue'},
  {id: 'yellow', name: 'Yellow'},
  {id: 'purple', name: 'Purple'},
  {id: 'pink', name: 'Pink'}
]

const iconList = [
  {id: 'DotIcon', name: 'Dot Marker'},
  {id: 'MarkerIcon', name: 'Marker'},
  {id: 'PinIcon', name: 'Pin'}
]

const FormModal = ({ open, handleModal, modal, wayPoints }) => {
  const dispatch = useDispatch()

  const [showWayPoints, setShowWayPoints] = useState(false)
  const [showWayPointsLabel, setShowWayPointsLabel] = useState(false)
  const [fileName, setFileName] = useState('No json file Uploaded')
  

  let loading = useSelector(selectTableAddLoading('mapSetting')) //get loading status of adding new data action
  let isDone = useSelector(selectTableAddIsDone('mapSetting')) //get isDone status of adding new data action completed or not
  let { validations, errorText } = useSelector(selectAddErrors('mapSetting')) //get server field validations and non field errors for adding action

  const wayPointData = (wayPoints.filter((data) => data.mission[0] === modal.id))[0]

  
  if (wayPointData && wayPointData.id) {
    //if modal in initiated, it means that the form is an edit/update form
    loading = useSelector(selectTableUpdateLoading('mapSetting', wayPointData.id)) //get loading status of updating data action
    isDone = useSelector(selectTableUpdateIsDone('mapSetting', wayPointData.id)) //get isDone status of updating data action completed or not
    validations = useSelector(selectUpdateErrors('mapSetting', wayPointData.id)).validations //get server field validations for updating action
    errorText = useSelector(selectUpdateErrors('mapSetting', wayPointData.id)).errorText //get server non field errors for updating action
  }


  //To maintain an internal state about whether it's a new fresh form
  const [done, setDone] = useState(isDone)
  if (modal && modal?.refType) {
    JSON.stringify(modal.refType)
  }
  const [iconType, setIconType] = useState(wayPointData && wayPointData?.map_icon_type ? JSON.stringify(iconList.filter((e) => wayPointData?.map_icon_type === e.id)) : null)
  const [iconColor, setIconColor] = useState(wayPointData && wayPointData?.map_icon_color ? JSON.stringify(colorList.filter((e) => wayPointData?.map_icon_color === e.id)) : null)


  const rules = {
    iconType: yup.string().required(),
    iconColor: yup.string().required()
  }
  const SignupSchema = yup.object().shape(rules)

  const { register, watch, handleSubmit, errors } = useForm({
    defaultValues: { ...modal},
    mode: 'all',
    resolver: yupResolver(SignupSchema)

  })

  //update internal state that form is submitted
  useEffect(() => {
    setDone(isDone)
    if (wayPointData) {
      const fileUrl = wayPointData?.upload_waypoints
      if (fileUrl) {
          const urlParts = fileUrl.split('/')
          const extractedFileName = urlParts[urlParts.length - 1]
      
          setFileName(extractedFileName)
      }
      setShowWayPoints(wayPointData?.show_waypoints)
      setShowWayPointsLabel(wayPointData?.show_waypoints_lable)
      setIconType(wayPointData && wayPointData.map_icon_type ? JSON.stringify(iconList.filter((e) => wayPointData.map_icon_type === e.id)) : null)
      setIconColor(wayPointData && wayPointData.map_icon_color ? JSON.stringify(colorList.filter((e) => wayPointData.map_icon_color === e.id)) : null)
    }

  }, [isDone])

  //if internal state says add action is complete, hide the form
  useEffect(() => {
    console.log(done, isDone)
    if (done === false && isDone === true) handleModal()
  }, [done, isDone])

  // ** Custom close btn
  const CloseBtn = <i className='cursor-pointer fa fa-close' size={15} onClick={handleModal} />

  const onChange = (e) => {
    console.log('changed 1')
    const reader = new FileReader(),
      files = e.target.files
      setFileName(files[0]?.name)
        reader.onload = function () {
        console.log(files[0]?.name)
    }
  }

  const onSubmit = (formData) => {
    if (fileName === 'No json file Uploaded') {
        toast.error(
            <ToastContent
                type="error"
                title={`OOOPS!`}
                body={'Please select the way points file'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        return
    }
    const resp = {formData, showWayPoints, showWayPointsLabel}
    if (!wayPointData) dispatch(addWayPointsData(modal.id, resp, 'mapSetting')); else dispatch(updateWayPointsData(wayPointData.mission[0], resp, 'mapSetting'))
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

  console.log('errors', errors)
  return (
    <Modal isOpen={open}
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
          {/* {!modal ? 'Create condition' : 'Update Condition'} */}
        </h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <ReactForm onSubmit={handleSubmit(onSubmit)} id='form1'>
          <FormGroup>
            <Media className="mt-75" body>
              <p>{fileName}</p>
              <Button tag={Label} className="mr-75" size="sm" color="primary">
                {"Upload"}
                <Input
                  id='wayPointsFile'
                  name='wayPointsFile'
                  innerRef={register({ required: false })}
                  type='file'
                  onChange={onChange}
                  hidden
                  accept='.json, .kml'
                  className={classnames({
                  'is-invalid': errors.wayPointsFile
                  })}
                />
              </Button>
              <p className="small mb-0">{"Upload the way points file"}</p>
              <small className="text-danger">{errors.wayPointsFile ? errors.wayPointsFile.message : null}</small>
            </Media>
          </FormGroup>
          <FormGroup>
            <div
              className="form-check form-switch form-switch-lg mb-3"
            >
              <Row>
                <Col sm-6>
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizelg"
                  >
                    Show Waypoints
                  </label>
                </ Col>
                <Col sm-6>
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="customSwitchsizelg"
                    name="show_waypoints_status"
                    defaultChecked={wayPointData ? wayPointData.show_waypoints : showWayPoints}
                    onChange={(event) => setShowWayPoints(event.target.checked)}
                    invalid={errors.show_waypoints_status && true}
                  />
                </ Col>
              </Row>
              <small className="text-danger">{errors.show_waypoints_status ? errors.show_waypoints_status.message : null}</small>
              <small className="text-danger">{validations.show_waypoints_status ? validations.show_waypoints_status : null}</small>
            </div>
          </FormGroup>
          <FormGroup>
            <div
              className="form-check form-switch form-switch-lg mb-3"
            >
              <Row>
                <Col sm-6>
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizelg"
                  >
                    Show Waypoints Label
                  </label>
                </Col>
                <Col sm-6>
                <Input
                    type="checkbox"
                    className="form-check-input"
                    id="customSwitchsizelg"
                    name="show_waypoints_label_status"
                    defaultChecked={wayPointData ? wayPointData.show_waypoints_lable : showWayPointsLabel}
                    onChange={(event) => setShowWayPointsLabel(event.target.checked)}
                    invalid={errors.show_waypoints_label_status && true}
                  />
                </Col>
              </Row>
              <small className="text-danger">{errors.show_waypoints_label_status ? errors.show_waypoints_label_status.message : null}</small>
              <small className="text-danger">{validations.show_waypoints_label_status ? validations.show_waypoints_label_status : null}</small>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for='iconType'>{"Map Icon Type"}<span className="text-danger">*</span> <i className="fa fa-info" id="icontype_tooltip" color="#45866E" size={14} /></Label>
            <Select
              isMulti={false}
              defaultValue={JSON.parse(iconType)}
              value={JSON.parse(iconType)}
              options={iconList}
              onChange={(value) => setIconType(JSON.stringify(value))}
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => option.id}
              noOptionsMessage={() => null}
              styles={colourStyles}
            />

            <Input
              hidden={true}
              name='iconType'
              innerRef={register({ required: true })}
              invalid={errors.refType && true}
              value={iconType}
            />
            <small className="text-danger">{errors?.iconType ? errors?.iconType.message : null}</small>
            <small className="text-danger">{validations.iconType ? validations.iconType : null}</small>
            </FormGroup>
            <FormGroup>
            <Label for='iconColor'>{"Map Icon Color"}<span className="text-danger">*</span> <i className="fa fa-info" id="iconcolor_tooltip" color="#45866E" size={14} /></Label>
            <Select
              isMulti={false}
              defaultValue={JSON.parse(iconColor)}
              value={JSON.parse(iconColor)}
              options={colorList}
              onChange={(value) => setIconColor(JSON.stringify(value))}
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => option.id}
              noOptionsMessage={() => null}
              styles={colourStyles}
            />

            <Input
              hidden={true}
              name='iconColor'
              innerRef={register({ required: true })}
              invalid={errors.refType && true}
              value={iconColor}
            />
            <small className="text-danger">{errors?.iconColor ? errors?.iconColor.message : null}</small>
            <small className="text-danger">{validations.iconColor ? validations.iconColor : null}</small>
            </FormGroup>
          <Button className='btn-dark mx-2' color='primary' type='submit'>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          <Button
            className='mr-1'
            color='secondary'
            onClick={handleModal}
            outline
          >
            {'Cancel'}
          </Button>
        </ReactForm>
        <small className='text-danger'>{errorText ? errorText : null}</small>
      </ModalBody>
    </Modal>
  )
}

export default FormModal
