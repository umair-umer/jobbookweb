import React,{useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Worthpage() {
    useEffect(() => {
        AOS.init();
      }, [])
    return (

        <div className='container-fluid'  data-aos="fade-up" style={{ backgroundColor: "#25B1A4"}}>
            <div className="card" style={{ width: "100%", backgroundColor: "#25B1A4",border:"none" }}>
                <div className="card-body d-flex" style={{ justifyContent: "space-around", alignItems: "center",alignItems:"center" }}>
                    <h2 className="card-title text-white">
                        5.3<span style={{color:"#FFA000"}}>K+</span>
                        <br />
                        <h6 className='text-white'>Ready Job Vacancy</h6>
                    </h2>

                    <h2 className="card-subtitle text-white mb-2">
                        1<span style={{color:"#FFA000"}}>M+</span>
                        <br />
                        <h6 className='text-white'>Job Seekers Active</h6>
                    </h2>
                    <h2 className="card-text text-white">
                    5.5<span style={{color:"#FFA000"}}>K+</span>
                        <br />
                        <h6 className='text-white'>Incorporated Company</h6>
                    </h2>

                </div>
            </div>

        </div>

    )
}

export default Worthpage
