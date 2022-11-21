import React, { FC } from 'react'
import { Photo } from '../types'
import { Avatar, Card, Typography } from '@mui/material'
import styled from 'styled-components'
import {Box} from "@mui/system";
import {formatDate} from "../utility/formatters";

type Props = {
  photo: Photo
}
export const FlickrPhoto: FC<Props> = ({ children, photo }) => {
  return (
    <Card sx={{ my: 2 }}>
      <Container>
        <StyledImage>
          <img src={photo.url} />
        </StyledImage>
        <Text>
          <Typography variant={'body2'}>{photo.title}</Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Author>
              <Avatar sx={{ mr: 2, width: 25, height: 25 }} src={photo.author.imageUrl} />
              <Typography variant={'body1'}>{photo.author.username}</Typography>
            </Author>
            <div>
              <Typography variant={'body2'}>{formatDate(new Date(photo.datePosted))}</Typography>
            </div>
          </Box>
          {children}
        </Text>
      </Container>
    </Card>
  )
}

const Container = styled.div`
  gap: 2em;
  position: relative;
`

const StyledImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Text = styled.div`
  padding: 7em 1em 1em;
  position: absolute;
  width: 100%;
  bottom: 0;
  background: linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(18,18,18,1) 10%, rgba(255,255,255,0) 100%);
  color: white;
`

const Author = styled.div`
  margin-top: 1em;
  display: flex;
  align-items: center;
`
