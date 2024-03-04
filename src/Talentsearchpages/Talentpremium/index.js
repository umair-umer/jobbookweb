import React from 'react'
import TalentNav from '../../Config/Telantnavbar'
import Footer from '../../Components/Footer'
import BorderPremium from '../../Pages/Premiumpage/Borderpremiumpage'
import Talentpremiumcard from './Talentpremiumcard'
function Talentpremium() {
  return (
    <>
    <TalentNav/>
    <BorderPremium/>
    <Talentpremiumcard/>
    <Footer/>
    </>
  )
}

export default Talentpremium