import React from 'react'
import Footer from '../../Components/Footer'
import TalentNav from '../../Config/Telantnavbar'
import BorderPremium from '../../Pages/Premiumpage/Borderpremiumpage'
import Adspage from '../../Config/Telantnavbar/Adspage'
import Talenthomecontent from '../Talenthomescontent'

function Talenthomepage() {
  return (
    <>
    <TalentNav/>
    <BorderPremium/>
    <Adspage/>
    <Talenthomecontent/>
    <Footer/>
    </>
  )
}

export default Talenthomepage