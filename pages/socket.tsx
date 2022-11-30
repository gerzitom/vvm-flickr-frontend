import React, {FC} from "react"
import {NextPage} from "next";
import {Container} from "@mui/material";
import dynamic from "next/dynamic";
import {PageContainer} from "../components/styles";
import { SockJsProvider } from 'use-sockjs'
import {Frame} from "stompjs";
const SocketSearch = dynamic(() => import('../components/pages/SocketSearch'), {
  ssr: false,
})

const SocketSearchPage:NextPage = () => {
  const handleError = (err: Frame | string) => {
    console.log(err)
  }
  // @ts-ignore
  return (
    <SockJsProvider onError={handleError}>
      <div>
        <SocketSearch />
      </div>
    </SockJsProvider>
  )
}

export default SocketSearchPage
