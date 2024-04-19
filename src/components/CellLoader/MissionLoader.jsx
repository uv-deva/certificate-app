import { useEffect, useState } from "react"
import { selectCellLoading } from "../../redux/selectors/table"
import CellSpinner from "../common/CellSpinner"
import { useSelector, useDispatch } from "react-redux"
import { onCellLoading } from "../../redux/actions/table"
import { selectUserData } from "../../redux/selectors/auth"

const MissionLoader = ({ row, type, init, handleMapModalOpen }) => {
  const isLoading = useSelector(selectCellLoading("devices", row?.id))
  const userData = useSelector(selectUserData())
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setLoading(isLoading)
    if (init) {
      dispatch(onCellLoading("devices", row?.id, {}))
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <CellSpinner setLoading={setLoading} />
      ) : (
        <>
          {(() => {
            switch (type) {
              case "Position":
                return (
                  <div className="d-flex align-items-center">

                            {row?.show_waypoints ? (
                                <a
                                  href={"#"}
                                  onClick={() => handleMapModalOpen(
                                      row?.devices_current_position[0]?.device_position?.latitude,
                                      row?.devices_current_position[0]?.device_position?.longitude,
                                      row.id,
                                      row?.way_points_data['waypoints'],
                                      row?.show_waypoints,
                                      row?.show_waypoints_lable,
                                      row?.map_icon_type,
                                      row?.map_icon_color
                                    )
                                  }
                                >
                                  <span className='d-block font-weight-bold word-break'> {String(row?.show_waypoints)} </span>
                                </a>
                              ) : (
                                <span className='d-block font-weight-bold word-break'> {row?.show_waypoints !== undefined ? String(row?.show_waypoints) : "-"} </span>
                            )}
    
                    {/* <span className='d-block font-weight-bold word-break'>{row?.mctMode?.Position ? `height: ${row?.mctMode?.Position?.hagl}, latitude: ${row?.mctMode?.Position?.latitude}, longitude: ${row?.mctMode?.Position?.longitude}` : '-'}</span> */}
                  </div>
                )
              default:
                return null
            }
          })()}
        </>
      )}
    </>
  )
}

export default MissionLoader
