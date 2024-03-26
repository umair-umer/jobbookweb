import React from 'react'
import Nav from '../../Config/Navigation'
import Footer from '../../Components/Footer'
import Jobcontent from './JobContent'
import Jobborder from './jobTopborder'
import './Style.css'
import Jobheader from './Jobsheader'
import BorderPremium from '../Premiumpage/Borderpremiumpage'

function Jobspage() {
  return (
    <div>
      <Nav />
      {/* <Jobborder/> */}
      <BorderPremium />
      <Jobheader />
      <Jobcontent />
      <Footer />
    </div>
  )
}

export default Jobspage
