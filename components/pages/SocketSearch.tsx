import React, {FC, useEffect, useState} from "react"
import {useSocketItemsSearch} from "../../hooks/useSocketItemsSearch";
import {useBasicItemsSearch} from "../../hooks/useBasicItemsSearch";
import {Location, Photo, SearchData, SearchStrategy} from "../../types";
import styled from "styled-components";
import {SearchForm} from "../SearchForm";
import {SubmitHandler} from "react-hook-form";
import {FlickrPhotos} from "../FlickrPhotos";
import {SearchPhotos} from "../PhotosList/SearchPhotos";
import {SocketProgress} from "../SocketProgress";
import {useTimer} from "../../hooks/useTimer";
import {ItemsMap} from "../ItemsMap";
import { PageContainer } from "../styles";
import {Alert, Card, CircularProgress} from "@mui/material";

type Props = {}
const SocketSearch: FC<Props> = () => {
  const {items:itemsFromFlickr, loading: flickrLoading, searchFlickr} = useBasicItemsSearch<Photo>('http://localhost:8080/search/flickr')
  const [center, setCenter] = useState<Location>()
  const {
    items: socketItems,
    loading: socketLoading,
    search: searchWithSocket,
    loadTime,
    progress,
    totalPhotos,
    connected
  } = useSocketItemsSearch()
  const submit:SubmitHandler<SearchData> = async (data: SearchData) => {
    searchWithSocket(data)
    setCenter(data?.geo)
    searchFlickr(data)
  }

  if(!connected) {
    return <CircularProgress/>
  }

  return (
    <PageContainer>
      <Card sx={{p: 4}}>
        <SearchForm submit={submit} loadTime={loadTime}/>
      </Card>
      <div>
        <SocketProgress progress={progress} totalPhotos={totalPhotos} loadTime={loadTime}/>
        {center ? <ItemsMap center={center} items={socketItems}/> : <></>}
        <ItemsList>
          <SearchPhotos photos={socketItems} loading={socketLoading}/>
          <FlickrPhotos photos={itemsFromFlickr} loading={flickrLoading}/>
        </ItemsList>
      </div>
    </PageContainer>
  )
}
export default SocketSearch

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  column-gap: 1em;
`