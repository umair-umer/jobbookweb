import React from 'react'
import TalentNav from '../../Config/Telantnavbar'
import BorderPremium from '../../Pages/Premiumpage/Borderpremiumpage'
import Userprofilescreen from './Profilescreen'
import Footer from '../../Components/Footer'

function Profilesscreen() {
  return (
    <div>
       <TalentNav/>
       <BorderPremium/>
       <Userprofilescreen/>
       <Footer/>
    </div>
  )
}

export default Profilesscreen
