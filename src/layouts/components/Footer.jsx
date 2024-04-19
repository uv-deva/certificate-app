import React, { useEffect } from "react"
import { Container, Row, Col } from "reactstrap"
import { getGlobalSettings } from "../../redux/actions/auth"
import { useDispatch, useSelector } from "react-redux"
import { selectGlobalSettings } from "../../redux/selectors/auth"
const CustomFooter = () => {
  const dispatch = useDispatch()
  const data = useSelector(selectGlobalSettings('Login'))

  useEffect(() => {
    dispatch(getGlobalSettings())
  }, [])
  
  return (
    <React.Fragment>
      <footer className="footer" style={{marginLeft: '0%'}}>
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © lakoma.</Col>
            <Col md={6}>
              <p className="text-end mb-0" style={{marginLeft: '40%'}} >{data?.version ?? 'v1.0.1'}</p>
              <div className="text-sm-end d-none d-sm-block">
              </div>
            </Col>  
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default CustomFooter
