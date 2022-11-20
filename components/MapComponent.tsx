import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'
import { useGeolocated } from 'react-geolocated'
import {CircularProgress} from "@mui/material";
import L, {LeafletMouseEvent, Map} from "leaflet";


const globalCenter = new L.LatLng(51.505, -0.09)
const zoom = 13

type Props = {
  map: Map,
  setTargetPosition: (position: L.LatLng) => void
}
const DisplayPosition: FC<Props> = ({ map , setTargetPosition}) => {
  const [position, setPosition] = useState(() => map.getCenter())

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  const onClick = useCallback((ev: LeafletMouseEvent) => {
    console.log(ev.latlng)
    setTargetPosition(ev.latlng)
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    map.on('click', onClick)
    return () => {
      map.off('move', onMove)
      map.off('click', onClick)
    }
  }, [map, onMove])

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
    </p>
  )
}

export const MapComponent:FC<{currPosition?: L.LatLng, setCurrPosition: (position: L.LatLng) => void}> = ({currPosition, setCurrPosition}) => {
  const [map, setMap] = useState<Map>()
  const { coords, isGeolocationEnabled, getPosition, isGeolocationAvailable } = useGeolocated()
  useEffect(() => getPosition(), [])

  const center = useMemo(() => isGeolocationAvailable && coords ? new L.LatLng(coords.latitude, coords.longitude) : globalCenter, [coords])
  const displayMap = useMemo(
    () => (
      <StyledMapContainer>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          ref={setMap}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker key={`marker`} position={new L.LatLng(50.10318641774109, 14.492202516840196)} >
            <Popup>
              <span>Popup</span>
            </Popup>
          </Marker>

          {currPosition ? (
            <Marker key={`marker`} position={new L.LatLng(50.10318641774109, 14.492202516840196)}>
              <Popup>
                <span>Popup</span>
              </Popup>
            </Marker>
          ) : <></>}
        </MapContainer>
      </StyledMapContainer>
    ),
    [center, currPosition, center, map],
  )

  if(isGeolocationEnabled && !coords) return <CircularProgress/>
  return (
    <div style={{height: "100%"}}>
      {map ? <DisplayPosition map={map} setTargetPosition={setCurrPosition} /> : <></>}
      {displayMap}
    </div>
  )
}








// const Map: FC = ({ children }) => {
//   const [map, setMap] = useState(null)
//   console.log(map)
//   const center = [51.505, -0.09]
//   // const { coords, isGeolocationEnabled, getPosition, isGeolocationAvailable } = useGeolocated()
//   // useEffect(() => getPosition(), [])
//   // const center = useMemo<L.LatLng>(() => {
//   //   console.log(coords)
//   //   if(isGeolocationEnabled && coords) return {
//   //     lat: coords!.latitude,
//   //     lng: coords!.longitude
//   //   } as L.LatLng
//   //   return {
//   //     lat: 52,
//   //     lng: -0.09
//   //   } as L.LatLng
//   // }, [coords])
//
//   const displayMap = useMemo(
//     () => (
//       <StyledMapContainer
//         center={center}
//         scrollWheelZoom={false}
//         ref={setMap}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       </StyledMapContainer>
//     ),
//     [],
//   )
//
//   // if(isGeolocationEnabled && !coords) return <CircularProgress/>
//   return (
//   <>
//     {displayMap}
//   </>
//   )
// }
export default MapComponent

const StyledMapContainer = styled.div`
  height: 100%;
  .leaflet-container{
    height: 100%;
  }
`
