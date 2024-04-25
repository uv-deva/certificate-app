import * as yup from 'yup'
import { useIntl } from 'react-intl'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormGroup, Row, Col, Button, Alert } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../../redux/actions/auth'
import { selectErrors, selectLoading } from '../../../redux/selectors/auth'
import { Link } from 'react-router-dom'

const PasswordTabContent = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  //get loading state of the password change request
  const loading = useSelector(selectLoading())
  //get errors after the password change failed request
  const { validations, errorText } = useSelector(selectErrors())
  /*Create validation schema for password update form*/
  const SignupSchema = yup.object().shape({
    old_password: yup.string().required(),
    new_password: yup.string().required(),
    'retype-new-password': yup
      .string()
      .required()
      .oneOf([yup.ref(`new_password`), null], "Passwords must match")
  })

  //Init React Hook Form
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(SignupSchema)
  })

  //Handle OnSubmit Data for Password Change Request
  const onSubmit = (data) => dispatch(changePassword(data))

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label={"Old Password"}
              htmlFor='old_password'
              name='old_password'
              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['old_password']
              })}
            />
            <small className='text-danger'>{validations.old_password ? validations.old_password : ""}</small>
          </FormGroup>

        </Col>
      </Row>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label={"New Password"}
              htmlFor='new_password'
              name='new_password'
              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['new_password']
              })}
            />
            <small className='text-danger'>{validations.new_password ? validations.new_password : ""}</small>
          </FormGroup>

        </Col>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label={"Retype New Password"}
              htmlFor='retype-new-password'
              name='retype-new-password'
              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['retype-new-password']
              })}
            />
          </FormGroup>
        </Col>
        {errorText && <Col className='mt-75' sm='12'>
          <Alert className='mb-50' color='warning'>
            <h4 className='alert-heading'>{errorText}</h4>
          </Alert>
        </Col>}
        <Col className='mt-1' sm='12'>
          <Button.Ripple type='submit' className='mr-1' color='primary'>
            {!loading ? "Save Changes" : "Saving"}
          </Button.Ripple>
          <Link to="/">
            <Button.Ripple color='secondary' outline>
              {"Cancel" }
            </Button.Ripple>
          </Link>
        </Col>
      </Row>
    </Form>
  )
}

export default PasswordTabContent
