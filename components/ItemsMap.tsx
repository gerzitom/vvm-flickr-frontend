import React, {FC} from "react"
import {Map, Marker} from "pigeon-maps";
import {Location, PhotoSortWrapper} from "../types";
import styled from "styled-components";

type Props = {
  center: Location
  items: PhotoSortWrapper[]
}
export const ItemsMap: FC<Props> = ({center, items}) => {
  const myCenter:[number, number] = [Number(center.lat), Number(center.lng)]
  return (
    <Map
      height={800}
      defaultCenter={myCenter} defaultZoom={14}
    >
      <Marker
        width={50}
        anchor={myCenter}
      />
      {items.map((item) => (
        <Marker
          key={item.photo.id}
          width={50}
          anchor={[Number(item.photo.geo.latitude), Number(item.photo.geo.longitude)]}
        >
          <MarkerImageWrapper>
            <img src={item.photo.url}/>
          </MarkerImageWrapper>
        </Marker>
      ))}
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
