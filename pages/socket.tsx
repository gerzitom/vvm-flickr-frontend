import React, {FC} from "react"
import {NextPage} from "next";
import {Container} from "@mui/material";
import dynamic from "next/dynamic";
const SocketSearch = dynamic(() => import('../components/pages/SocketSearch'), {
  ssr: false,
})

const SocketSearchPage:NextPage = () => {
  return (
    <Container>
      <SocketSearch />
    </Container>
  )
}

export default SocketSearchPage
