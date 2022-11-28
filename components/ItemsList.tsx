import React, {FC} from "react"
import {Photo, PhotoSortWrapper, SocketResponseProgress} from "../types";
import {Alert, Typography} from "@mui/material";
import {PhotoSkeleton} from "./PhotoSkeleton";
import {FlickrPhoto} from "./FlickrPhoto";
import {FlickrPhotoWithScore} from "./FlickrPhotoWithScore";
import styled from "styled-components";

type Props = {
  flickrPhotos: Photo[]
  searchPhotos: PhotoSortWrapper[]
  socketSearchPhotos?: SocketResponseProgress
  flickrLoading: boolean
  loading: boolean
}
export const ItemsList: FC<Props> = ({flickrPhotos, searchPhotos, loading, flickrLoading, socketSearchPhotos}) => {
  return (
    <StyledContainer>
      <div>
        <Typography sx={{mb: 2}} variant={'h5'}>Socket search</Typography>
        {socketSearchPhotos && socketSearchPhotos.payload.map((item) => (
          <FlickrPhotoWithScore wrapper={item} key={item.photo.id}/>
        ))}
        {!socketSearchPhotos && <PhotoSkeleton />}
        {socketSearchPhotos && socketSearchPhotos.payload.length === 0 && <Alert severity={'warning'}>No items available</Alert>}
      </div>
      <div>
        <Typography sx={{mb: 2}} variant={'h5'}>Reranking search</Typography>
        {loading && <PhotoSkeleton />}
        {!loading && searchPhotos.map((item) => (
          <FlickrPhotoWithScore wrapper={item} key={item.photo.id}/>
        ))}
        {!loading && searchPhotos.length === 0 && <Alert severity={'warning'}>No items available</Alert>}
      </div>
      <div>
        <Typography sx={{mb: 2}} variant={'h5'}>Flickr search</Typography>
        {flickrLoading && <PhotoSkeleton />}
        {!flickrLoading && flickrPhotos.map((item) => (
          <FlickrPhoto photo={item} key={item.id} />
        ))}
        {!flickrLoading && flickrPhotos.length === 0 && <Alert severity={'warning'}>No items available</Alert>}
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
