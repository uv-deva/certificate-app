import { useEffect, useState } from 'react'
import { selectCellLoading } from '../../redux/selectors/table'
import CellSpinner from "../common/CellSpinner"
import { useSelector, useDispatch } from 'react-redux'
import { onCellLoading } from "../../redux/actions/table"

const ScenarioLoader = ({ row, type, init }) => {
    const isLoading = useSelector(selectCellLoading('scenarios', row?.id))
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(isLoading)
    
    useEffect(() => {
        if (init && !('mctStatus' in row)) {
            setLoading(isLoading)
            dispatch(onCellLoading('scenarios', row?.id, {}))
        }
    }, [init])

      return (
        <>
          {isLoading ? <CellSpinner setLoading={setLoading} /> : (
            <>
                {(() => {
                    switch (type) {
                    case 'Mission Control':
                        return row.missionControlStatus ? 'registered' : 'unregistered'
                    case 'Status':
                        return row.missionControlStatus && row.missionControlStatus !== 'Error' ? row.mctStatus?.status : 'None'
                    default:
                        return null
                    }
                })()}
            </>
          )}
        </>
      )
}

export default ScenarioLoader