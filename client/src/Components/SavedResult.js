import React, { useEffect, useState } from "react";

function SavedResult({ lang, changeLang, setPage }) {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3001/result/${user.email}`)
      .then(async (res) => {

        // إذا ما فيه response صالح
        if (!res.ok) return null;

        const text = await res.text();

        // إذا فاضي
        if (!text) return null;

        return JSON.parse(text);
      })
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch(() => {
        setResult(null);
        setLoading(false);
      });

  }, []);

  const fieldNamesEN = {
    software: "Software Engineering",
    networking: "Networking",
    cybersecurity: "Cybersecurity",
    ai: "Artificial Intelligence",
    database: "Database Systems"
  };

  const fieldNamesAR = {
    software: "هندسة البرمجيات",
    networking: "الشبكات",
    cybersecurity: "الأمن السيبراني",
    ai: "الذكاء الاصطناعي",
    database: "قواعد البيانات"
  };

  const fieldNames =
    lang === "en" ? fieldNamesEN : fieldNamesAR;

  return (
    <div className="welcome-page2">

      {/* NAVBAR */}
      <div className="navbar2">
        <div className="logo">Logo</div>

        <div className="nav-links2">
          <span onClick={() => setPage("welcome")}>Welcome</span>
          <span onClick={() => setPage("info")}>Info</span>
          <span onClick={() => setPage("feedback")}>Feedback</span>
          <span onClick={() => setPage("savedResult")}>My Result</span>
          <span onClick={changeLang} style={{ color: "orange" }}>
            {lang === "en" ? "AR" : "EN"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="login-container">

        {loading ? (
          <h3>Loading...</h3>
        ) : !result ? (
          <h3>No saved result yet</h3>
        ) : (
          <>
            <h2>Your Saved Result</h2>

            <h1 style={{ color: "orange" }}>
              {fieldNames[result.bestField]}
            </h1>

            {result.percentages &&
              Object.entries(result.percentages).map(([key, value]) => (
                <p key={key}>
                  {fieldNames[key]}: {value}%
                </p>
              ))
            }
          </>
        )}

      </div>

    </div>
  );
}

export default SavedResult;