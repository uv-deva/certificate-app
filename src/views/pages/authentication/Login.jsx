import { useState, useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import classnames from "classnames";
import { useSkin } from "@hooks/useSkin";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { isObjEmpty } from "@utils";
import { Link } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  // Input,
  Button,
} from "reactstrap";

import "@styles/base/pages/page-auth.scss";
import { doLogin } from "../../../redux/actions/auth";
import { AbilityContext } from "@src/utility/context/Can";
import { selectUserData } from "@src/redux/selectors/auth";

import LinkedinIcon from "@src/assets/images/linkedin-icon.png";
import loginDark from "@src/assets/images/pages/login-v2-dark.svg";
import loginArtWork from "@src/assets/images/pages/login-artwork.png";
import logoSource from "@src/assets/images/pages/login/logo.383d1be8.png";

const Login = (props) => {
  const intl = useIntl();
  const [skin, setSkin] = useSkin();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ability = useContext(AbilityContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const source = skin === "dark" ? loginDark : loginArtWork;

  const onSubmit = (data) => {
    data = {
      "login-email": email,
      "login-password": password
    }
    if (isObjEmpty(errors)) {
      dispatch(doLogin(data));
    }
  };

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={logoSource} alt="lakoma" />
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              <FormattedMessage id="welcome" />
            </CardTitle>
            <CardText className="mb-2">
              <FormattedMessage id="please_sign_in" />
            </CardText>

            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className="form-label" for="login-email">
                  <FormattedMessage id="Username" />
                </Label>
                <Input
                  autoFocus
                  type="text"
                  value={email}
                  id="login-email"
                  name="login-email"
                  placeholder={intl.formatMessage({
                    id: "enter your username",
                  })}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classnames({
                    "is-invalid": errors["login-email"],
                  })}
                  // innerRef={register({
                  //   required: true,
                  //   validate: (value) => value !== "",
                  // })}
                />
              </FormGroup>
              <FormGroup>
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    <FormattedMessage id="Password" />
                  </Label>
                  <Link to="/forgot-password">
                    <small>
                      <FormattedMessage id="Forgot Password?" />
                    </small>
                  </Link>
                </div>
                <InputPasswordToggle
                  value={password}
                  id="login-password"
                  name="login-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={classnames({
                    "is-invalid": errors["login-password"],
                  })}
                  // innerRef={register({
                  //   required: true,
                  //   validate: (value) => value !== "",
                  // })}
                />
              </FormGroup>
              <FormGroup>
                <Input addon type='checkbox' className='custom-control-Primary' id='remember-me' label={intl.formatMessage({id:"Remember Me"})} />
              </FormGroup>
              <Button.Ripple type="submit" color="primary" block>
                <FormattedMessage id="Sign in" />
              </Button.Ripple>
            </Form>
            <p className="d-none text-center mt-2">
              <span className="mr-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">
                <FormattedMessage id="follow us" />
              </div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <a
                target="_blank"
                href="https://www.linkedin.com/company/founders-unibw/"
              >
                <Button.Ripple
                  color="white"
                  to="https://www.linkedin.com/company/founders-unibw/"
                >
                  <img src={LinkedinIcon} style={{ width: "24px" }} />
                </Button.Ripple>
              </a>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
