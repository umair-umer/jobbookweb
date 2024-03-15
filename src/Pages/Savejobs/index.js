import React from 'react'
import Nav from '../../Config/Navigation'
import Footer from '../../Components/Footer'
import Savejobscontent from './Savejobcontent'
import JobHeader from '../Jobpage/Jobsheader'

function Savejobs() {
  return (
    <>
      <Nav />
      <JobHeader />
      <Savejobscontent />
      <Footer />
    </>
  )
}

export default Savejobs