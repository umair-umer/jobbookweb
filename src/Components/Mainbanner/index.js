import React, { useState, useEffect } from "react";
import "./Style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import BENERLOGO from "../../Assests/mainbannerlogo.png";
import Select from "react-select";
import { countries } from "countries-list";
import { useMediaQuery } from "react-responsive";
import { AnimateKeyframes } from "react-simple-animate";
function MainBanner() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 600 });
  useEffect(() => {
    // Transform the countries object into an array of options for react-select
    const countryOptionsArray = Object.keys(countries).map((code) => ({
      value: code,
      label: countries[code].name,
    }));
    setCountryOptions(countryOptionsArray);
  }, []);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };
  return (
    <>
      <div className="card main">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6 mb-3 mb-sm-0 " style={{ marginTop: 95 }}>
              <div className="card-body ">
                <h1
                  className="card-title big  rotate-on-hover"
                  data-aos="fade-right"
                >
                  <span className="card-tittle">D</span>iscover
                </h1>

                <h4 className="card-title head" data-aos="fade-right">
                  {" "}
                  Your Path to Success
                </h4>

                <div className="containercontry" data-aos="fade-right">
                  <div>
                    <input
                      type="text"
                      placeholder="Job title or keywords"
                      className="form-control me-1 mainbannerinp custom-select"
                    />
                  </div>
                  <div className="line"></div>
                  <div>
                    <Select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      options={countryOptions}
                      placeholder="Select Country"
                      // className='form-control ms-1'
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "none",
                          width: isMobile ? "100%" : "200px", // Adjust width based on screen width
                        }),
                      }}
                    />
                  </div>

                  <button className="btn btn-success arrowbtn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="36"
                      fill="currentColor"
                      class="bi bi-arrow-right"
                      viewBox="0 0 16 16"
                      className="arrowicon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-sm-6 banerlogo" data-aos="fade-left">
              <div
                className="card-body"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <AnimateKeyframes
                  play
                  iterationCount="infinite"
                  duration={8}
                  keyframes={
                    [
                      // 'transform: rotateX(1) rotateY(2) rotateZ(1)',
                      // 'transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg)',
                    ]
                  }
                >
                  <img
                    src={BENERLOGO}
                    className="text-end img home_bnr_img"
                    alt="Banner Logo"
                  />
                </AnimateKeyframes>

                <h1 className="card-title text-center jobtext">JOBBOOK</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBanner;
