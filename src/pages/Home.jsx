import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import AllPosts from './AllPosts'

export default function Home() {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <AllPosts/>

    </div>
  )
}
