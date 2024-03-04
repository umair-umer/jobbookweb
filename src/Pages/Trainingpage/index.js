import React from 'react'
import Nav from '../../Config/Navigation'
import Footer from '../../Components/Footer'
import BorderPremium from '../Premiumpage/Borderpremiumpage'
import Trainingpagecontent from './Trainingcontent'

function Traingpage() {
  return (
    <div>
    <Nav/>
    <BorderPremium/>
    <Trainingpagecontent/>

    <Footer/>
      
    </div>
  )
}

export default Traingpage
