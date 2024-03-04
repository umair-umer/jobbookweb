import React from 'react'
import TalentNav from '../../Config/Telantnavbar'
import Footer from '../../Components/Footer'
import BorderPremium from '../../Pages/Premiumpage/Borderpremiumpage'
import Discovertalentpage from './Discovertalentpage'
import Talentsearchcontent from './Talentsearchcontent'

function Talentsearch() {
  return (
    <>
    <TalentNav/>
     <BorderPremium/>
     <Talentsearchcontent/>
    <Footer/>
    </>
  )
}

export default Talentsearch