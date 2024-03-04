import React from 'react'

function Posttabshere() {
  return (
    <div className="container">
    <div className="dropdown my-3">
      <button
        className="text-start btn btn-light p-2 w-100 dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Post jobs
      </button>
      <ul className="dropdown-menu w-100">
        {/* <li>
          <button className="dropdown-item" type="button">
            Post jobs
          </button>
        </li> */}
        <li>
          <button className="dropdown-item w-100" type="button">
            Saved jobs
          </button>
        </li>
        <li>
          <button className="dropdown-item w-100" type="button">
            Rajected jobs
          </button>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default Posttabshere
