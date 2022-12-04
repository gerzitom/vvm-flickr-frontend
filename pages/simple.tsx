import React from 'react'
import dynamic from "next/dynamic";
import {NextPage} from "next";

const Page = dynamic(() => import('../components/pages/NormalSearch'), {
    ssr: false,
})

const SimpleSearchPage: NextPage = () => {
  return <Page simpleReranking={true}/>
}

export default SimpleSearchPage
