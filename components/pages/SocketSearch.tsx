import React, {FC} from "react"
import {useSocketItemsSearch} from "../../hooks/useSocketItemsSearch";
import {useBasicItemsSearch} from "../../hooks/useBasicItemsSearch";
import {Photo, SearchData} from "../../types";
import styled from "styled-components";
import {SearchForm} from "../SearchForm";
import {SubmitHandler} from "react-hook-form";
import {FlickrPhotos} from "../FlickrPhotos";
import {SearchPhotos} from "../PhotosList/SearchPhotos";
import {SocketProgress} from "../SocketProgress";
import {ItemsMap} from "../ItemsMap";
import {PageContainer} from "../styles";
import {Card, CircularProgress} from "@mui/material";
import {useGeoPosition} from "../../hooks/useGeoPosition";

type Props = {}
const SocketSearch: FC<Props> = () => {
  const {items:itemsFromFlickr, loading: flickrLoading, searchFlickr} = useBasicItemsSearch<Photo>('http://localhost:8080/search/flickr')
  const {location: center, setLocation: setCenter} = useGeoPosition()
  const {
    items: socketItems,
    loading: socketLoading,
    search: searchWithSocket,
    loadTime,
    progress,
    totalPhotos,
    connected,
    isRunning
  } = useSocketItemsSearch()
  const submit:SubmitHandler<SearchData> = async (data: SearchData) => {
    data.geo = center
    searchWithSocket(data)
    searchFlickr(data)
  }

  if(!connected) {
    return <CircularProgress/>
  }

  return (
    <>
      <PageContainer>
        <Card sx={{p: 4}}>
          <SearchForm
            submit={submit}
            loadTime={loadTime}
            loading={isRunning}
            center={center}
            setCenter={setCenter}
          />
        </Card>
        <div>
          <SocketProgress progress={progress} totalPhotos={totalPhotos} loadTime={loadTime} />
          {(isRunning || progress !== 0) ? <ItemsMap center={center} items={socketItems}/> : <></>}
          <ItemsList>
            <SearchPhotos photos={socketItems} loading={socketLoading}/>
            <FlickrPhotos photos={itemsFromFlickr} loading={flickrLoading}/>
          </ItemsList>
        </div>
      </PageContainer>
    </>
  )
}
export default SocketSearch

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  column-gap: 1em;
  margin-top: 1.5em;
`
