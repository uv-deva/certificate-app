import React, { useEffect } from "react"
import { Spinner } from "reactstrap"

const CellSpinner = ({ setLoading }) => {

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [setLoading])
    return (
        <React.Fragment>
            <Spinner color="primary" className='top-50 start-50' />
        </React.Fragment>
    )
}

export default CellSpinner