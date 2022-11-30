import React, {FC, useState} from 'react'
import {PhotoSortWrapper} from "../types";
import MapIcon from "@mui/icons-material/Map";
import IconButton from "@mui/material/IconButton";
import {Card, Dialog} from "@mui/material";
import {Map, Marker} from "pigeon-maps";
import {toPigeonCoords} from "../utility";

type Props = {
  wrapper: PhotoSortWrapper
}
export const PhotoItemMapDialog: FC<Props> = ({wrapper}) => {
  const [open, setOpen] = useState(false)
  const center = toPigeonCoords(wrapper.photo.geo)
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MapIcon/>
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Card sx={{p: 2}}>
          <Map
            width={600}
            height={500}
            defaultCenter={center} defaultZoom={8}
          >
            <Marker
              anchor={center}
              payload={1}
            />
          </Map>
        </Card>
      </Dialog>
    </>
  )
}