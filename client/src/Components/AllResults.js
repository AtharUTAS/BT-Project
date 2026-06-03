import React, { useEffect, useState } from "react";

function AllResults({ setPage, lang, changeLang }) {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const res = await fetch("http://localhost:3001/all-results");

        if (!res.ok) {
          setResults([]);
          setLoading(false);
          return;
        }

        const data = await res.json();

        setResults(Array.isArray(data) ? data : []);

      } catch (err) {
        console.log(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  const fieldNames = {
    software: lang === "en" ? "Software Engineering" : "هندسة البرمجيات",
    networking: lang === "en" ? "Networking" : "الشبكات",
    cybersecurity: lang === "en" ? "Cybersecurity" : "الأمن السيبراني",
    ai: lang === "en" ? "Artificial Intelligence" : "الذكاء الاصطناعي",
    database: lang === "en" ? "Database Systems" : "قواعد البيانات"
  };

  return (
    <div className="welcome-page2">

      <div className="navbar2">
        <div className="logo"></div>

        <div className="nav-links2">

          <span onClick={() => setPage("welcome")}>
            {lang === "en" ? "Welcome" : "الرئيسية"}
          </span>

          <span onClick={() => setPage("jobs")}>
            {lang === "en" ? "Jobs" : "الوظائف"}
          </span>

          <span onClick={changeLang} style={{ color: "orange" }}>
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

        {loading ? (
          <h3>Loading...</h3>
        ) : results.length === 0 ? (
          <h3>
            {lang === "en"
              ? "No results found"
              : "لا توجد نتائج"}
          </h3>
        ) : (
          results.map((item, index) => (
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

              <h3>{item.email || "Unknown user"}</h3>

              <p>
                <strong>
                  {lang === "en" ? "Best Field:" : "أفضل تخصص:"}
                </strong>{" "}
                {fieldNames[item.bestField] || item.bestField}
              </p>

              {item.percentages &&
                Object.entries(item.percentages).map(([key, value]) => (
                  <p key={key}>
                    {fieldNames[key] || key}: {value}%
                  </p>
                ))}
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default AllResults;