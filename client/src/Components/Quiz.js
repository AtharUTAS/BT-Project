import React, { useState } from "react";
import "../App.css";

function Quiz({ setPage, lang, changeLang }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleFeedbackClick = () => {
    if (user) {
      setPage("feedback");
    } else {
      alert(
        lang === "en"
          ? "⚠️ You must login first"
          : "⚠️ يجب تسجيل الدخول أولاً"
      );
      setPage("login");
    }
  };

  const questionsEN = [
    { text: "How interested are you in programming and software development?", field: "software" },
    { text: "How interested are you in computer networks?", field: "networking" },
    { text: "How interested are you in cybersecurity and ethical hacking?", field: "cybersecurity" },
    { text: "How interested are you in artificial intelligence and machine learning?", field: "ai" },
    { text: "How interested are you in databases and information systems?", field: "database" },

    { text: "How interested are you in analyzing and interpreting data?", field: "dataAnalysis" },
    { text: "How interested are you in solving logical problems?", field: "logic" },
    { text: "How interested are you in computer hardware and devices?", field: "hardware" },
    { text: "How interested are you in protecting systems from attacks?", field: "security" },
    { text: "How comfortable are you working in teams?", field: "teamwork" },
    { text: "Rate your communication and presentation skills", field: "communication" },
    { text: "How interested are you in developing mobile applications?", field: "mobile" },
    { text: "How interested are you in web application development?", field: "web" },
    { text: "How interested are you in researching new technologies?", field: "research" },
    { text: "How interested are you in project planning and management?", field: "management" },
    { text: "How interested are you in user interface design (UI/UX)?", field: "uiux" },
    { text: "How interested are you in cloud systems and servers?", field: "cloud" },

    { text: "What was your grade in Mathematics courses?", field: "mathGrade", type: "grade" },
    { text: "What was your grade in Programming courses?", field: "programmingGrade", type: "grade" },
    { text: "What was your grade in Data Structures / Algorithms?", field: "algorithmGrade", type: "grade" },
    { text: "What was your grade in Web Development courses?", field: "webGrade", type: "grade" },
    { text: "What was your grade in Software Design or Projects?", field: "softwareGrade", type: "grade" },
    { text: "What was your grade in Networking courses?", field: "networkGrade", type: "grade" },
    { text: "What was your grade in Operating Systems?", field: "osGrade", type: "grade" },
    { text: "What was your grade in Security-related courses?", field: "securityGrade", type: "grade" },
    { text: "What was your grade in Computer Architecture?", field: "hardwareGrade", type: "grade" },
    { text: "What was your grade in Database courses?", field: "dbGrade", type: "grade" },
    { text: "What was your grade in Systems Analysis courses?", field: "analysisGrade", type: "grade" }
  ];

  const questionsAR = [
    { text: "ما مدى اهتمامك بالبرمجة وتطوير البرمجيات؟", field: "software" },
    { text: "ما مدى اهتمامك بشبكات الحاسوب؟", field: "networking" },
    { text: "ما مدى اهتمامك بالأمن السيبراني؟", field: "cybersecurity" },
    { text: "ما مدى اهتمامك بالذكاء الاصطناعي؟", field: "ai" },
    { text: "ما مدى اهتمامك بقواعد البيانات؟", field: "database" },

    { text: "ما مدى اهتمامك بالبيانات؟", field: "dataAnalysis" },
    { text: "ما مدى اهتمامك بالمنطق؟", field: "logic" },
    { text: "ما مدى اهتمامك بالأجهزة؟", field: "hardware" },
    { text: "ما مدى اهتمامك بالحماية؟", field: "security" },
    { text: "العمل الجماعي؟", field: "teamwork" },
    { text: "التواصل؟", field: "communication" },
    { text: "تطبيقات الجوال؟", field: "mobile" },
    { text: "الويب؟", field: "web" },
    { text: "البحث؟", field: "research" },
    { text: "إدارة المشاريع؟", field: "management" },
    { text: "UI/UX؟", field: "uiux" },
    { text: "السحابة؟", field: "cloud" },

    { text: "الرياضيات؟", field: "mathGrade", type: "grade" },
    { text: "البرمجة؟", field: "programmingGrade", type: "grade" },
    { text: "الخوارزميات؟", field: "algorithmGrade", type: "grade" },
    { text: "الويب؟", field: "webGrade", type: "grade" },
    { text: "تصميم البرمجيات؟", field: "softwareGrade", type: "grade" },
    { text: "الشبكات؟", field: "networkGrade", type: "grade" },
    { text: "أنظمة التشغيل؟", field: "osGrade", type: "grade" },
    { text: "الأمن؟", field: "securityGrade", type: "grade" },
    { text: "المعمارية؟", field: "hardwareGrade", type: "grade" },
    { text: "قواعد البيانات؟", field: "dbGrade", type: "grade" },
    { text: "تحليل النظم؟", field: "analysisGrade", type: "grade" }
  ];

  const questions = lang === "en" ? questionsEN : questionsAR;

  const gradeOptions = ["A", "B", "C", "D", "E", "F"];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selected;

    setAnswers(newAnswers);
    setSelected(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setPage({
        name: "result",
        data: newAnswers,
        questions
      });
    }
  };

  return (
    <div className="welcome-page2">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo"></div>

        <div className="nav-links">

          <span onClick={() => setPage("welcome")}>
            {lang === "en" ? "Home" : "الرئيسية"}
          </span>

          <span onClick={() => setPage("info")}>
            {lang === "en" ? "Info" : "معلومات"}
          </span>

          <span onClick={handleFeedbackClick}>
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
            style={{ cursor: "pointer", marginLeft: "10px", marginRight: "100px" }}
          >
            {lang === "en" ? "AR" : "EN"}
          </span>

        </div>
      </div>

      {/* QUIZ */}
      <div className="quiz-container">

        <h2>
          {lang === "en" ? "Question" : "السؤال"} {currentQuestion + 1}
        </h2>

        <p>{questions[currentQuestion].text}</p>

        {/* 🔥 هذا هو التوضيح الذي طلبته */}
        {questions[currentQuestion].type !== "grade" && (
          <p className="scale-info">
            {lang === "en"
              ? "1 = Lowest / Not interested, 5 = Highest / Very interested"
              : "5 =    الأقل/ لست مهتم= 1 ، الأعلى/ مهتم جدا"}
          </p>
        )}

        <div className="quiz-options">
          {(questions[currentQuestion].type === "grade"
            ? gradeOptions
            : [1, 2, 3, 4, 5]
          ).map(opt => (
            <div
              key={opt}
              className={`option ${selected === opt ? "selected" : ""}`}
              onClick={() => setSelected(opt)}
            >
              {opt}
            </div>
          ))}
        </div>

        <div className="buttons">
          <button
            className="blue-btn"
            onClick={handleNext}
            disabled={selected === null}
          >
            {currentQuestion === questions.length - 1
              ? (lang === "en" ? "Finish" : "إنهاء")
              : (lang === "en" ? "Next" : "التالي")}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Quiz;