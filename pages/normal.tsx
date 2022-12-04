import React from "react"
import {NextPage} from "next";
import dynamic from "next/dynamic";

const Page = dynamic(() => import('../components/pages/NormalSearch'), {
  ssr: false,
})


const NormalSearchPage: NextPage = () => {
  return (
    <>
      <Page simpleReranking={false}/>
    </>
  )
}

export default NormalSearchPage
