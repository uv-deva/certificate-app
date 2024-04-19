import { React, useEffect, useMemo, useState } from "react"
import { Modal, ModalBody } from "reactstrap"
import { GoogleMap, Marker, useLoadScript, Polyline } from "@react-google-maps/api"


const MapModal = ({ mapData, isMapOpen, setIsMapOpen }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY
  })

  const [flightPath, setFlightPath] = useState([])

  const baseIcon = "http://maps.gstatic.com/mapfiles/ms2/micons"

  const center = {
    lat: mapData.flag === 'mapSetting' ? mapData.waypoints[0].latitude : mapData.lat,
    lng: mapData.flag === 'mapSetting' ? mapData.waypoints[0].longitude : mapData.long
  }


  useEffect(() => {
    if (mapData.waypoints && mapData.waypoints.length > 0 && isLoaded) {
      const flightPathCoordinates = mapData.waypoints.map((waypoint) => ({
        lat: waypoint.latitude,
        lng: waypoint.longitude
      }))
      setFlightPath(flightPathCoordinates)
    }
  }, [mapData.waypoints, isLoaded])

const lineSymbol = {
  path: "M 0,-1 0,1",
  strokeOpacity: 1,
  scale: 4
}
const CustomMarkerIcon = {
  DotIcon: [`${baseIcon}/${mapData.iconColor}-dot.png`],
  MarkerIcon: [`${baseIcon}/${mapData.iconColor}.png`],
  PinIcon: [
    mapData.iconColor === 'yellow' ? (
        `${baseIcon}/ylw-pushpin.png`
    ) : mapData.iconColor === 'blue' ? (
        `${baseIcon}/ltblu-pushpin.png`
    ) : mapData.iconColor === 'green' ? ( 
        `${baseIcon}/grn-pushpin.png` 
    ) : `${baseIcon}/${mapData.iconColor}-pushpin.png`
  ]
}

const mapContainerStyle = {
  width: '100%',
  height: '90vh'
}

  return (
    <>
      <Modal
        className={`modal-dialog-centered modal-lg`}
        isOpen={isMapOpen}
        toggle={() => setIsMapOpen(!isMapOpen)}
      >
        <ModalBody>
          <div style={{ height: "90vh", width: "100%" }}>
            {!isLoaded ? (
              <h1>Loading...</h1>
            ) : (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={20}
                mapTypeId="satellite"
              >
                {mapData.wayPointsStatus && flightPath.length > 0 && (
                  <Polyline
                    path={flightPath}
                    options={{
                      strokeColor: 'grey',
                      strokeOpacity: 0,
                      strokeWeight: 1,
                      icons: [
                        {
                          icon: lineSymbol,
                          offset: "0",
                          repeat: "20px"
                        }
                      ]
                    }}
                  />
                )}
                {mapData.flag !== 'mapSetting'  && <Marker position={{ lat: mapData.lat, lng: mapData.long }} />}
                {mapData.wayPointsStatus && mapData.waypoints && mapData.waypoints.map((wayPointData) => {
                  return (
                    <Marker 
                      position={{ lat: wayPointData.latitude, lng: wayPointData.longitude}}
                      label={mapData.wayPointsLabel && {
                        text: String(wayPointData.order),
                        color: 'black',
                        fontWeight: "bold"
                      }}
                      icon={{
                      url: mapData.iconType ? CustomMarkerIcon[mapData.iconType][0] : null // url
                      }}
                    />
                  )
                })}
              </GoogleMap>
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default MapModal
