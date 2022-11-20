import React, { FC } from 'react'
import { useMap } from 'react-leaflet'
import { SearchForm } from './SearchForm'
import { FormSearchValues, Location, SearchData } from '../types'
import { SubmitHandler } from 'react-hook-form'

type Props = {
  newSearchQuery: (data: SearchData) => void
}
export const SearchWrapper: FC<Props> = ({ newSearchQuery }) => {
  // const map = useMap()
  const submitHandler: SubmitHandler<FormSearchValues> = (data) => {
    const mapCenter = map.getCenter()
    const center: Location = {
      lat: String(mapCenter.lat),
      lng: String(mapCenter.lng),
    }
    newSearchQuery({ ...data, geo: center })
  }
  return <SearchForm submit={submitHandler} />
}
