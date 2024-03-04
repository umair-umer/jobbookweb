import React from 'react';
import IMG from '../../../Assests/Advertisment.png'

const adsData = [
    {
        title: "50% off",
        text: "Take any courses",
        buttonText: "Join now",
        imgSrc: IMG,
        bgColor: "#FF9228"
    },

    {
        title: "50% off",
        text: "Take any courses",
        buttonText: "Join now",
        imgSrc: IMG,
        bgColor: "#83CC93"
    },
    {
        title: "50% off",
        text: "Take any courses",
        buttonText: "Join now",
        imgSrc: IMG,
        bgColor: "#FF9228"
    },

    {
        title: "50% off",
        text: "Take any courses",
        buttonText: "Join now",
        imgSrc: IMG,
        bgColor: "#83CC93"
    },
    {
        title: "50% off",
        text: "Take any courses",
        buttonText: "Join now",
        imgSrc: IMG,
        bgColor: "#FF9228"
    },

    {
        title: "50% off",
        text: "Take any courses",
        buttonText: "Join now",
        imgSrc: IMG,
        bgColor: "#83CC93"
    },
    {
        title: "50% off",
        text: "Take any courses",
        buttonText: "Join now",
        imgSrc: IMG,
        bgColor: "#FF9228"
    },

    {
        title: "50% off",
        text: "Take any courses",
        buttonText: "Join now",
        imgSrc: IMG,
        bgColor: "#83CC93"
    },
];

function AdCard({ ad }) {
    return (
        <div className="card mb-3 mx-1" style={{ minWidth: 390, height: 140, backgroundColor: ad.bgColor }}>
            <div className="row g-0">
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title text-start text-white">{ad.title}</h5>
                        <p className="card-text text-start text-white">{ad.text}</p>
                        <p className='text-start'>
                            <button className='btn btn-success text-start'>{ad.buttonText}</button>
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <img src={ad.imgSrc} className="img-fluid rounded-start" alt="Ad" />
                </div>
            </div>
        </div>
    );
}

function Adspage() {
    return (
        <div className='container my-5'>
            <div className='d-flex flex-row overflow-auto overflow-y-hidden' style={{ gap: '1rem', }}>
                {adsData.map((ad, index) => (
                    <AdCard key={index} ad={ad} />
                ))}
            </div>
        </div>
    );
}

export default Adspage;
