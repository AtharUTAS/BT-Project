import React, { useState } from "react";

function Result({ setPage, answers, questions, lang, changeLang }) {
  const [saved, setSaved] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const gradeMap = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0
  };

  const scores = {
    software: { interest: [], grade: [] },
    networking: { interest: [], grade: [] },
    cybersecurity: { interest: [], grade: [] },
    ai: { interest: [], grade: [] },
    database: { interest: [], grade: [] }
  };

  const addInterest = (field, value, weight = 1) => {
    scores[field].interest.push(value * weight);
  };

  const addGrade = (field, value, weight = 1) => {
    scores[field].grade.push(value * weight);
  };

  answers.forEach((answer, index) => {
    const field = questions[index]?.field;
    if (!field) return;

    const value =
      gradeMap[answer] !== undefined ? gradeMap[answer] : Number(answer || 0);

    switch (field) {
      case "software":
        addInterest("software", value, 1);
        break;

      case "networking":
        addInterest("networking", value, 1);
        addInterest("cybersecurity", value, 0.4);
        break;

      case "cybersecurity":
        addInterest("cybersecurity", value, 1);
        addInterest("networking", value, 0.3);
        break;

      case "ai":
        addInterest("ai", value, 1);
        addInterest("software", value, 0.3);
        break;

      case "database":
        addInterest("database", value, 1);
        addInterest("ai", value, 0.4);
        addInterest("software", value, 0.3);
        break;

      case "dataAnalysis":
        addInterest("ai", value, 1);
        addInterest("database", value, 0.8);
        break;

      case "logic":
        addInterest("software", value, 0.8);
        addInterest("ai", value, 0.8);
        addInterest("cybersecurity", value, 0.4);
        break;

      case "hardware":
        addInterest("networking", value, 0.8);
        addInterest("cybersecurity", value, 0.4);
        break;

      case "security":
        addInterest("cybersecurity", value, 1);
        addInterest("networking", value, 0.4);
        break;

      case "teamwork":
        addInterest("database", value, 0.6);
        addInterest("software", value, 0.5);
        break;

      case "communication":
        addInterest("database", value, 0.7);
        addInterest("software", value, 0.4);
        break;

      case "mobile":
        addInterest("software", value, 1);
        break;

      case "web":
        addInterest("software", value, 1);
        addInterest("database", value, 0.5);
        addInterest("cybersecurity", value, 0.3);
        break;

      case "research":
        addInterest("ai", value, 0.8);
        addInterest("cybersecurity", value, 0.5);
        addInterest("software", value, 0.4);
        break;

      case "management":
        addInterest("database", value, 0.8);
        addInterest("software", value, 0.4);
        break;

      case "uiux":
        addInterest("software", value, 0.7);
        addInterest("database", value, 0.7);
        break;

      case "cloud":
        addInterest("networking", value, 0.8);
        addInterest("cybersecurity", value, 0.6);
        addInterest("ai", value, 0.3);
        break;

      case "mathGrade":
        addGrade("ai", value, 1);
        addGrade("software", value, 0.4);
        break;

      case "programmingGrade":
        addGrade("software", value, 1);
        addGrade("ai", value, 0.8);
        addGrade("database", value, 0.4);
        break;

      case "algorithmGrade":
        addGrade("software", value, 0.9);
        addGrade("ai", value, 1);
        break;

      case "webGrade":
        addGrade("software", value, 1);
        addGrade("database", value, 0.6);
        addGrade("cybersecurity", value, 0.3);
        break;

      case "softwareGrade":
        addGrade("software", value, 1);
        addGrade("database", value, 0.5);
        break;

      case "networkGrade":
        addGrade("networking", value, 1);
        addGrade("cybersecurity", value, 0.6);
        break;

      case "osGrade":
        addGrade("networking", value, 0.8);
        addGrade("cybersecurity", value, 0.7);
        addGrade("software", value, 0.4);
        break;

      case "securityGrade":
        addGrade("cybersecurity", value, 1);
        addGrade("networking", value, 0.4);
        break;

      case "hardwareGrade":
        addGrade("networking", value, 1);
        addGrade("cybersecurity", value, 0.3);
        break;

      case "dbGrade":
        addGrade("database", value, 1);
        addGrade("ai", value, 0.5);
        addGrade("software", value, 0.4);
        break;

      case "analysisGrade":
        addGrade("database", value, 1);
        addGrade("software", value, 0.5);
        break;

      default:
        break;
    }
  });

  const avg = (arr) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const rawScores = {};

  Object.keys(scores).forEach((key) => {
    const interestScore = avg(scores[key].interest);
    const gradeScore = avg(scores[key].grade);

    rawScores[key] = interestScore * 0.7 + gradeScore * 0.3;
  });

  const finalScores = Object.keys(rawScores).reduce((acc, key) => {
    acc[key] = Math.round((rawScores[key] / 5) * 100);
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
    database: lang === "en" ? "Database / Information Systems" : "قواعد البيانات / نظم المعلومات"
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

      <div className="login-container">

        <h2>
          {lang === "en" ? "Your Result" : "نتيجتك"}
        </h2>

        <h1 style={{ color: "orange" }}>
          {fieldNames[bestField]}
        </h1>

        <div style={{ marginTop: "20px" }}>
          {top3.map((item) => (
            <p key={item.key}>
              {item.name}: {item.percent}%
            </p>
          ))}
        </div>

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