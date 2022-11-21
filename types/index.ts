export type Location = {
  lat: string
  lng: string
}
export type SearchData = {
  query: string
  dateFrom?: Date
  dateTo?: Date
  geo?: Location
}
export type FormSearchValues = Omit<SearchData, 'geo'>

export type GeoData = {
  longitude: number
  latitude: number
  accuracy: number
}
export type Photo = {
  url: string
  title: string
  author: string
  id: string
  dateTaken: Date
  datePosted: Date
  geo: GeoData
}

export type PhotoScore = {
  geoDistance: number
  titleDistance: number
  authorDistance: number
  total: number
}
export type PhotoSortWrapper = {
  photo: Photo
  score: PhotoScore
}

export type SwitcherState = 'map' | 'list'
