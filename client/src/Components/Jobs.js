import React from "react";

function Jobs({ setPage, lang, changeLang }) {

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.email === "A@gmail.com";

  const texts = {

    en: {

      title: "Career Opportunities in IT",

      welcome: "Welcome",
      feedback: "Feedback",

      software: {
        title: "Software Engineering",
        jobs: [
          "Software Developer",
          "Frontend Developer",
          "Backend Developer",
          "Mobile App Developer",
          "Game Developer",
          "Software Tester",
          "System Analyst"
        ]
      },

      network: {
        title: "Network Computing",
        jobs: [
          "Network Engineer",
          "System Administrator",
          "Cloud Engineer",
          "IT Support Specialist",
          "Network Security Administrator",
          "Infrastructure Engineer"
        ]
      },

      cyber: {
        title: "Cybersecurity",
        jobs: [
          "Cybersecurity Analyst",
          "Penetration Tester",
          "Security Engineer",
          "Digital Forensics Analyst",
          "SOC Analyst",
          "Ethical Hacker"
        ]
      },

      ai: {
        title: "Data Science & AI",
        jobs: [
          "Data Scientist",
          "Machine Learning Engineer",
          "AI Engineer",
          "Business Intelligence Analyst",
          "Data Analyst",
          "Deep Learning Engineer"
        ]
      }

    },

    ar: {

      title: "الوظائف المتاحة في تخصصات تقنية المعلومات",

      welcome: "الرئيسية",
      feedback: "التعليقات",

      software: {
        title: "هندسة البرمجيات",
        jobs: [
          "مطور برمجيات",
          "مطور واجهات أمامية",
          "مطور خلفيات",
          "مطور تطبيقات هاتف",
          "مطور ألعاب",
          "مختبر برمجيات",
          "محلل نظم"
        ]
      },

      network: {
        title: "الشبكات",
        jobs: [
          "مهندس شبكات",
          "مسؤول أنظمة",
          "مهندس سحابة",
          "أخصائي دعم تقني",
          "مسؤول أمن شبكات",
          "مهندس بنية تحتية"
        ]
      },

      cyber: {
        title: "الأمن السيبراني",
        jobs: [
          "محلل أمن سيبراني",
          "مختبر اختراق",
          "مهندس أمن معلومات",
          "محلل أدلة جنائية رقمية",
          "محلل SOC",
          "هاكر أخلاقي"
        ]
      },

      ai: {
        title: "علم البيانات والذكاء الاصطناعي",
        jobs: [
          "عالم بيانات",
          "مهندس تعلم آلة",
          "مهندس ذكاء اصطناعي",
          "محلل ذكاء أعمال",
          "محلل بيانات",
          "مهندس تعلم عميق"
        ]
      }

    }

  };

  return (
    <div className="welcome-page2">

      {/* NAVBAR */}
      <div className="navbar2">

        <div className="logo">Logo</div>

        <div className="nav-links2">

          <span onClick={() => setPage("welcome")}>
            {texts[lang].welcome}
          </span>

          <span onClick={() => setPage("feedback")}>
            {texts[lang].feedback}
          </span>

          {user && user.email !== "A@gmail.com" && (
         <span onClick={() => setPage("savedResult")}>
            {lang === "en" ? "My Result" : "نتيجتي"}
        </span>
          )}

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

      {/* CONTENT */}
      <div
        className="quiz-container"
        style={{
          width: "70%",
          textAlign: lang === "ar" ? "right" : "left"
        }}
      >

        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          {texts[lang].title}
        </h2>

        {/* Software */}
        <div className="option selected">
          <strong>{texts[lang].software.title}</strong>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.25)",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px"
          }}
        >
          <ul>
            {texts[lang].software.jobs.map((job, index) => (
              <li key={index}>{job}</li>
            ))}
          </ul>
        </div>

        {/* Network */}
        <div className="option selected">
          <strong>{texts[lang].network.title}</strong>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.25)",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px"
          }}
        >
          <ul>
            {texts[lang].network.jobs.map((job, index) => (
              <li key={index}>{job}</li>
            ))}
          </ul>
        </div>

        {/* Cyber */}
        <div className="option selected">
          <strong>{texts[lang].cyber.title}</strong>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.25)",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px"
          }}
        >
          <ul>
            {texts[lang].cyber.jobs.map((job, index) => (
              <li key={index}>{job}</li>
            ))}
          </ul>
        </div>

        {/* AI */}
        <div className="option selected">
          <strong>{texts[lang].ai.title}</strong>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.25)",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px"
          }}
        >
          <ul>
            {texts[lang].ai.jobs.map((job, index) => (
              <li key={index}>{job}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Jobs;