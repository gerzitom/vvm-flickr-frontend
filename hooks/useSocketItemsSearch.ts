import useSockjs from "react-use-sockjs";
import {useState} from "react";
import {SearchData, SocketResponseProgress} from "../types";
import {useTimer} from "./useTimer";

const initialState:SocketResponseProgress = {payload: [], progress: 0, totalPhotos: 0}
export const useSocketItemsSearch = () => {
  const [socketItemsFromSearch, setSocketItemsFromSearch] = useState<SocketResponseProgress>(initialState)
  const {startTimer, stopTimer, difference} = useTimer()
  const [loading, setLoading] = useState(false)

  const {sendJsonMessage, connect, client} = useSockjs({
    url: 'http://localhost:8080/search',
    topics: ['/topic/news'],
    onMessage: (progress: SocketResponseProgress, destination: any) => {
      if(loading) setLoading(false)
      if(progress.progress === 100) stopTimer()
      setSocketItemsFromSearch(progress)
    },
    autoReconnect: true
  })

  const search = (data: SearchData) => {
    startTimer()
    setLoading(true)
    setSocketItemsFromSearch(initialState)
    sendJsonMessage('/app/search', data)
  }

  return {
    search,
    connect,
    loading,
    loadTime: difference,
    items: socketItemsFromSearch.payload,
    progress: socketItemsFromSearch.progress,
    totalPhotos: socketItemsFromSearch.totalPhotos,
  }
}
