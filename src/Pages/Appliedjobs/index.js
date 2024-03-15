import React from 'react'
import Nav from '../../Config/Navigation'
import Footer from '../../Components/Footer'
import Applyjobscontent from './Appliedjobscontent'
import JobHeader from '../Jobpage/Jobsheader'

function Appliedjobs() {
  return (
    <>
    <Nav/>
    <JobHeader/>
    <Applyjobscontent/>
    <Footer/>
    </>
  )
}

export default Appliedjobs