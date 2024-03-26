import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Homepage from "./Pages/Home/index.js";
import Signupfrompage from "./Pages/Signuppage/index.js";
import Loginfrompage from "./Pages/Loginpage/index.js";
import Premiumpage from "./Pages/Premiumpage/index.js";
import Traingpage from "./Pages/Trainingpage/index.js";
import Jobpage from "./Pages/Jobpage/index.js";
import CreateResumepage from "./Pages/Creatersumepage/index.js";
//Talent pages
import Talenthomepage from "./Talentsearchpages/Talenthome/index.js";
import Talentsearch from "./Talentsearchpages/Talentsearch/index.js";
import TalentTraining from "./Talentsearchpages/TalentTraing/index.js";
import Talentpremium from "./Talentsearchpages/Talentpremium/index.js";
import TalentPostpage from "./Talentsearchpages/TalentPostjobpages";
import {Navigate, Routes, Route } from "react-router-dom";
import Signupfromcompanypage from "./Pages/Signupcompany";
import Loginfromcompanypage from "./Pages/Companyloginpage";
import Profilesscreen from "./Talentsearchpages/Talentprofilepage";
import Savejobs from "./Pages/Savejobs/index.js";
import Appliedjobs from "./Pages/Appliedjobs/index.js";
import Rejectedjobs from "./Pages/Rejectedjobs/index.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PendingJobs from "./Talentsearchpages/Pendingjobs/index.js";
import SendMessageForm from "./Pages/Chatroom/index.js";
import Addnewsfeed from "./Components/AddNewsforms/index.js";
import Addnewsfeedscomponet from "./Components/AddNewFeed/index.js";
import JobPostForm from "./Components/Jobpostform/index.js";
import Newsforum from './Pages/Forumspage/index.js';
import Newsfeeds from './Pages/NewsFeed/index.js';
import Videocall from './Components/Videocallfeature/index.js';

const isAuthenticated = localStorage.getItem("token");
// Assuming the userRole is stored in localStorage (Replace this with your actual logic)
const userRole = localStorage.getItem("userRole");

function App() {


  // Common routes accessible to all authenticated users
  const commonRoutes = (
    <>
      <Route path="/" exact element={<Homepage />} />
      <Route path="/signup" element={<Signupfrompage />} />
      <Route path="/login" element={<Loginfrompage />} />
      <Route path="/companysignup" element={<Signupfromcompanypage />} />
      <Route path="/companylogin" element={<Loginfromcompanypage />} />
      <Route path="/chatroom" element={<SendMessageForm />} />
    </>
  );

  // Routes exclusive to normal users
  const userExclusiveRoutes = userRole !== "company" ? (
    <>
      <Route path="/premium" element={<Premiumpage />} />
      <Route path="/training" element={<Traingpage />} />
      <Route path="/job" element={<Jobpage />} />
      <Route path="/resume" element={<CreateResumepage />} />
      <Route path="/Appliedjobs" element={<Appliedjobs />} />
      <Route path="/savejobs" element={<Savejobs />} />
      <Route path="/Newsfeeds" element={<Newsfeeds />} />
      <Route path="/Newforums" element={<Newsforum/>} />
      <Route path="/Addnewforums" element={<Addnewsfeed />} />
      <Route path="/Addnewfeeds" element={<Addnewsfeedscomponet />} />
    

    </>
  ) : null;

  // Routes exclusive to company users
  const companyExclusiveRoutes = userRole == "company" ? (
    <>
      <Route path="/companyhomepage" element={<Talenthomepage />} />
      <Route path="/comapnytrainingpage" element={<TalentTraining />} />
      <Route path="/companytalentsearchpage" element={<Talentsearch />} />
      <Route path="/companypremiumpage" element={<Talentpremium />} />
      <Route path="/jobpost" element={<TalentPostpage />} />
      <Route path="/userprofile/:userId" element={<Profilesscreen />} />
      <Route path="/Penddingjobs" element={<PendingJobs />} />
      <Route path="/rejectedjobs" element={<Rejectedjobs />} />
      <Route path="/Addnewforums" element={<Addnewsfeed />} />
      <Route path="/Addnewfeeds" element={<Addnewsfeedscomponet />} />

      <Route path="/postjobform" element={<JobPostForm />} />
    </>
  ) : null;

  // Redirect for unauthorized access
  const unauthorizedRedirect = <Route path="*" element={<Navigate to="/" replace />} />;

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        {commonRoutes}
        {userRole !== "company" && userExclusiveRoutes}
        {userRole === "company" && companyExclusiveRoutes}
        {!isAuthenticated && unauthorizedRedirect}
      </Routes>
    </div>
  );
}

export default App;



// function App() {
//   return (
//     <div className="App">
//       <ToastContainer />
//       <Routes>

//         <Route path="/" exact element={<Homepage />} />
//         <Route path="/signup" element={<Signupfrompage />} />
//         <Route path="/login" element={<Loginfrompage />} />
//         <Route path="/companysignup" element={<Signupfromcompanypage />} />
//         <Route path="/companylogin" element={<Loginfromcompanypage />} />
//         <Route path="/companyhomepage" element={<Talenthomepage />} />
//         <Route path="/premium" element={<Premiumpage />} />
//         <Route path="/training" element={<Traingpage />} />
//         <Route path="/premium" element={<Premiumpage />} />
//         <Route path="/training" element={<Traingpage />} />
//         <Route path="/resume" element={<CreateResumepage />} />
//         <Route path="/job" element={<Jobpage />} />
//         <Route path="/comapnytrainingpage" element={<TalentTraining />} />
//         <Route path="/companytalentsearchpage" element={<Talentsearch />} />
//         <Route path="/companypremiumpage" element={<Talentpremium />} />
//         <Route path="/jobpost" element={<TalentPostpage />} />
//         <Route path="/userprofile/:userId" element={<Profilesscreen />} />
//         <Route path="/savejobs" element={<Savejobs />} />
//         <Route path="/Appliedjobs" element={<Appliedjobs />} />
//         <Route path="/Penddingjobs" element={<PendingJobs />} />
//         <Route path="/rejectedjobs" element={<Rejectedjobs />} />
//         <Route path="/chatroom" element={<SendMessageForm />} />
        
//         <Route path="/Addnewforums" element={<Addnewsfeed />} />
//         <Route path="/Addnewfeeds" element={<Addnewsfeedscomponet />} />
//         <Route path="/postjobform" element={<JobPostForm />} />






//       </Routes>
//     </div>
//   );
// }

// export default App;
