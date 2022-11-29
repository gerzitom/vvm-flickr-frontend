import React, {FC} from "react"
import {PhotoSortWrapper} from "../../types";
import {Alert, Typography} from "@mui/material";
import {PhotoSkeleton} from "../PhotoSkeleton";
import {FlickrPhotoWithScore} from "../FlickrPhotoWithScore";

type Props = {
    photos: PhotoSortWrapper[],
    loading: boolean
}
export const SearchPhotos: FC<Props> = ({photos, loading}) => {
  return (
    <div>
        <Typography sx={{mb: 2}} variant={'h5'}>Reranking search</Typography>
        {loading && <PhotoSkeleton />}
        {!loading && photos.map((item) => (
          <FlickrPhotoWithScore wrapper={item} key={item.photo.id}/>
        ))}
        {!loading && photos.length === 0 && <Alert severity={'warning'}>No items available</Alert>}
    </div>
  )
}
