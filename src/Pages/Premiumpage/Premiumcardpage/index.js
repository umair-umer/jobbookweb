import React from 'react'
import './Styles.css'
import BAG from '../../../Assests/pre1.png'
import PERSON from '../../../Assests/pre2.png'
import PEOPLE from '../../../Assests/pre3.png'
function Premiumcard() {
    return (
        <div className='container my-5'>
            <div className="card-body">
                <h2 className="card-title text-center">Premium</h2>
            </div>

        <div className='container' style={{marginTop:"80px"}}>
        <div className="row row-cols-1 row-cols-md-3 g-4 my-3">
                <div className="col" >
                    <div className="card"  style={{borderRadius:"20px"}}>
                         <div className="card-header cardheader"  style={{borderRadius:"20px"}}>
                            <p className="text-body-secondary text-center">Started Plan</p>
                        </div>
                      
                        <div className=' shapestyle'>
                            <img
                                src={BAG}
                                style={{ width: "20%", height: "32%", marginTop: "50px" }}
                            />
                            <h4 style={{ marginTop: "20px", color:"#000", fontSize:30 }}>Land your dream job</h4>
                        </div>
                        <div className="card-body">
                            {/* <h5 className="card-title">Card title</h5> */}
                            <p className="card-text">
                            <ul>
                                <li className='text-start my-3'>
                                    Stand out to hiring managers
                                </li>
                                <li className='text-start my-3'>
                                Get in touch with recruiters
                                </li>
                                <li className='text-start my-3'>
                                    See how your compare to other candidates
                                </li>
                            </ul>
                            </p>
                            <center>
                            <h3  className="card-text"> $50/mo</h3>
                            <button className='btn btn-success prem_card_btn text-center'>Buy Now</button>
                            </center>
                        </div>
                    </div>
                </div>
                <div className="col  my-5">
                    <div className="card"  style={{borderRadius:"20px"}}>
                        <div className="card-header cardheader"  style={{borderRadius:"20px"}}>
                            <p className="text-body-secondary text-center">Premium Plan</p>
                        </div>
                        <div className=' shapestyle2'>
                            <img
                                src={PERSON}
                                style={{ width: "35%", height: "42%", marginTop: "30px" }}
                            />
                            <h4 style={{  marginTop: "20px", color:"#fff", fontSize:30 }}>Grow and nurture your network</h4>
                        </div>
                        <div className="card-body">
                            {/* <h5 className="card-title">Card title</h5> */}
                            <p className="card-text">
                            <ul>
                                <li className='text-start my-3'>
                                Stand out to hiring managers
                                </li>
                                <li className='text-start my-3'>
                                Get in touch with recruiters
                                </li>
                                <li className='text-start my-3'>
                                    See how your compare to other candidates
                                </li>
                                <li className='text-start my-3'>
                                    See how your compare to other candidates
                                </li>
                                <li className='text-start my-3'>
                                    See how your compare to other candidates
                                </li>
                            </ul>
                            </p>
                            <h3  className="card-text"> $50/mo</h3>
                            <button className='btn btn-success prem_card_btn text-center'>Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card"  style={{borderRadius:"20px"}}>
                        <div className="card-header cardheader"  style={{borderRadius:"20px"}}>
                            <p className="text-body-secondary text-center">Ultimate Plan</p>
                        </div>
                        <div className=' shapestyle'>
                            <img
                                src={PEOPLE}
                                style={{ width: "50%", height: "45%", marginTop: "20px" }}
                            />
                            <h4 style={{ marginTop: "20px", color:"#000", fontSize:30  }}>Find and hire talent</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                            <ul>
                                <li className='text-start my-3'>
                                    Stand out to hiring managers
                                </li>
                                <li className='text-start my-3'>
                                    Get in touch with recrulters
                                </li>
                                <li className='text-start my-3'>
                                    See how your compare to other candidates
                                </li>
                            </ul>
                            </p>
                            <h3  className="card-text"> $50/mo</h3>
                            <button className='btn btn-success prem_card_btn text-center'>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Premiumcard
