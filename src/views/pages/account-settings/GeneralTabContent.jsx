import { Fragment, useState } from 'react'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form, InputGroup, CustomInput,  UncontrolledTooltip} from 'reactstrap'
import { CreditCard, Info } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../redux/actions/auth' 
import { 
  selectUpdateProfileLoading,
  selectUpdateProfileErrors
} from '../../../redux/selectors/auth'
import { selectData } from '../../..//redux/selectors/routes'
import { searchTable } from '../../../redux/actions/routes'
import {useIntl} from 'react-intl'
import Select from 'react-select'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'

import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

const FILE_SIZE = 1024 * 1024 * 1024
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
]

const GeneralTabs = ({ data }) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const groupsSuggestion = useSelector(selectData('partnerGroups'))
  const [groups, setGroups] = useState(data && data.groups ? JSON.stringify(data.groups) : null)
  const loading = useSelector(selectUpdateProfileLoading()) //get loading status of adding new data action
  const { validations, errorText } = useSelector(selectUpdateProfileErrors()) //get server field validations and non field errors for adding action

  const rules = {
    //username: yup.string().required(),
    email: yup.string().email().required(),
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
    )
  }

  const Schema = yup.object().shape(rules)

  const { register, errors, handleSubmit, control, setValue } = useForm({ 
    defaultValues:{...data, refImage:null, groups},
    mode: 'onChange', 
    resolver: yupResolver(Schema) 
  })

  const [avatar, setAvatar] = useState(data.refImage ? data.refImage : defaultAvatar)

  const onSearchGroups = (e) => {
    const q = e.currentTarget.value
    dispatch(searchTable('partnerGroups', q))
  }


  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = formData => {
    const resp = formData
    if (formData.groups)  resp['groups'] = JSON.parse(formData.groups).map(o => o.id)
    dispatch(updateProfile(data.id, resp))
  } 
 
  return (
    <Fragment>
      <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
      <Media>
        <Media className='mr-25' left>
          <Media object className='rounded mr-50' src={avatar} alt={data.username} height='80' width='80' />
        </Media>
        <Media className='mt-75 ml-1' body>
          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
            {intl.formatMessage({id:"Upload"})}
            <Input  
              id='refImage'
              name='refImage' 
              innerRef={register({ required: false })} 
              type='file' 
              onChange={onChange} 
              hidden 
              accept='image/*' 
              className={classnames({
                'is-invalid': errors.refImage
              })}
            />
          </Button.Ripple>
         
          <p>{intl.formatMessage({id:"Allowed JPG, GIF or PNG. Max size of 800kB"})}</p>
        </Media>
        <Media className='mr-25' right>
          <a href={`https://sepolia.arbiscan.io/address/${data.accountAddrPub}`} target="_blank" className='mr-75' size='sm' color='default'> {intl.formatMessage({id:"Wallet"})} <CreditCard /></a>
        </Media>
      </Media>
      
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label for='username'>{intl.formatMessage({id:"Username"})}</Label>
              <Input
                id='username'
                name='username'
                disabled={true}
                placeholder={intl.formatMessage({id:"Enter Username"})}
                innerRef={register({ required: true })}
                className={classnames({
                  'is-invalid': errors.username
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup >
              <Label for='name'>Public <Info id="public_tooltip" color="#45866E" size={14} /></Label>
              <InputGroup className="shadow-none">
                
                <CustomInput
                    type='switch'
                    id='public'
                    name='public'
                    label=''
                    inline
                    innerRef={register()}
                    invalid={errors.public && true}
              />
               <UncontrolledTooltip placement='right' target='public_tooltip'>
               Change the visibility status of your account in our system, by default is "private" as you will not be exposed to the product owner. 
              </UncontrolledTooltip>
              </InputGroup>
              <small className="text-danger">{errors.public ? errors.public.message : null}</small>
              <small className="text-danger">{validations.public ? validations.public : null}</small>
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='first_name'>{intl.formatMessage({id:"Name"})}</Label>
              <Input
                
                id='first_name'
                name='first_name'
                placeholder={intl.formatMessage({id:"first_name"})}
                innerRef={register({ required: false })}
                onChange={e => setValue('first_name', e.target.value)}
                className={classnames({
                  'is-invalid': errors.first_name
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='company'>{intl.formatMessage({id:"Company"})}</Label>
              <Input
                
                id='company'
                name='company'
                placeholder={intl.formatMessage({id:"Enter Company"})}
                innerRef={register({ required: false })}
                onChange={e => setValue('company', e.target.value)}
                className={classnames({
                  'is-invalid': errors.company
                })}
              />
            </FormGroup>
          </Col>
     
          <Col sm='6'>
            <FormGroup>
              <Label for='email'>{intl.formatMessage({id:"Email"})} <span className="text-danger">*</span></Label>
              <Input
                type='email'
                id='email'
                name='email'
                placeholder={intl.formatMessage({id:"Enter Email"})}
                innerRef={register({ required: true })}
                className={classnames({
                  'is-invalid': errors.email
                })}
              />
            </FormGroup>
          </Col>

          
          <Col sm='6'>
            <FormGroup>
              <Label for='address'>{intl.formatMessage({id:"Address"})}</Label>
              <Input
                type='textarea'
                id='address'
                name='address'
                placeholder={intl.formatMessage({id:"Enter Address"})}
                innerRef={register({ required: false })}
                onChange={e => setValue('address', e.target.value)}
                className={classnames({
                  'is-invalid': errors.address
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='language'>{intl.formatMessage({id:"Language"})}</Label>
              <CustomInput
                type='select'
                id='language'
                name='language'
                placeholder={intl.formatMessage({id:"Select Language"})}
                innerRef={register({ required: true })}
                className={classnames({
                  'is-invalid': errors.language
                })}
              >
              
              <option value="en">
                {intl.formatMessage({id:"English"})}
              </option>
              <option value="de">
                {intl.formatMessage({id:"German"})}
              </option>
                </CustomInput>
            </FormGroup>
          </Col>
          {/* <Col sm='6'>
            <FormGroup>
              <Label for='language'>{intl.formatMessage({id:"Groups"})}</Label>
              <Select
                isMulti
                defaultValue={JSON.stringify(data && data.groups ? data.groups : null)}
                onChange={(value) => setGroups(JSON.stringify(value))}
                value={JSON.parse(groups)}
                options={groupsSuggestion}
                placeholder={intl.formatMessage({id:"Search"})}
                onInputChange={(newValue) => onSearchGroups({currentTarget:{ value: newValue }})}
                getOptionLabel = {(option) => option.name}
                getOptionValue = {(option) => option.id}
                noOptionsMessage={() => null}
            />
            
            <Input 
                hidden
                id='groups' 
                name='groups'
                innerRef={register({ required: true })}
                invalid={errors.groups && true}
                placeholder={intl.formatMessage({id:"Enter Group Name"})}
                defaultValue={groups}
                value={groups}
            />
            {errors.type && true ? 'Please select type' : ''}
            <small className="text-danger">{errors.groups ? errors.groups.message : null}</small>
            <small className="text-danger">{validations.groups ? validations.groups : null}</small>
            </FormGroup>
          </Col> */}
          <Col className='mt-2' sm='12'>
            <Button.Ripple type='submit' className='mr-1' color='primary'>
            {loading ? intl.formatMessage({id:"Saving"}) : intl.formatMessage({id:"Save Changes"})}
            </Button.Ripple>
            <Link to="/">
              <Button.Ripple color='secondary' outline>
                {intl.formatMessage({id:"Cancel"})}
              </Button.Ripple>
            </Link>
          </Col>
        </Row>
      </Form>
    </Fragment>
  )
}

export default GeneralTabs
