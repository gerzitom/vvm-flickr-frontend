import React, {FC} from "react"
import {Map, Marker} from "pigeon-maps";
// @ts-ignore
import Cluster from 'pigeon-cluster'
import {GeoData, Location, PhotoSortWrapper} from "../types";
import styled from "styled-components";
import { stamenToner } from 'pigeon-maps/providers'

type Props = {
  center: Location
  items: PhotoSortWrapper[]
}
export const ItemsMap: FC<Props> = ({center, items}) => {
  const myCenter:[number, number] = [Number(center.lat), Number(center.lng)]
  const toPigeonCoords = (location: GeoData):[number, number] => {
    return [Number(location.latitude), Number(location.longitude)]
  }
  return (
    <Map
      height={500}
      center={myCenter}
      defaultZoom={10}
    >
      <Cluster>
        {items.reverse().map((item) => (
          <Marker
            key={toPigeonCoords(item.photo.geo).toString()}
            width={50}
            anchor={toPigeonCoords(item.photo.geo)}
            payload={1}
          >
            <MarkerImageWrapper>
              <img src={item.photo.url}/>
            </MarkerImageWrapper>
          </Marker>
        ))}
      </Cluster>
      <Marker
        width={50}
        anchor={myCenter}
      />
    </Map>
  )
}

const MarkerImageWrapper = styled.div`
  border: 1px solid white;
  width: 70px;
  height: 70px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
