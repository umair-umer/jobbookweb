import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader";
import { Imagebaseurl, baseurl } from "../../../Config/utilites";

function Talentsearchcontent() {
  const [forumData, setForumData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Adjust itemsPerPage to 15 as per your new requirement
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const userType = localStorage.getItem("userRole");
    const apiUrl =
      userType === "company"
        ? `${baseurl}/company/home/talents`
        : `${baseurl}/talent/home/jobs`;

    const fetchForumData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.data) {
          setForumData(response.data.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchForumData();
  }, []);

  const totalPages = Math.ceil(forumData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = forumData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>; // Updated to display error message
  }

  return (
    <div className="container" style={{ margin: "50px auto" }}>
      <div className="row">
        {currentItems.map((talent, index) => (
          <div key={index} className="col-md-6">
            <div className="card my-2" style={{ backgroundColor: "#30BDB0", paddingRight: "10px" }}>
              <div className="d-flex">
                <img
                  className="mx-2 my-2"
                  src={`${Imagebaseurl}${talent.picture}`}
                  alt="Profile"
                  style={{ width: "20%", height: "20%", borderRadius: "10px" }}
                />
                <div>
                  <h5 className="card-title text-start my-3 text-white">
                    {talent.name}
                    <br />
                    <span style={{ fontSize: "16px" }}>
                      {talent.email}
                    </span>
                    <br />
                    <span style={{ fontSize: "14px" }}>
                      {talent.phone}
                    </span>
                  </h5>
                </div>
                <Link to={'/chatroom'} style={{ textDecoration: "none", margin: "25px 0px 0px auto" }} >
                  <div 
            

                     style={{

                      borderRadius: "10px",
                      padding: "5px 10px",
                      color: "#fff",
                      background: "#000",
                    }}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                  </svg>
                  </div>
                </Link>
                <Link
                  to={`/userprofile/${talent._id}`}
                  style={{ textDecoration: "none", margin: "0 0 0 15px" }}
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
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination my-5" style={{ alignSelf: "center" }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Talentsearchcontent;




