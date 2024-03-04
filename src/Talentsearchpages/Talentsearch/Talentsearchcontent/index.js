import React, { useState, useEffect } from "react";
import axios from "axios";
import IMG from "../../../Assests/talentsearchprofile.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthInfo, setUser } from "../../../store/actions/authActions";
import Loader from "../../../Components/Loader";
import { Imagebaseurl, baseurl } from "../../../Config/utilites";


function Talentsearchcontent() {
  const [forumData, setForumData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const apiUrl =
      userType === "company"
        ? `${baseurl}/company/home/talents`
        : `${baseurl}/talent/home/jobs`;

    const fetchForumData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.user) {
          dispatch(setUser(response.data.user._id));
          localStorage.setItem('userId', response.data.user._id);
        }

        setForumData(response.data.data);
        setIsLoading(false);
        console.log("data check", response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchForumData();
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Loader />;

  }

  if (forumData.length === 0 && !isLoading) {
    return <div>No talents found.</div>; // You can adjust this message as needed
  }

  return (
    <div className="container" style={{margin:"50px auto"}}>
      <div className="row">
        {forumData.map((talent, index) => (
          <div key={index} className="col-md-6">
            <div className="card my-2" style={{ backgroundColor: "#30BDB0", paddingRight:"10px"}}>
              <div className="d-flex ">
                <img
                className="mx-2 my-2"
                  src={`${Imagebaseurl}${talent.user.picture}`}
                  alt="Profile"
                  style={{ width: "20%", height: "20%",borderRadius:"10px" }}
                />
                <div>
                  <h5 className="card-title text-start my-3 text-white">
                    {talent.user.name}
                    <br />
                    <span style={{ fontSize: 18 }}>
                      {talent.title} {talent.description}
                    </span>
                  </h5>
                </div>
                <Link
                  to={`/userprofile/${talent.user._id}`} 
                  style={{ textDecoration: "none", margin: "0 0 0 auto" }}
                >
                  <div
                    className="mx-auto my-3"
                    style={{
                      width: "150px",
                      height: "50px",
                      backgroundColor: "rgb(0, 80, 73)",
                      borderRadius: "10px",
                      padding: "13px 0",
                      color: "#fff",
                    }}
                  >
                    <p>View Profile</p>
                  </div>
                </Link>
              </div>
              <div className="card-body d-flex justify-content-between">
                <div
                  style={{
                    padding: 10,
                    backgroundColor: "#005049",
                    borderRadius: 10,
                  }}
                >
                  <p className="card-text text-start text-white">
                    {talent.type}<span className="mx-3">•</span>
                    {talent.description}
                  </p>
                </div>
                <p className="card-text text-start text-white">
                  {talent.skills ? talent.skills.join(", ") : ""}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Talentsearchcontent;
