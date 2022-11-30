import { useSockJs } from 'use-sockjs'
import {useEffect, useRef, useState} from "react";
import {SearchData, SocketResponseProgress} from "../types";
import {useTimer} from "./useTimer";
import {Client, Subscription} from "stompjs";

const SOCKET_URL = 'http://localhost:8080/search'
const TOPIC = '/topic/news'
const SEARCH_URL = '/app/search'

const initialState:SocketResponseProgress = {payload: [], progress: 0, totalPhotos: 0}
export const useSocketItemsSearch = () => {
  const [socketItemsFromSearch, setSocketItemsFromSearch] = useState<SocketResponseProgress>(initialState)
  const {startTimer, stopTimer, difference} = useTimer()
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)

  const { connect, disconnect, subscribe, unsubscribe } = useSockJs()
  const subscriptionRef = useRef<Subscription | null>(null)
  const clientRef = useRef<Client | null>(null)

  useEffect(() => {
    connect({
      url: SOCKET_URL,
      heartbeat: {
        incoming: 600000,
        outgoing: 600000
      },
      onConnected(client) {
        clientRef.current = client
        subscribe({
          destination: TOPIC,
          onSubscribed: (subscription) => {
            setConnected(true)
            subscriptionRef.current = subscription
          },
          onMessage: message => {
            setLoading(false)
            const data:SocketResponseProgress = JSON.parse(message.body)
            if(data.progress === 100) stopTimer()
            setSocketItemsFromSearch(data)
          }
        })
      }
    })

    return ()=>{
      if(subscriptionRef.current){
        unsubscribe(subscriptionRef.current)
      }
      disconnect()
    }
  }, [])

  const search = (data: SearchData) => {
    startTimer()
    setLoading(true)
    setSocketItemsFromSearch(initialState)
    clientRef.current?.send(SEARCH_URL,{}, JSON.stringify(data))
  }

  return {
    search,
    connect,
    loading,
    client: clientRef.current,
    connected,
    loadTime: difference,
    items: socketItemsFromSearch.payload,
    progress: socketItemsFromSearch.progress,
    totalPhotos: socketItemsFromSearch.totalPhotos,
  }
}
