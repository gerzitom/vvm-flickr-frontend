import {GeoData} from "../types";

export const toPigeonCoords = (location: GeoData):[number, number] => {
  return [Number(location.latitude), Number(location.longitude)]
}