import React, {FC, useEffect} from "react"
import {Location} from "../../types";
import { Map, Marker } from "pigeon-maps"
import {useGeolocated} from "react-geolocated";
import {CircularProgress} from "@mui/material";
import {toPigeonCoords, toPigeonCoordsFromLocation} from "../../utility";

type Props = {
    position: Location,
    setLocation: (newLocation: Location) => void
}
export const PigeonMap: FC<Props> = ({position, setLocation}) => {
  const center = toPigeonCoordsFromLocation(position)
  return (
    <Map height={300}
         center={center}
         defaultZoom={14}
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
