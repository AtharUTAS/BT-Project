import React, { useEffect, useState } from "react";

function AllResults({ setPage, lang, changeLang }) {

  const [results, setResults] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3001/all-results")
      .then(res => res.json())
      .then(data => setResults(data));

  }, []);

  return (
    <div className="welcome-page2">

      <div className="navbar2">

        <div className="logo">Logo</div>

        <div className="nav-links2">

          <span onClick={() => setPage("welcome")}>
            {lang === "en" ? "Welcome" : "الرئيسية"}
          </span>

          <span onClick={() => setPage("jobs")}>
            {lang === "en" ? "Jobs" : "الوظائف"}
          </span>

          <span
            onClick={changeLang}
            style={{ color: "orange", cursor: "pointer" }}
          >
            {lang === "en" ? "AR" : "EN"}
          </span>

        </div>
      </div>

      <div className="login-container">

        <h2>
          {lang === "en"
            ? "All Users Results"
            : "نتائج جميع المستخدمين"}
        </h2>

        {results.map((item, index) => (

          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "15px",
              color: "white"
            }}
          >

            <h3>{item.email}</h3>

            <p>
              {lang === "en"
                ? "Best Field:"
                : "أفضل تخصص:"}
              {" "}
              {item.bestField}
            </p>

            {item.percentages && Object.entries(item.percentages).map(([key, value]) => (

              <p key={key}>
                {key}: {value}%
              </p>

            ))}

          </div>

        ))}

      </div>
    </div>
  );
}

export default AllResults;