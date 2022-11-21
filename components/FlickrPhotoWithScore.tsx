import React, { FC } from 'react'
import { PhotoSortWrapper } from '../types'
import { FlickrPhoto } from './FlickrPhoto'
import { Divider, Typography } from '@mui/material'
import styled from 'styled-components'

type Props = {
  wrapper: PhotoSortWrapper
}
export const FlickrPhotoWithScore: FC<Props> = ({ wrapper }) => {
  return (
    <div>
      <FlickrPhoto photo={wrapper.photo}>
        <ScoreContainer>
          <Divider sx={{ my: 1 }} />
          <Typography variant={'overline'}>
            Total score: <b>{wrapper.score}</b>
          </Typography>
          <Typography variant={'overline'}>
            Geo distance: <b>{wrapper.scoreStats.geoDistance}</b>
          </Typography>
          <Typography variant={'overline'}>
            Title score: <b>{wrapper.scoreStats.titleDistance}</b>
          </Typography>
          <Typography variant={'overline'}>
            Author score: <b>{wrapper.scoreStats.authorDistance}</b>
          </Typography>
        </ScoreContainer>
      </FlickrPhoto>
    </div>
  )
}

const ScoreContainer = styled.div`
  margin-top: 1em;
  span {
    display: block;
    line-height: 1.3;
  }
`
