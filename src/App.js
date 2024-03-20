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
import { Routes, Route } from "react-router-dom";
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

// Dummy authentication check (replace with your actual logic)
const isAuthenticated = localStorage.getItem("token");

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>

        <Route path="/" exact element={<Homepage />} />
        <Route path="/signup" element={<Signupfrompage />} />
        <Route path="/login" element={<Loginfrompage />} />
        <Route path="/companysignup" element={<Signupfromcompanypage />} />
        <Route path="/companylogin" element={<Loginfromcompanypage />} />
        <Route path="/companyhomepage" element={<Talenthomepage />} />
        <Route path="/premium" element={<Premiumpage />} />
        <Route path="/training" element={<Traingpage />} />
        <Route path="/premium" element={<Premiumpage />} />
        <Route path="/training" element={<Traingpage />} />
        <Route path="/resume" element={<CreateResumepage />} />
        <Route path="/job" element={<Jobpage />} />
        <Route path="/comapnytrainingpage" element={<TalentTraining />} />
        <Route path="/companytalentsearchpage" element={<Talentsearch />} />
        <Route path="/companypremiumpage" element={<Talentpremium />} />
        <Route path="/jobpost" element={<TalentPostpage />} />
        <Route path="/userprofile/:userId" element={<Profilesscreen />} />
        <Route path="/savejobs" element={<Savejobs />} />
        <Route path="/Appliedjobs" element={<Appliedjobs />} />
        <Route path="/Penddingjobs" element={<PendingJobs />} />
        <Route path="/rejectedjobs" element={<Rejectedjobs />} />
        <Route path="/chatroom" element={<SendMessageForm />} />




      </Routes>
    </div>
  );
}

export default App;
