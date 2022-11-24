export type Location = {
  lat: string
  lng: string
}
export type SearchData = {
  query: string
  dateFrom: Date | null
  dateTo: Date | null
  geo?: Location
  pagesToFetch: number
  geoScale: number
  titleScale: number
  nameIncludesBonus: boolean
}
export type FormSearchValues = Omit<SearchData, 'geo'>

export type GeoData = {
  longitude: number
  latitude: number
  accuracy: number
}

export type Author = {
  username:string
  name:string
  imageUrl:string
}
export type Photo = {
  url: string
  title: string
  author: Author
  id: string
  dateTaken: Date
  datePosted: Date
  geo: GeoData
}

export type PhotoScore = {
  geoDistance: number
  titleDistance: number
  authorDistance: number
}
export type PhotoSortWrapper = {
  photo: Photo
  score: number
  scoreStats: PhotoScore
}

export type SwitcherState = 'map' | 'list'
