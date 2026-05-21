import React, { useEffect, useState } from "react";

function SavedResult({ lang, setPage, changeLang }) {

  const [result, setResult] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3001/result/${user.email}`)
      .then(res => res.json())
      .then(data => setResult(data))
      .catch(() => setResult(null));

  }, []);

  const names = {
    software: lang === "en" ? "Software Engineering" : "هندسة البرمجيات",
    networking: lang === "en" ? "Networking" : "الشبكات",
    cybersecurity: lang === "en" ? "Cybersecurity" : "الأمن السيبراني",
    ai: lang === "en" ? "AI" : "الذكاء الاصطناعي",
    database: lang === "en" ? "Database" : "قواعد البيانات"
  };

  const top3 = result?.percentages
    ? Object.entries(result.percentages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
    : [];

  return (
    <div className="welcome-page2">

      {/* ================= NAVBAR2 ================= */}
      <div className="navbar2">

        <div className="logo"></div>

        <div className="nav-links2">

          <span onClick={() => setPage("welcome")}>
            {lang === "en" ? "Home" : "الرئيسية"}
          </span>

          <span onClick={() => setPage("info")}>
            {lang === "en" ? "Info" : "معلومات"}
          </span>

          <span onClick={() => setPage("feedback")}>
            {lang === "en" ? "Feedback" : "التعليقات"}
          </span>
          
          <span onClick={() => setPage("jobs")}>
            {lang === "en" ? "Jobs" : "الوظائف"}
          </span>

          <span
            onClick={changeLang}
            style={{ cursor: "pointer", color: "orange" }}
          >
            {lang === "en" ? "AR" : "EN"}
          </span>

        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="login-container">

        <h2>
          {lang === "en" ? "Saved Result" : "النتيجة المحفوظة"}
        </h2>

        {!result ? (
          <h3>
            {lang === "en"
              ? "No saved result yet"
              : "لا توجد نتيجة محفوظة"}
          </h3>
        ) : (
          <>
            <h1 style={{ color: "orange" }}>
              {names[result.bestField] || result.bestField}
            </h1>

            {/* TOP 3 */}
            <div style={{ marginTop: "20px" }}>
              {top3.map(([key, value]) => (
                <p key={key}>
                  {names[key]}: {value}%
                </p>
              ))}
            </div>
          </>
        )}

        {/* BUTTONS */}
<div className="buttons" style={{ marginTop: "30px" }}>

  <button
    className="blue-btn"
    onClick={() => setPage("welcome")}
  >
    {lang === "en" ? "Home" : "الرئيسية"}
  </button>

  <button
    className="orange-btn"
    onClick={() => setPage("quiz")}
  >
    {lang === "en" ? "Retake Quiz" : "إعادة الاختبار"}
  </button>

</div>

      </div>
    </div>
  );
}

export default SavedResult;