import { Fragment, useEffect, useState } from "react"
import classnames from "classnames"
import { useForm } from "react-hook-form"
import {
  Button,
  Media,
  Label,
  Row,
  Col,
  Input,
  FormGroup,
  Form
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router-dom"
import { selectUpdateProfileLoading } from '../../../redux/selectors/auth'
import { updateSmartContractProfileData } from '../../../redux/actions/auth'
import { selectTableDataItems } from '../../../redux/selectors/table'
import { initTableData } from "../../../redux/actions/table"
import ToastContent from "../../../components/Toast"
import { Slide, toast } from "react-toastify"
import Select from 'react-select'


const MissionControlTab = ({ data }) => {
    const dispatch = useDispatch()
    const loading = useSelector(selectUpdateProfileLoading()) //get loading status of adding new data action
    const nodeData = useSelector(selectTableDataItems('nodes'))

    const [fileName, setFileName] = useState('No abi file Uploaded')

    const [selectedNode, setSelectedNode] = useState(data?.node_url)

    const handleNodeChange = (e) => {
        setSelectedNode(e.target.value)
    }
    const rules = {
        smart_contract_address: yup.string().required(),
        refContractFile: yup
        .mixed()
        .test(
            "fileFormat",
            "Unsupported Format, accepts .abi",
            (value) => {
                if (!value || !value[0]) {
                return true // Allow empty file (if it's not a required field)
                }
        
                const fileName = value[0].name
                const fileExtension = fileName.split('.').pop().toLowerCase()
        
                return fileExtension === 'abi'
            }
        )
    }

    const Schema = yup.object().shape(rules)

    const { register, errors, handleSubmit, control, setValue } = useForm({
        defaultValues: { ...data, refContractFile: null },
        mode: "onChange",
        resolver: yupResolver(Schema)
    })

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
        console.log(fileName)
        if (fileName === 'No abi file Uploaded') {
            toast.error(
                <ToastContent
                    type="error"
                    title={`OOOPS!`}
                    body={'Please select the file for the smart contract'}
                />,
                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            return
        }

        const resp = formData
        dispatch(updateSmartContractProfileData(data.id, resp))
    }

    useEffect(() => {
        // Extract file name from the URL path
        const fileUrl = data?.refContractFile
        if (fileUrl) {
            const urlParts = fileUrl.split('/')
            const extractedFileName = urlParts[urlParts.length - 1]
        
            setFileName(extractedFileName)
        }
        dispatch(initTableData('nodes', 'nodes'))
    }, [])

    const colourStyles = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#343a40' : '#FFF',
          width: '500%',
          '&:hover': {
            backgroundColor: '#343a40',
            color: '#FFF'
          }
        }),
        control: (provided) => ({
          ...provided,
          backgroundColor: '#FFF', // Set the background color of the control (search box) to white
          width: '450%'
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          backgroundColor: '#FFF',
          zIndex: 999
        }),
        menuPortal: provided => ({ ...provided, zIndex: 9999 }),
        menu: provided => ({ ...provided, width: '500%', zIndex: 9999 })
      }

    const userType = data?.groups[0]?.name
    const isDisabled = userType === 'pilot'
    return (
        <Fragment>
            <Form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
                <Media className="d-flex w-100">
                    <Media className="mt-25 w-50">
                        <FormGroup className='form-floating mb-3'>
                            <Label for='blockchain'>{"Blockchain"}
                                <span className="text-danger">*</span>
                            </Label>
                            <Input
                                type='select'
                                id='blockchain'
                                name='blockchain'
                                placeholder={"Select Blockchain"}
                                innerRef={register({ required: true })}
                                className={classnames({
                                'is-invalid': errors.blockchain
                                })}
                            >
                                <option value="https://sepolia.arbiscan.io">
                                    {"https://sepolia.arbiscan.io"}
                                </option>
                                <option value="https://testnet-zkevm.polygonscan.com">
                                    {"https://testnet-zkevm.polygonscan.com"}
                                </option>
                            </Input>
                        </FormGroup>            
                    </Media>
                </Media>
                <Media className="d-flex w-100">
                    <Media className="mt-25 w-50">
                        <FormGroup className="form-floating mb-3 mr-75">
                            <Label for="node_url">
                                {"Node URL"}{" "}
                                <span className="text-danger">*</span>
                            </Label>
                            {!isDisabled && <Input
                                type='select'
                                id="node_url"
                                name="node_url"
                                placeholder={"Enter Node URL"}
                                innerRef={register({ required: true })}
                                disabled={isDisabled}
                                className={classnames({
                                "is-invalid": errors.node_url
                                })}
                                value={selectedNode}
                                onChange={handleNodeChange}
                            >
                            { nodeData.filter(item => item.type === 'arbitrum-sepolia').map((e) => {
                                return <option value={e.endpoints}>
                                    {e.endpoints}
                                </option> 
                                })
                            }
                            </Input>}
                            {isDisabled && <Input
                                type="text"
                                id="node_url"
                                name="node_url"
                                placeholder={"Enter Node URL"}
                                innerRef={register({ required: true })}
                                disabled={isDisabled}
                                className={classnames({
                                "is-invalid": errors.node_url
                                })}
                                style={{width: '250%'}}
                            />}
                        </FormGroup>
                    </Media>
                </Media>
                <Media className="d-flex w-100">
                    <Media className="mt-25 w-50">
                        <FormGroup className="form-floating mb-3 mr-75">
                            <Label for="smart_contract_address">
                                {"Smart Contract Address"}{" "}
                                <span className="text-danger">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="smart_contract_address"
                                name="smart_contract_address"
                                placeholder={"Enter Smart Contract Address"}
                                innerRef={register({ required: true })}
                                disabled={isDisabled}
                                className={classnames({
                                "is-invalid": errors.smart_contract_address
                                })}
                            />
                        </FormGroup>
                    </Media>
                    <Media
                        style={{ flex: 1 }}
                        className="mr-25 d-flex flex-row justify-content-end mr-25 flex"
                        right
                    >
                        {data?.smart_contract_address && <a
                        href={`${data.blockchain || 'https://testnet-zkevm.polygonscan.com'}/address/${data.smart_contract_address}`}
                        target="_blank"
                        className="mr-75"
                        size="sm"
                        color="default"
                        >
                        {" "}
                        {"Smart-Contract"} <i />
                        </a>}
                    </Media>
                </Media>
                <Media className="d-flex w-100">
                    <Media className="mt-25 w-50">
                        <FormGroup className="form-floating mb-3 mr-75">
                            <Label for="refresh_rate">
                                {"Refresh Rate"}{" "}
                                <span className="text-danger">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="refresh_rate"
                                name="refresh_rate"
                                placeholder={"Enter Refresh Rate"}
                                innerRef={register({ required: true })}
                                disabled={isDisabled}
                                className={classnames({
                                "is-invalid": errors.node_url
                                })}
                            />
                            </FormGroup>
                        </Media>
                </Media>
            { (data?.groups[0]?.name === 'operator' || data?.groups[0]?.name === 'issuer') && 
                <Row>
                    <Col sm="6">
                    <Media className="mt-25" body>
                        <p>{fileName}</p>
                        <Button tag={Label} className="mr-75" size="sm" color="primary">
                        {"Upload"}
                        <Input
                            id='refContractFile'
                            name='refContractFile'
                            innerRef={register({ required: false })}
                            type='file'
                            onChange={onChange}
                            hidden
                            accept='.abi'
                            className={classnames({
                            'is-invalid': errors.refContractFile
                            })}
                        />
                        </Button>
                        <p className="small mb-0">{"Upload the mission control abi file"}</p>
                        <small className="text-danger">{errors.refContractFile ? errors.refContractFile.message : null}</small>
                    </Media>
                    </Col>

                    <Col className="mt-2" sm="12">
                    <Button type="submit" className="mr-1" color="dark">
                        {loading ? "Saving" : "Save Changes"}
                    </Button>
                    <Link to="/account-settings">
                        <Button color="secondary" outline className="mx-4">
                        {"Cancel"}
                        </Button>
                    </Link>
                    </Col>
                </Row>
            }
            </Form>
        </Fragment>
    )
}

export default MissionControlTab
