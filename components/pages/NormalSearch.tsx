import React, {FC} from "react"
import {SearchForm} from "../SearchForm";
import {SearchPhotos} from "../PhotosList/SearchPhotos";
import {FlickrPhotos} from "../FlickrPhotos";
import {ItemsList} from "./SocketSearch";
import {useBasicItemsSearch} from "../../hooks/useBasicItemsSearch";
import {Photo, PhotoSortWrapper, SearchData} from "../../types";
import {SubmitHandler} from "react-hook-form";
import {useTimer} from "../../hooks/useTimer";
import {PageContainer} from "../styles";
import {useGeoPosition} from "../../hooks/useGeoPosition";

type Props = {
  simpleReranking: boolean
}
const NormalSearch: FC<Props> = ({simpleReranking}) => {
  const {items:itemsFromFlickr, loading: flickrLoading, searchFlickr} = useBasicItemsSearch<Photo>('http://localhost:8080/search/flickr')
  const rerankingSearchLink = simpleReranking ? 'http://localhost:8080/search/rebalanced-without-parallelization' : 'http://localhost:8080/search/rebalanced'
  const {items:itemsFromSearch, loading: searchLoading, searchFlickr: searchRebalanced} = useBasicItemsSearch<PhotoSortWrapper>(rerankingSearchLink)
  const {startTimer, stopTimer, difference} = useTimer()
  const {location: center, setLocation: setCenter} = useGeoPosition()
  const submit:SubmitHandler<SearchData> = async (data: SearchData) => {
    startTimer()
    await searchFlickr(data)
    await searchRebalanced(data)
    stopTimer()
  }
  return (
    <PageContainer>
      <div>
        <SearchForm submit={submit} loadTime={difference} center={center} setCenter={setCenter} />
      </div>
      <div>
        <ItemsList>
          <SearchPhotos photos={itemsFromSearch} loading={searchLoading}/>
          <FlickrPhotos photos={itemsFromFlickr} loading={flickrLoading}/>
        </ItemsList>
      </div>
    </PageContainer>
  )
}

export default NormalSearch
