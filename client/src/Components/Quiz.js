import React, { useState } from "react";
import "../App.css";

function Quiz({ setPage, lang, changeLang }) {

  // أسئلة الاهتمامات
  const interestQuestionsEN = [
    {
      text: "How interested are you in programming and software development?",
      field: "software"
    },
    {
      text: "How interested are you in computer networks?",
      field: "networking"
    },
    {
      text: "How interested are you in cybersecurity and ethical hacking?",
      field: "cybersecurity"
    },
    {
      text: "How interested are you in artificial intelligence and machine learning?",
      field: "ai"
    },
    {
      text: "How interested are you in databases and information systems?",
      field: "database"
    }
  ];

  const interestQuestionsAR = [
    {
      text: "ما مدى اهتمامك بالبرمجة وتطوير البرمجيات؟",
      field: "software"
    },
    {
      text: "ما مدى اهتمامك بشبكات الحاسوب؟",
      field: "networking"
    },
    {
      text: "ما مدى اهتمامك بالأمن السيبراني والاختراق الأخلاقي؟",
      field: "cybersecurity"
    },
    {
      text: "ما مدى اهتمامك بالذكاء الاصطناعي وتعلم الآلة؟",
      field: "ai"
    },
    {
      text: "ما مدى اهتمامك بقواعد البيانات ونظم المعلومات؟",
      field: "database"
    }
  ];

  // أسئلة الدرجات
  const gradeQuestionsEN = [
    {
      text: "Rate your Mathematics level",
      field: "math"
    },
    {
      text: "Rate your Programming / Computer skills",
      field: "programming"
    },
    {
      text: "Rate your Problem-solving skills",
      field: "problem"
    }
  ];

  const gradeQuestionsAR = [
    {
      text: "قيّم مستواك في الرياضيات",
      field: "math"
    },
    {
      text: "قيّم مستواك في البرمجة والحاسب",
      field: "programming"
    },
    {
      text: "قيّم مهاراتك في حل المشكلات",
      field: "problem"
    }
  ];

  const questions = lang === "en"
    ? [...interestQuestionsEN, ...gradeQuestionsEN]
    : [...interestQuestionsAR, ...gradeQuestionsAR];

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
        questions: questions
      });

    }

  };

  return (
    <div className="welcome-page2">

      {/* NAVBAR */}
      <div className="navbar2">

        <div className="logo">Logo</div>

        <div className="nav-links2">

          <span onClick={() => setPage("welcome")}>
            {lang === "en" ? "Welcome" : "الرئيسية"}
          </span>

          <span onClick={() => setPage("info")}>
            {lang === "en" ? "Info" : "معلومات"}
          </span>

          <span onClick={() => setPage("feedback")}>
            {lang === "en" ? "Feedback" : "التعليقات"}
          </span>

          <span onClick={() => setPage("savedResult")}>
            {lang === "en" ? "My Result" : "نتيجتي"}
          </span>

          <span onClick={() => setPage("jobs")}>
            {lang === "en" ? "Jobs" : "الوظائف"}
          </span>

          <span
            onClick={changeLang}
            style={{
              cursor: "pointer",
              color: "orange"
            }}
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

        <div className="quiz-options">

          {[1, 2, 3, 4, 5].map((opt) => (

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