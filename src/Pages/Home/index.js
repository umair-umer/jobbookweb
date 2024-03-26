import React from 'react'
import Mainbannar from '../../Components/Mainbanner'
import Clientpage from './Clientpage'
import Worthpage from './Worthpage'
import Contentpage from './Contentpage'
import Popularjob from './Pupolarpage'
import Availablejobs from './Availablejob'
import Availableplatform from './platformavailable'
import Aboutapplication from './Applicationavailable'
import Nav from '../../Config/Navigation'
import Footer from '../../Components/Footer'
import JobPostModal from '../../Components/Postjobmodal'


function Homepage() {
  return (
    <div>
      <Nav/>
      <Mainbannar/>
      <Clientpage/>
      <Worthpage/>
      <Contentpage/>
      <Popularjob/>
      <Availablejobs/>
      <Availableplatform/>
      <Aboutapplication/>
      <JobPostModal/>
      <Footer/>
    </div>
  )
}

export default Homepage
