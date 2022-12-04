import React, {FC} from 'react'
import {PhotoSortWrapper} from "../types";
import styled from "styled-components";
import {FlickrPhotoWithScore} from "./FlickrPhotoWithScore";

type Props = {
  photos: PhotoSortWrapper[]
}
export const PhotosFullPagePageView: FC<Props> = ({photos}) => {
  return (
    <PhotosContainer>
      <PhotoCol>
        {photos.map((photo, i) => {
          if(i % 3 === 0){
            return <PhotoWrapper key={photo.photo.id}>
              <FlickrPhotoWithScore wrapper={photo}/>
            </PhotoWrapper>
          }
          return <></>
        })}
      </PhotoCol>
      <PhotoCol>
        {photos.map((photo, i) => {
          if(i % 3 === 1){
            return <PhotoWrapper key={photo.photo.id}>
              <FlickrPhotoWithScore wrapper={photo}/>
            </PhotoWrapper>
          }
          return <></>
        })}
      </PhotoCol>
      <PhotoCol>
        {photos.map((photo, i) => {
          if(i % 3 === 2){
            return <PhotoWrapper key={photo.photo.id}>
              <FlickrPhotoWithScore wrapper={photo}/>
            </PhotoWrapper>
          }
          return <></>
        })}
      </PhotoCol>

    </PhotosContainer>
  )
}

const PhotosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
`

const PhotoCol = styled.div`
  flex: 1;
`

const PhotoWrapper = styled.div`
`
