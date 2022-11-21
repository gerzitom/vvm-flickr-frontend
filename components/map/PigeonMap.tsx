import React, {FC, useEffect} from "react"
import {Location} from "../../types";
import { Map, Marker } from "pigeon-maps"
import {useGeolocated} from "react-geolocated";
import {CircularProgress} from "@mui/material";

type Props = {
    position?: Location,
    setLocation: (newLocation: Location) => void
}
export const PigeonMap: FC<Props> = ({position, setLocation}) => {
  const { coords, isGeolocationEnabled, getPosition, isGeolocationAvailable } = useGeolocated()
  useEffect(() => getPosition(), [])
  useEffect(() => {
    if(coords) setLocation({lat: String(coords!.latitude), lng: String(coords!.longitude)})
  }, [coords])
  if(isGeolocationEnabled && !coords) return <CircularProgress/>
  return (
    <Map height={300}
         defaultCenter={[coords!.latitude, coords!.longitude]} defaultZoom={14}
         onClick={({latLng}) => {
           setLocation({lat: String(latLng[0]), lng: String(latLng[1])})
         }}>
      {position && (
        <Marker
          width={50}
          anchor={[Number(position.lat), Number(position.lng)]}
        />
      )}
    </Map>
  )
}
