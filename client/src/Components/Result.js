import React from "react";

function Result({ setPage, answers, questions, lang, changeLang }) {

  const grades = {
    software: 4,
    networking: 3,
    cybersecurity: 5,
    ai: 4,
    database: 3
  };

  const calculateInterest = (answers, questions) => {

    let scores = {
      software: 0,
      networking: 0,
      cybersecurity: 0,
      ai: 0,
      database: 0
    };

    answers.forEach((answer, index) => {

      const field = questions[index].field;

      if (scores[field] !== undefined) {
        scores[field] += Number(answer || 0);
      }

    });

    return scores;
  };

  const combineScores = (interest, grades) => {

    let finalScores = {};

    for (let field in interest) {
      finalScores[field] =
        (interest[field] * 0.8) +
        (grades[field] * 0.2);
    }

    return finalScores;
  };

  const getBestField = (scores) => {
    let bestField = "";
    let max = -1;

    for (let f in scores) {
      if (scores[f] > max) {
        max = scores[f];
        bestField = f;
      }
    }

    return bestField;
  };

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

  const texts = {
    en: {
      title: "Your Ideal Major",
      desc: "Based on your interests and academic performance",
      retake: "Retake Quiz",
      save: "Save Result",
      info: "This field is the most suitable for you",
      top: "Top Recommended Majors"
    },
    ar: {
      title: "التخصص المناسب لك",
      desc: "بناءً على اهتماماتك وأدائك الأكاديمي",
      retake: "إعادة الاختبار",
      save: "حفظ النتيجة",
      info: "هذا التخصص هو الأنسب لك",
      top: "أفضل التخصصات المقترحة"
    }
  };

  const interest = calculateInterest(answers, questions);
  const finalScores = combineScores(interest, grades);
  const bestField = getBestField(finalScores);

  const fieldNames =
    lang === "en" ? fieldNamesEN : fieldNamesAR;

  const resultsData = Object.keys(finalScores)
    .map((field) => ({
      field,
      name: fieldNames[field],
      percentage: Math.round((finalScores[field] / 15) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const percentages = {};
    resultsData.forEach(item => {
      percentages[item.field] = item.percentage;
    });

    await fetch("http://localhost:3001/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  name: user.name,
  email: user.email,
  bestField,
  percentages
})
    });

    alert("Saved!");
  };

  return (
    <div className="welcome-page2">

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

      <div className="login-container">

        <h2>{texts[lang].title}</h2>

        <h1 style={{ color: "orange" }}>
          {fieldNames[bestField]}
        </h1>

        <p>{texts[lang].desc}</p>

        <p style={{ fontWeight: "bold" }}>
          {texts[lang].info}
        </p>

        <div style={{ marginTop: "20px" }}>
          <h3>{texts[lang].top}</h3>

          {resultsData.map((item, i) => (
            <div key={i}>
              {item.name}: {item.percentage}%
            </div>
          ))}
        </div>

        {/* 🔥 الأزرار القديمة كما كانت */}
        <div className="buttons">

          <button
            className="blue-btn"
            onClick={() => setPage("quiz")}
          >
            {texts[lang].retake}
          </button>

          <button
            className="orange-btn"
            onClick={handleSave}
          >
            {texts[lang].save}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Result;