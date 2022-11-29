import React, {FC} from "react"
import {Photo} from "../types";
import {Alert, Typography} from "@mui/material";
import {PhotoSkeleton} from "./PhotoSkeleton";
import {FlickrPhoto} from "./FlickrPhoto";

type Props = {
  photos: Photo[],
  loading: boolean
}
export const FlickrPhotos: FC<Props> = ({photos, loading}) => {
  return (
    <div>
      <Typography sx={{mb: 2}} variant={'h5'}>Flickr search</Typography>
      {loading && <PhotoSkeleton />}
      {!loading && photos.map((item) => (
        <FlickrPhoto photo={item} key={item.id} />
      ))}
      {!loading && photos.length === 0 && <Alert severity={'warning'}>No items available</Alert>}
    </div>
  )
}
