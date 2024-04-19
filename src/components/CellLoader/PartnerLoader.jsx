import { useEffect, useState } from 'react'
import { selectCellLoading } from "../../redux/selectors/table"
import CellSpinner from "../common/CellSpinner"
import { useSelector, useDispatch } from 'react-redux'
import { onCellLoading } from "../../redux/actions/table"

const PartnerLoader = ({ row, type, init }) => {
    const isLoading = useSelector(selectCellLoading('partners', row?.id))
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(isLoading)
    
    useEffect(() => {
        if (init && !('mctStatus' in row)) {
            setLoading(isLoading)
            dispatch(onCellLoading('partners', row?.id, {}))
        }
    }, [])

      return (
        <>
          {isLoading ? <CellSpinner setLoading={setLoading} /> : (
            <>
                {(() => {
                    return (
                        <div className='d-flex align-items-center' style={{width: '100px'}}>
                            <span className='d-block font-weight-bold word-break'>{row.mctStatus ? 'registered' : 'unregistered'}</span>
                        </div>   
                    )
                    
                })()}
            </>
          )}
        </>
      )
}

export default PartnerLoader