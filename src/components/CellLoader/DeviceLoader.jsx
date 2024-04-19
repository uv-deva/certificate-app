import { useEffect, useState, useRef } from "react"
import { selectCellLoading } from "../../redux/selectors/table"
import CellSpinner from "../common/CellSpinner"
import { useSelector, useDispatch } from "react-redux"
import { onCellLoading } from "../../redux/actions/table"
import { selectUserData } from "../../redux/selectors/auth"

const DeviceLoader = ({ row, type, init, handleMapModalOpen }) => {
  const isLoading = useSelector(selectCellLoading("devices", row?.id))
  const userData = useSelector(selectUserData())
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(isLoading)
  const initialRender = useRef(true)

  useEffect(() => {
    setLoading(isLoading)
    if (init && !('mctStatus' in row)) {
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
              case "Mission Status":
                return row?.mctMode?.DeviceMissionStatus?.status || "None"
              case "Mode":
                return row?.mctDeviceMode === 1 ? "Automatic" : "Manual"
              case "Position":
                return (
                  <div className="d-flex align-items-center">
                    <table>
                      <tbody>
                        <tr key={"height:"}>
                          <td>{"h: "}</td>
                          <td>
                            {row?.mctMode?.Position?.hagl !== undefined ? (
                                parseFloat(row?.mctMode?.Position?.hagl).toFixed(2)
                            ) : "-"}
                          </td>
                        </tr>
                        <tr key={"latitude"}>
                          <td>{"lat: "}</td>
                          <td>
                            {row?.mctMode?.Position?.latitude !== undefined ? (
                              userData?.map_feature ? (
                                <a
                                  href={"#"}
                                  onClick={() => handleMapModalOpen(
                                      row?.mctMode?.Position?.latitude,
                                      row?.mctMode?.Position?.longitude,
                                      row.id,
                                      row?.way_points_data.waypoints,
                                      row?.way_points_data.show_waypoints,
                                      row?.way_points_data.show_waypoints_lable,
                                      row?.way_points_data.map_icon_color,
                                      row?.way_points_data.map_icon_type
                                    )
                                  }
                                >
                                  {row?.mctMode?.Position?.latitude}
                                </a>
                              ) : (
                                row?.mctMode?.Position?.latitude
                              )
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                        <tr key={"longitude"}>
                          <td>{"long: "}</td>
                          <td>
                            {row?.mctMode?.Position?.longitude !== undefined ? (
                              row?.mctMode?.Position?.longitude
                            ) : "-"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* <span className='d-block font-weight-bold word-break'>{row?.mctMode?.Position ? `height: ${row?.mctMode?.Position?.hagl}, latitude: ${row?.mctMode?.Position?.latitude}, longitude: ${row?.mctMode?.Position?.longitude}` : '-'}</span> */}
                  </div>
                )
              case "Heartbeat":
                return row?.mctMode?.Heartbeat ? (
                  <span className="text-success">{"Online"}</span>
                ) : (
                  "Offline"
                )
              case "Mission Control":
                return row.mctStatus ? "registered" : "unregistered"
              default:
                return null
            }
          })()}
        </>
      )}
    </>
  )
}

export default DeviceLoader
