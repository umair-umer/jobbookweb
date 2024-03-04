import React from 'react'
import TalentNav from '../../Config/Telantnavbar'
import Footer from '../../Components/Footer'
import BorderPremium from '../../Pages/Premiumpage/Borderpremiumpage'
import Adspage from '../../Config/Telantnavbar/Adspage'
import TrainingTabs from './Trainingavailabletabs'

function TalentTraining() {
  return (
    <>
    <TalentNav/>
    <BorderPremium/>
    <Adspage/>
    <TrainingTabs/>
    <Footer/>
    </>
  )
}

export default TalentTraining