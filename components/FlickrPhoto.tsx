import React, { FC } from 'react'
import { Photo } from '../types'
import { Avatar, Card, Typography } from '@mui/material'
import styled from 'styled-components'

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
          <Author>
            <Avatar sx={{ mr: 2 }} />
            <Typography variant={'body1'}>{photo.author}</Typography>
          </Author>
        </Text>
      </Container>
      {children}
    </Card>
  )
}

const Container = styled.div`
  gap: 2em;
`

const StyledImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Text = styled.div`
  padding: 1em 1em;
`

const Author = styled.div`
  margin-top: 1em;
  display: flex;
  align-items: center;
`
