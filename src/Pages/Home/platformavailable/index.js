import React,{useEffect} from "react";
import Demo from '../../../Assests/demo.png'
import './Styles.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Availableplatform() {
  useEffect(()=>{
    AOS.init();
  })
  return (
    <div className='container-fluid'>
 <div className="card" style={{ width: "100%",border:"none",marginTop:"30px" }}>
 <div className="card " style={{border:"none"}}>
 <div className="card-body ms-auto platform"   data-aos="fade-left" >
  <div className="row">
  <div className="col-sm-6 mb-3 mb-sm-0">
    <div className="card" style={{backgroundColor:"#0DC3B1",border:"none"}}>
      <div className="card-body" data-aos="fade-up">
        <img
        src={Demo}
        style={{width:"50%",height:"80%"}}
        />
      </div>
    </div>
  </div>
  <div className="col-sm-4 my-5"  data-aos="fade-left">
    <div className="card"  style={{backgroundColor:"#0DC3B1",border:"none"}}>
      <div className="card-body">
        <h1 className="card-title text-start text-white">Let’s start joining us and get a job</h1>
        <p className="card-text text-start text-white">
        Let’s join our platform at jobs me for an experience in finding a job that is easier and matches what you are looking for 
        </p>
        <a href="#" className="btn btn-success apply1"  data-aos="fade-up" >
        Join now
        </a>

        <a href="#" style={{marginLeft:"40px",color:"#fff"}}  data-aos="fade-left">
        Learn more
        </a>

      </div>
    </div>
  </div>
</div>

  </div>
</div>

  
</div>

    </div>
  )
}

export default Availableplatform
