import {GeoData, Location} from "../types";

export const toPigeonCoords = (location: GeoData):[number, number] => {
  return [Number(location.latitude), Number(location.longitude)]
}

export const toPigeonCoordsFromLocation = (location: Location):[number, number] => {
  return [Number(location.lat), Number(location.lng)]
}
