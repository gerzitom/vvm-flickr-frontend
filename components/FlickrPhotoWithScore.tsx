import React, {FC} from 'react'
import {PhotoSortWrapper} from '../types'
import {FlickrPhoto} from './FlickrPhoto'
import {Box, Chip, ChipProps, Divider, Typography} from '@mui/material'
import styled from 'styled-components'
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {PhotoItemMapDialog} from "./PhotoItemMapDialog";

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
          <Typography variant={'overline'} sx={{mb: 0}}>Score: {wrapper.score}</Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            {wrapper.scoreStats && (
              <div>
                <Chip icon={<GpsFixedIcon/>} label={wrapper.scoreStats.geoDistance} {...ChipsProps} />
                <Chip icon={<TextFormatIcon/>} label={wrapper.scoreStats.titleDistance} {...ChipsProps} />
                <Chip icon={<CalendarMonthIcon/>} label={wrapper.scoreStats.dateDistance} {...ChipsProps} />
              </div>
            )}
            <PhotoItemMapDialog wrapper={wrapper}/>
          </Box>
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
