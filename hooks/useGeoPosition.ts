import {useGeolocated} from "react-geolocated";
import {useEffect, useState} from "react";
import {Location} from "../types";


const DEFAULT_LOCATION: Location = {
  "lat": "50.08491399290603",
  "lng": "14.425245006866959"
}
export const useGeoPosition = () => {
  const { coords, getPosition } = useGeolocated()
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION)

  useEffect(() => getPosition(), [])
  useEffect(() => {
    if(coords) {
      setLocation({lat: String(coords.latitude), lng: String(coords.longitude)})
    }
  }, [coords])

  return {
    location, setLocation
  }
}
