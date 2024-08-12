import React from 'react'
import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelServices'
import Parallax from '../common/Parallax'

function Home() {
  return (
    <section>
        <MainHeader/>
        <section className='container'>
        <Parallax/>
        <HotelService/>
        <Parallax/>
        </section>
    </section>
  )
}

export default Home