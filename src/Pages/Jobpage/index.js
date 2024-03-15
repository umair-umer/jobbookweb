import React from 'react'
import Nav from '../../Config/Navigation'
import Footer from '../../Components/Footer'
import Jobcontent from './JobContent'
import Jobborder from './jobTopborder'
import './Style.css'
import Jobheader from './Jobsheader'

function Jobspage() {
  return (
    <div>
      <Nav/>
      <Jobborder/>
      <Jobheader/>
      <Jobcontent/>
      <Footer/>
    </div>
  )
}

export default Jobspage
