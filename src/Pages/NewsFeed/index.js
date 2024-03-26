import React from 'react'
import Nav from '../../Config/Navigation'
import Footer from '../../Components/Footer'
import BorderPremium from '../Premiumpage/Borderpremiumpage'
import Adspage from '../../Config/Telantnavbar/Adspage'
import FeedsTabs from './Newsfeedcontent'

function Newsfeeds() {
  return (
  <>
  <Nav/>
  <BorderPremium/>
  <Adspage/>
  <FeedsTabs/>
  <Footer/>
  </>
  )
}

export default Newsfeeds