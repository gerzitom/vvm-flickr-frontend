// @ts-nocheck
import React from "react"
import {NextPage} from "next";
import dynamic from "next/dynamic";
import {SockJsProvider} from 'use-sockjs'
import {Frame} from "stompjs";

const SocketSearch = dynamic(() => import('../components/pages/SocketSearch'), {
  ssr: false,
})

const SocketSearchPage:NextPage = () => {
  const handleError = (err: Frame | string) => {
    console.log(err)
  }
  return (
    <SockJsProvider onError={handleError}>
      <div>
        <SocketSearch />
      </div>
    </SockJsProvider>
  )
}

export default SocketSearchPage
