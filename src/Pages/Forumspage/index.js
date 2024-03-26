import React from 'react'
import Nav from '../../Config/Navigation'
import Footer from '../../Components/Footer'
import BorderPremium from '../Premiumpage/Borderpremiumpage'
import Adspage from '../../Config/Telantnavbar/Adspage'
import Furomscontent from './Furomscontent'

function Newsforum() {
  return (
   <>
   <Nav/>
   <BorderPremium/>
   <Adspage/>
   <Furomscontent/>
   <Footer/>
   </>
  )
}

export default Newsforum