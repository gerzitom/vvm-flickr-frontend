import React, {FC} from "react"
import {Photo, PhotoSortWrapper} from "../types";
import {Alert, Typography} from "@mui/material";
import {PhotoSkeleton} from "./PhotoSkeleton";
import {FlickrPhoto} from "./FlickrPhoto";
import {FlickrPhotoWithScore} from "./FlickrPhotoWithScore";
import styled from "styled-components";

type Props = {
  flickrPhotos: Photo[]
  searchPhotos: PhotoSortWrapper[]
  loading: boolean
}
export const ItemsList: FC<Props> = ({flickrPhotos, searchPhotos, loading}) => {
  return (
    <StyledContainer>
      <div>
        <Typography sx={{mb: 2}} variant={'h5'}>Flickr search</Typography>
        {loading && <PhotoSkeleton />}
        {!loading && flickrPhotos.map((item) => (
          <FlickrPhoto photo={item} key={item.id} />
        ))}
        {!loading && flickrPhotos.length === 0 && <Alert severity={'warning'}>No items available</Alert>}
      </div>
      <div>
        <Typography sx={{mb: 2}} variant={'h5'}>Reranking search</Typography>
        {loading && <PhotoSkeleton />}
        {!loading && searchPhotos.map((item) => (
          <FlickrPhotoWithScore wrapper={item} key={item.photo.id}/>
        ))}
        {!loading && searchPhotos.length === 0 && <Alert severity={'warning'}>No items available</Alert>}
      </div>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  gap: 1em;
  margin-top: 1em;
  > div {
    flex: 1;
  }
`