import React from 'react'
import Nav from '../../Config/Navigation'
import Footer from '../../Components/Footer'
import BorderPremium from './Borderpremiumpage'
import Premiumcard from './Premiumcardpage'

function Premiumpage() {
  return (
    <div>
        <Nav/>
        <BorderPremium/>
        <Premiumcard/>
        <Footer/>
      
    </div>
  )
}

export default Premiumpage
