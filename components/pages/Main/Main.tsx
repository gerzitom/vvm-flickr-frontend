import React, { FC, useState } from 'react'
import { SearchWrapper } from '../../SearchWrapper'
import styled from 'styled-components'
import {
  FormSearchValues,
  Photo,
  PhotoSortWrapper,
  SearchData,
  SocketResponseProgress,
  SwitcherState
} from '../../../types'
import axios from 'axios'
import { FlickrPhoto } from '../../FlickrPhoto'
import { FlickrPhotoWithScore } from '../../FlickrPhotoWithScore'
import {MapComponent} from '../../MapComponent'
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Grid,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import {SearchForm} from "../../SearchForm";
import {SubmitHandler} from "react-hook-form";
import {PhotoSkeleton} from "../../PhotoSkeleton";
import {Box} from "@mui/system";
import {ListMapSwitcher} from "../../ListMapSwitcher";
import {ItemsMap} from "../../ItemsMap";
import {ItemsList} from "../../ItemsList";
import {SocketItems} from "../SocketItems";
import useSockjs from "react-use-sockjs";
import {SocketProgress} from "../../SocketProgress";


type Props = {}
const Main: FC<Props> = () => {
  const [itemsFromFlickr, setItemsFromFlickr] = useState<Photo[]>([])
  const [itemsFromSearch, setItemsFromSearch] = useState<PhotoSortWrapper[]>([])
  const [socketItemsFromSearch, setSocketItemsFromSearch] = useState<SocketResponseProgress|undefined>()
  const [searchData, setSearchData] = useState<SearchData>()
  const [loading, setLoading] = useState(false)
  const [flickrLoading, setFlickrLoading] = useState(false)
  const {sendJsonMessage, connect, client} = useSockjs({
    url: 'http://localhost:8080/search',
    topics: ['/topic/news'],
    onMessage: (photos: any, destination: any) => {
      setSocketItemsFromSearch(photos)
    },
    autoReconnect: true
  })
  console.log(client)
  const submit:SubmitHandler<SearchData> = async (data: SearchData) => {
    setSearchData(data)
    sendJsonMessage('/app/search', data)
    // setLoading(true)
    // setFlickrLoading(true)
    // axios.post<Photo[]>(
    //   'http://localhost:8080/search/flickr',
    //   data
    // )
    //   .then(response => {
    //     setFlickrLoading(false)
    //     setItemsFromFlickr(response.data)
    //   })
    // axios.post<PhotoSortWrapper[]>(
    //   'http://localhost:8080/search/rebalanced',
    //   data
    // )
    //   .then(response => {
    //     setLoading(false)
    //     setItemsFromSearch(response.data)
    //   })
  }

  const [switcherState, setSwitcherState] = React.useState<SwitcherState>('list');

  return (
    <>
      <Container>
        <div>
          <Button onClick={connect} >Connect</Button>
          <SearchForm submit={submit}/>
        </div>
        <div>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant={'h3'} sx={{ mt: 3, mb: 2 }}>
              Found photos
            </Typography>
            <ListMapSwitcher state={switcherState} setState={setSwitcherState}/>
          </Box>
          {socketItemsFromSearch && <SocketProgress progress={socketItemsFromSearch}/>}
          {/*<SocketItems searchData={searchData} newChunk={handleNewChunkFromSocket}/>*/}
          {switcherState === 'list' && (
            <ItemsList flickrPhotos={itemsFromFlickr} searchPhotos={itemsFromSearch} loading={loading} flickrLoading={flickrLoading} socketSearchPhotos={socketItemsFromSearch}/>
          )}
          {switcherState === 'map' && searchData && (
            <ItemsMap center={searchData!.geo!} items={itemsFromSearch}/>
          )}
        </div>
      </Container>
    </>
  )
}

export default Main

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2em;
  padding-top: 3em;
`
