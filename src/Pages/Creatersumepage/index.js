import React from 'react'
import Nav from '../../Config/Navigation'
import Footer from '../../Components/Footer'
import BorderPremium from '../Premiumpage/Borderpremiumpage'
import Resumecontent from './Resumecontent'

function CreateResumepage() {
  return (
    <div>
    <Nav/>
    <BorderPremium/>
    <Resumecontent/>
    <Footer/>
      
    </div>
  )
}

export default CreateResumepage
