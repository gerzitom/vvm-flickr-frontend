import React, { FC } from 'react'
import { PhotoSortWrapper } from '../types'
import { FlickrPhoto } from './FlickrPhoto'
import {Chip, ChipProps, Divider, Typography} from '@mui/material'
import styled from 'styled-components'
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TextFormatIcon from '@mui/icons-material/TextFormat';

type Props = {
  wrapper: PhotoSortWrapper
}
export const FlickrPhotoWithScore: FC<Props> = ({ wrapper }) => {
  const ChipsProps:ChipProps = {
    size: 'small',
    sx:{mr: 1, '& span': {lineHeight: "1!important", fontSize: 11}},
    variant: 'outlined'
  }
  return (
    <div>
      <FlickrPhoto photo={wrapper.photo}>
        <ScoreContainer>
          <Divider sx={{ my: 1 }} />
          <Chip icon={<OfflineBoltIcon/>} label={wrapper.score} {...ChipsProps}/>
          {wrapper.scoreStats && (
            <>
              <Chip icon={<GpsFixedIcon/>} label={wrapper.scoreStats.geoDistance} {...ChipsProps} />
              <Chip icon={<TextFormatIcon/>} label={wrapper.scoreStats.titleDistance} {...ChipsProps} />
            </>
          )}
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
