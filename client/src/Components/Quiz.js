import React, { useState } from "react";
import "../App.css";

function Quiz({ setPage, lang }) {

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
    { text: "ما مدى اهتمامك بالأمن السيبراني والاختراق الأخلاقي؟", field: "cybersecurity" },
    { text: "ما مدى اهتمامك بالذكاء الاصطناعي وتعلم الآلة؟", field: "ai" },
    { text: "ما مدى اهتمامك بقواعد البيانات ونظم المعلومات؟", field: "database" },

    { text: "ما مدى اهتمامك بتحليل البيانات؟", field: "dataAnalysis" },
    { text: "ما مدى اهتمامك بحل المشكلات المنطقية؟", field: "logic" },
    { text: "ما مدى اهتمامك بالأجهزة ومكونات الحاسوب؟", field: "hardware" },
    { text: "ما مدى اهتمامك بحماية الأنظمة من الهجمات؟", field: "security" },
    { text: "ما مدى ارتياحك للعمل الجماعي؟", field: "teamwork" },
    { text: "قيّم مهاراتك في التواصل والعرض", field: "communication" },
    { text: "ما مدى اهتمامك بتطوير تطبيقات الهاتف؟", field: "mobile" },
    { text: "ما مدى اهتمامك بتطوير تطبيقات الويب؟", field: "web" },
    { text: "ما مدى اهتمامك بالبحث عن التقنيات الجديدة؟", field: "research" },
    { text: "ما مدى اهتمامك بإدارة المشاريع؟", field: "management" },
    { text: "ما مدى اهتمامك بتصميم واجهات المستخدم؟", field: "uiux" },
    { text: "ما مدى اهتمامك بالسحابة والخوادم؟", field: "cloud" },

    { text: "ما كانت درجتك في الرياضيات؟", field: "mathGrade", type: "grade" },
    { text: "ما كانت درجتك في البرمجة؟", field: "programmingGrade", type: "grade" },
    { text: "ما كانت درجتك في الخوارزميات وهياكل البيانات؟", field: "algorithmGrade", type: "grade" },

    { text: "ما كانت درجتك في تطوير الويب؟", field: "webGrade", type: "grade" },
    { text: "ما كانت درجتك في تصميم البرمجيات؟", field: "softwareGrade", type: "grade" },

    { text: "ما كانت درجتك في الشبكات؟", field: "networkGrade", type: "grade" },
    { text: "ما كانت درجتك في نظم التشغيل؟", field: "osGrade", type: "grade" },
    { text: "ما كانت درجتك في الأمن السيبراني؟", field: "securityGrade", type: "grade" },

    { text: "ما كانت درجتك في معمارية الحاسوب؟", field: "hardwareGrade", type: "grade" },
    { text: "ما كانت درجتك في قواعد البيانات؟", field: "dbGrade", type: "grade" },
    { text: "ما كانت درجتك في تحليل النظم؟", field: "analysisGrade", type: "grade" }
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
      

      {/* QUIZ */}
      <div className="quiz-container">

        <h2>
          {lang === "en" ? "Question" : "السؤال"} {currentQuestion + 1}
        </h2>

        <p>{questions[currentQuestion].text}</p>

        <div className="quiz-options">

          {questions[currentQuestion].type === "grade"
            ? gradeOptions.map(opt => (
                <div
                  key={opt}
                  className={`option ${selected === opt ? "selected" : ""}`}
                  onClick={() => setSelected(opt)}
                >
                  {opt}
                </div>
              ))
            : [1, 2, 3, 4, 5].map(opt => (
                <div
                  key={opt}
                  className={`option ${selected === opt ? "selected" : ""}`}
                  onClick={() => setSelected(opt)}
                >
                  {opt}
                </div>
              ))
          }

        </div>

        {/* 🔥 RESTORED BUTTON STRUCTURE (this fixes your design) */}
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