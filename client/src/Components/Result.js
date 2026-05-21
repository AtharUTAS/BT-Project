import React, { useState } from "react";

function Result({ setPage, answers, questions, lang, changeLang }) {

  const [saved, setSaved] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const gradeMap = {
    A: 5, B: 4, C: 3, D: 2, E: 1, F: 0
  };

  const interestScores = {
    software: 0,
    networking: 0,
    cybersecurity: 0,
    ai: 0,
    database: 0
  };

  const gradeScores = {
    software: [],
    networking: [],
    cybersecurity: [],
    ai: [],
    database: []
  };

  answers.forEach((answer, index) => {
    const field = questions[index]?.field;
    if (!field) return;

    const value =
      gradeMap[answer] !== undefined ? gradeMap[answer] : Number(answer || 0);

    switch (field) {
      case "software":
      case "networking":
      case "cybersecurity":
      case "ai":
      case "database":
        interestScores[field] += value;
        break;

      case "programmingGrade":
        gradeScores.software.push(value);
        gradeScores.ai.push(value);
        break;

      case "networkGrade":
        gradeScores.networking.push(value);
        break;

      case "securityGrade":
        gradeScores.cybersecurity.push(value);
        break;

      case "dbGrade":
        gradeScores.database.push(value);
        break;

      default:
        break;
    }
  });

  const avg = (arr) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const avgScores = {
    software: avg(gradeScores.software),
    networking: avg(gradeScores.networking),
    cybersecurity: avg(gradeScores.cybersecurity),
    ai: avg(gradeScores.ai),
    database: avg(gradeScores.database)
  };

  const rawScores = {
    software: interestScores.software * 0.7 + avgScores.software * 0.3,
    networking: interestScores.networking * 0.7 + avgScores.networking * 0.3,
    cybersecurity: interestScores.cybersecurity * 0.7 + avgScores.cybersecurity * 0.3,
    ai: interestScores.ai * 0.7 + avgScores.ai * 0.3,
    database: interestScores.database * 0.7 + avgScores.database * 0.3
  };

  const total = Object.values(rawScores).reduce((a, b) => a + b, 0);

  const finalScores = Object.keys(rawScores).reduce((acc, key) => {
    const percent = total ? (rawScores[key] / total) * 100 : 0;

    // بدون 100%
    acc[key] = Math.min(Math.round(percent * 0.9), 85);

    return acc;
  }, {});

  const bestField = Object.keys(finalScores).reduce((a, b) =>
    finalScores[a] > finalScores[b] ? a : b
  );

  const fieldNames = {
    software: lang === "en" ? "Software Engineering" : "هندسة البرمجيات",
    networking: lang === "en" ? "Networking" : "الشبكات",
    cybersecurity: lang === "en" ? "Cybersecurity" : "الأمن السيبراني",
    ai: lang === "en" ? "AI" : "الذكاء الاصطناعي",
    database: lang === "en" ? "Database" : "قواعد البيانات"
  };

  const top3 = Object.keys(finalScores)
    .map(key => ({
      key,
      name: fieldNames[key],
      percent: finalScores[key]
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 3);

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || saved) return;

    try {
      await fetch("http://localhost:3001/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          bestField,
          percentages: finalScores
        })
      });

      setSaved(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="welcome-page2">

      {/* ================= NAVBAR ================= */}
      <div className="navbar">
        <div className="logo">Logo</div>

        <div className="nav-links">

          <span onClick={() => setPage("welcome")}>
            {lang === "en" ? "Home" : "الرئيسية"}
          </span>

          <span onClick={() => setPage("info")}>
            {lang === "en" ? "Info" : "معلومات"}
          </span>

          <span onClick={() => setPage("feedback")}>
            {lang === "en" ? "Feedback" : "التعليقات"}
          </span>

          {user && user.email !== "A@gmail.com" && (
            <span onClick={() => setPage("savedResult")}>
              {lang === "en" ? "My Result" : "نتيجتي"}
            </span>
          )}

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
          {lang === "en" ? "Your Result" : "نتيجتك"}
        </h2>

        <h1 style={{ color: "orange" }}>
          {fieldNames[bestField]}
        </h1>

        {/* TOP 3 */}
        <div style={{ marginTop: "20px" }}>
          {top3.map((item) => (
            <p key={item.key}>
              {item.name}: {item.percent}%
            </p>
          ))}
        </div>

        {/* ================= BUTTONS ================= */}
<div className="buttons">

  <button
    className="blue-btn"
    onClick={handleSave}
    disabled={saved}
  >
    {saved
      ? lang === "en"
        ? "Saved"
        : "تم الحفظ"
      : lang === "en"
      ? "Save Result"
      : "حفظ النتيجة"}
  </button>

  <button
    className="orange-btn"
    onClick={() => setPage("welcome")}
  >
    {lang === "en" ? "Home" : "الرئيسية"}
  </button>

</div>

      </div>
    </div>
  );
}

export default Result;