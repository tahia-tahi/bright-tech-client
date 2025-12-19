import React from 'react'
import Banner from '../components/Banner'
import AllPosts from './AllPosts'
import Features from '../components/Features'
import SubscribeSection from '../components/SubscribeSection'

export default function Home() {
  return (
    <div>
        <Banner/>
        <AllPosts/>
        <SubscribeSection/>
        <Features/>

    </div>
  )
}
