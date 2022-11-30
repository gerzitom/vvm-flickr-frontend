import React, {FC, useState} from "react"
import {SearchForm} from "../SearchForm";
import {SocketProgress} from "../SocketProgress";
import {SearchPhotos} from "../PhotosList/SearchPhotos";
import {FlickrPhotos} from "../FlickrPhotos";
import {ItemsList} from "./SocketSearch";
import {useBasicItemsSearch} from "../../hooks/useBasicItemsSearch";
import {Photo, PhotoSortWrapper, SearchData, SearchStrategy} from "../../types";
import {SubmitHandler} from "react-hook-form";
import {useTimer} from "../../hooks/useTimer";
import { PageContainer } from "../styles";

type Props = {}
const NormalSearch: FC<Props> = () => {
  const {items:itemsFromFlickr, loading: flickrLoading, searchFlickr} = useBasicItemsSearch<Photo>('http://localhost:8080/search/flickr')
  const {items:itemsFromSearch, loading: searchLoading, searchFlickr: searchRebalanced} = useBasicItemsSearch<PhotoSortWrapper>('http://localhost:8080/search/rebalanced')
  const {startTimer, stopTimer, difference} = useTimer()
  const [searchData, setSearchData] = useState<SearchData>()
  const submit:SubmitHandler<SearchData> = async (data: SearchData) => {
    startTimer()
    setSearchData(data)
    await searchFlickr(data)
    await searchRebalanced(data)
    stopTimer()
  }
  return (
    <PageContainer>
      <div>
        <SearchForm submit={submit} loadTime={difference}/>
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
