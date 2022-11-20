import React, { FC, useState } from 'react'
import { SearchWrapper } from '../../SearchWrapper'
import styled from 'styled-components'
import {FormSearchValues, Photo, PhotoSortWrapper, SearchData} from '../../../types'
import axios from 'axios'
import { FlickrPhoto } from '../../FlickrPhoto'
import { FlickrPhotoWithScore } from '../../FlickrPhotoWithScore'
import {MapComponent} from '../../MapComponent'
import {CircularProgress, Grid, Skeleton, Typography} from '@mui/material'
import {SearchForm} from "../../SearchForm";
import {SubmitHandler} from "react-hook-form";

type Props = {}
const Main: FC<Props> = () => {
  const [itemsFromFlickr, setItemsFromFlickr] = useState<Photo[]>([])
  const [itemsFromSearch, setItemsFromSearch] = useState<PhotoSortWrapper[]>([])
  const [loading, setLoading] = useState(false)
  const submit:SubmitHandler<SearchData> = async (data: SearchData) => {
    setLoading(true)
    const flickr = await axios.post<Photo[]>(
      'http://localhost:8080/search/flickr',
      data
    )
    const rebalanced = await axios.post<PhotoSortWrapper[]>(
      'http://localhost:8080/search/rebalanced',
      data
    )
    setItemsFromFlickr(flickr.data)
    setItemsFromSearch(rebalanced.data)
    setLoading(false)
  }

  return (
    <>
      <Container>
        <div>
          <SearchForm submit={submit}/>
        </div>
        <div>
          <Typography variant={'h3'} sx={{ mt: 3, mb: 2 }}>
            Found photos
          </Typography>
          <ItemsList>
            <div>
              <Typography variant={'h5'}>Flickr search</Typography>
              {loading && <Skeleton variant={'rectangular'}/>}
              {!loading && itemsFromFlickr.map((item) => (
                <FlickrPhoto photo={item} key={item.id} />
              ))}
            </div>
            <div>
              <Typography variant={'h5'}>Reranking search</Typography>
              {loading && <Skeleton variant={'rectangular'}/>}
              {!loading && itemsFromSearch.map((item) => (
                <FlickrPhotoWithScore wrapper={item} key={item.photo.id}/>
              ))}
            </div>
          </ItemsList>
        </div>
      </Container>
    </>
  )
}

export default Main

const ItemsList = styled.div`
  display: flex;
  gap: 1em;
  > div {
    flex: 1;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 2em;
  padding-top: 3em;
`

const SearchFormContainer = styled.div`
`

const MapContainer = styled.div`
  height: 700px;
`
