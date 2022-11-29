import {useState} from "react";
import {Photo, PhotoSortWrapper, SearchData} from "../types";
import axios from "axios";

export const useBasicItemsSearch = <T>(url: string) => {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)

  const searchFlickr = async (data: SearchData) => {
    setLoading(true)
    const response = await axios.post<T[]>(url, data)
    setLoading(false)
    setItems(response.data)
  }

  return {items, loading, searchFlickr}
}
