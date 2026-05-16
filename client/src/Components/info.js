import React, { useState } from "react";

function Info({ setPage, lang, changeLang }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [openSection, setOpenSection] = useState("software");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const texts = {
    en: {
      title: "Explore IT Specializations & Courses",
      intro:
        "This page provides a brief overview of IT specializations. You can explore freely without signing up. To receive your recommendation, you must create an account or log in.",

      software: {
        title: "Software Engineering",
        desc:
          "The Software Engineering specialization focuses on designing, developing, and maintaining software applications. Students learn programming, software architecture, testing, and project management to build reliable systems.",
        skills: [
          "Programming and application development",
          "Software design and architecture",
          "Problem solving and debugging",
          "Web and mobile development",
          "Software testing and quality assurance",
        ],
        courses: [
          "Introduction to Software Engineering",
          "Object-Oriented Programming",
          "Data Structures and Algorithms",
          "Advanced Web Technologies",
          "Mobile Application Development",
          "Software Design and Testing",
        ],
        careers: [
          "Software Developer",
          "Web Developer",
          "Mobile App Developer",
          "Software Tester",
          "System Analyst",
        ],
      },

      network: {
        title: "Network Computing",
        desc:
          "The Network Computing specialization focuses on computer networks, infrastructure, and system administration. Students learn how to design, configure, and manage network environments used in organizations.",
      },

      cyber: {
        title: "Cybersecurity",
        desc:
          "The Cybersecurity specialization focuses on protecting systems, networks, and data from cyber threats. Students learn security fundamentals, risk management, and system protection techniques.",
      },

      ai: {
        title: "Data Science & AI",
        desc:
          "The Data Science & AI specialization focuses on analyzing data, building intelligent systems, and extracting insights. Students learn data analysis, machine learning basics, and decision-making using data.",
      },

      skills: "Key Skills",
      courses: "Example Courses",
      careers: "Career Opportunities",

      create: "Create Account",
      login: "Log In",
      welcome: "Welcome",
      feedback: "Feedback",
    },

    ar: {
      title: "استكشف تخصصات ومواد تقنية المعلومات",
      intro:
        "هذه الصفحة تقدم نظرة عامة على تخصصات تقنية المعلومات. يمكنك التصفح بحرية بدون تسجيل. للحصول على التوصية يجب إنشاء حساب أو تسجيل الدخول.",

      software: {
        title: "هندسة البرمجيات",
        desc:
          "يركز تخصص هندسة البرمجيات على تصميم وتطوير وصيانة تطبيقات البرمجيات. يتعلم الطلاب البرمجة وهندسة الأنظمة والاختبار وإدارة المشاريع لبناء أنظمة موثوقة.",
        skills: [
          "البرمجة وتطوير التطبيقات",
          "تصميم وهندسة البرمجيات",
          "حل المشكلات وتصحيح الأخطاء",
          "تطوير الويب وتطبيقات الهاتف",
          "اختبار البرمجيات وضمان الجودة",
        ],
        courses: [
          "مقدمة في هندسة البرمجيات",
          "البرمجة كائنية التوجه",
          "هياكل البيانات والخوارزميات",
          "تقنيات الويب المتقدمة",
          "تطوير تطبيقات الهاتف",
          "تصميم واختبار البرمجيات",
        ],
        careers: [
          "مطور برمجيات",
          "مطور ويب",
          "مطور تطبيقات هاتف",
          "مختبر برمجيات",
          "محلل نظم",
        ],
      },

      network: {
        title: "الشبكات",
        desc:
          "يركز تخصص الشبكات على شبكات الحاسوب والبنية التحتية وإدارة الأنظمة. يتعلم الطلاب كيفية تصميم وإعداد وإدارة بيئات الشبكات المستخدمة في المؤسسات.",
      },

      cyber: {
        title: "الأمن السيبراني",
        desc:
          "يركز تخصص الأمن السيبراني على حماية الأنظمة والشبكات والبيانات من التهديدات الإلكترونية. يتعلم الطلاب أساسيات الأمن وإدارة المخاطر وتقنيات الحماية.",
      },

      ai: {
        title: "علم البيانات والذكاء الاصطناعي",
        desc:
          "يركز تخصص علم البيانات والذكاء الاصطناعي على تحليل البيانات وبناء الأنظمة الذكية واستخراج المعلومات. يتعلم الطلاب تحليل البيانات وأساسيات تعلم الآلة واتخاذ القرارات باستخدام البيانات.",
      },

      skills: "المهارات الأساسية",
      courses: "المواد الدراسية",
      careers: "فرص العمل",

      create: "إنشاء حساب",
      login: "تسجيل الدخول",
      welcome: "الرئيسية",
      feedback: "التعليقات",
    },
  };

  return (
    <div className="welcome-page2">
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

      <div
        className="quiz-container"
        style={{ width: "70%", textAlign: lang === "ar" ? "right" : "left" }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          {texts[lang].title}
        </h2>

        <p style={{ lineHeight: "1.7", marginBottom: "25px" }}>
          {texts[lang].intro}
        </p>

        {/* Software Engineering */}
        <div
          className={`option ${openSection === "software" ? "selected" : ""}`}
          onClick={() => toggleSection("software")}
        >
          <strong>{texts[lang].software.title}</strong>
        </div>

        {openSection === "software" && (
          <div
            style={{
              background: "rgba(255,255,255,0.25)",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              lineHeight: "1.7",
            }}
          >
            <p>{texts[lang].software.desc}</p>

            <h4>{texts[lang].skills}</h4>
            <ul>
              {texts[lang].software.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h4>{texts[lang].courses}</h4>
            <ul>
              {texts[lang].software.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>

            <h4>{texts[lang].careers}</h4>
            <ul>
              {texts[lang].software.careers.map((career, index) => (
                <li key={index}>{career}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Network */}
        <div
          className={`option ${openSection === "network" ? "selected" : ""}`}
          onClick={() => toggleSection("network")}
        >
          <strong>{texts[lang].network.title}</strong>
        </div>

        {openSection === "network" && (
          <div
            style={{
              background: "rgba(255,255,255,0.25)",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              lineHeight: "1.7",
            }}
          >
            <p>{texts[lang].network.desc}</p>
          </div>
        )}

        {/* Cybersecurity */}
        <div
          className={`option ${openSection === "cyber" ? "selected" : ""}`}
          onClick={() => toggleSection("cyber")}
        >
          <strong>{texts[lang].cyber.title}</strong>
        </div>

        {openSection === "cyber" && (
          <div
            style={{
              background: "rgba(255,255,255,0.25)",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              lineHeight: "1.7",
            }}
          >
            <p>{texts[lang].cyber.desc}</p>
          </div>
        )}

        {/* AI */}
        <div
          className={`option ${openSection === "data" ? "selected" : ""}`}
          onClick={() => toggleSection("data")}
        >
          <strong>{texts[lang].ai.title}</strong>
        </div>

        {openSection === "data" && (
          <div
            style={{
              background: "rgba(255,255,255,0.25)",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              lineHeight: "1.7",
            }}
          >
            <p>{texts[lang].ai.desc}</p>
          </div>
        )}

        <div
          className="buttons"
          style={{ marginTop: "20px", justifyContent: "center" }}
        >
          <button className="orange-btn" onClick={() => setPage("signup")}>
            {texts[lang].create}
          </button>

          <button className="blue-btn" onClick={() => setPage("login")}>
            {texts[lang].login}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Info;