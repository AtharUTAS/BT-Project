import React, { useState } from "react";

function Info({ setPage, lang, changeLang }) {

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [openSection, setOpenSection] = useState(null);

  const userExists = user && user.email !== "A@gmail.com";

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const texts = {

    en: {

      title: "Explore IT Specializations",

      intro:
        "This page provides information about the IT specializations available in the recommendation system. Each specialization includes an overview, key learning areas, and career opportunities to help students understand the best path for their interests and future goals.",

      welcome: "Welcome",
      feedback: "Feedback",
      myResult: "My Result",
      jobs: "Jobs",

      create: "Create Account",
      login: "Log In",

      sections: [

        {
          id: "software",

          title: "Software Engineering",

          description:
            "This specialization focuses on designing, developing, testing, and maintaining software systems and applications. Students learn programming, software architecture, project management, and quality assurance to create reliable and high-quality software solutions.",

          skills: [
            "Programming and Coding",
            "Software Development",
            "Software Design and Architecture",
            "Web and Mobile Applications",
            "Software Testing",
            "Project Management",
            "UI/UX Basics",
            "Professional Ethics"
          ],

          careers: [
            "Software Engineer",
            "Frontend Developer",
            "Backend Developer",
            "Java Developer",
            "Mobile Applications Developer",
            "Oracle Developer",
            "Python Developer",
            "Software Architect",
            "Embedded Software Engineer"
          ]
        },

        {
          id: "network",

          title: "Network Computing",

          description:
            "This specialization prepares students to design, implement, and manage computer networks and infrastructure. It combines networking technologies, cloud computing, and network administration to build reliable communication systems.",

          skills: [
            "Network Fundamentals",
            "Cloud Computing",
            "Network Administration",
            "Wireless Networks",
            "Network Protocols",
            "Infrastructure Design",
            "Network Services",
            "System Configuration"
          ],

          careers: [
            "Network Engineer",
            "Network Administrator",
            "Cloud Engineer",
            "Infrastructure Engineer",
            "Network Specialist",
            "Network Design Officer",
            "IT Support Specialist",
            "Network Optimization Specialist"
          ]
        },

        {
          id: "cyber",

          title: "Cybersecurity & Information Security",

          description:
            "This specialization focuses on protecting digital systems, networks, and information from cyber threats and attacks. Students learn ethical hacking, cryptography, digital forensics, and security analysis to secure modern systems.",

          skills: [
            "Cybersecurity Fundamentals",
            "Ethical Hacking",
            "Penetration Testing",
            "Cryptography",
            "Digital Forensics",
            "Threat Analysis",
            "Security Architecture",
            "Network Security"
          ],

          careers: [
            "Cybersecurity Analyst",
            "Security Engineer",
            "Ethical Hacker",
            "SOC Analyst",
            "Cybersecurity Consultant",
            "Digital Forensics Analyst",
            "Threat Intelligence Specialist",
            "Cybersecurity Architect"
          ]
        },

        {
          id: "ai",

          title: "Data Science & Artificial Intelligence",

          description:
            "This specialization equips students with the skills required to analyze large datasets, build AI models, and develop intelligent systems. It combines machine learning, data analytics, and big data technologies for real-world problem solving.",

          skills: [
            "Machine Learning",
            "Data Analysis",
            "Artificial Intelligence",
            "Big Data Technologies",
            "Data Visualization",
            "Pattern Recognition",
            "Business Intelligence",
            "Data Ethics"
          ],

          careers: [
            "Data Scientist",
            "AI Engineer",
            "Machine Learning Engineer",
            "Data Analyst",
            "Business Intelligence Analyst",
            "Deep Learning Engineer",
            "Data Analytics Developer",
            "Data Engineer"
          ]
        },

        {
          id: "database",

          title: "Database Systems & Data Management",

          description:
            "This specialization focuses on organizing, storing, managing, and securing data within organizations. Students learn database systems, SQL, data infrastructure, and information management techniques.",

          skills: [
            "Database Design",
            "SQL",
            "Data Storage",
            "Database Administration",
            "Data Warehousing",
            "Information Management",
            "Data Security",
            "Data Infrastructure"
          ],

          careers: [
            "Database Administrator",
            "Data Engineer",
            "Database Architect",
            "Data Warehouse Developer",
            "SQL Developer",
            "Information Systems Specialist",
            "Data Management Specialist",
            "Database Analyst"
          ]
        }

      ]
    },

    ar: {

      title: "استكشف تخصصات تقنية المعلومات",

      intro:
        "تعرض هذه الصفحة معلومات حول تخصصات تقنية المعلومات المستخدمة في نظام التوصية. يحتوي كل تخصص على نبذة تعريفية ومهارات أساسية وفرص عمل لمساعدة الطلبة في اختيار المسار المناسب لاهتماماتهم ومستقبلهم المهني.",

      welcome: "الرئيسية",
      feedback: "التعليقات",
      myResult: "نتيجتي",
      jobs: "الوظائف",

      create: "إنشاء حساب",
      login: "تسجيل الدخول",

      sections: [

        {
          id: "software",

          title: "هندسة البرمجيات",

          description:
            "يركز هذا التخصص على تصميم وتطوير واختبار وصيانة الأنظمة البرمجية والتطبيقات. يتعلم الطلبة البرمجة وهندسة البرمجيات وإدارة المشاريع وضمان الجودة لإنشاء برمجيات موثوقة وعالية الجودة.",

          skills: [
            "البرمجة",
            "تطوير البرمجيات",
            "تصميم البرمجيات",
            "تطبيقات الويب والموبايل",
            "اختبار البرمجيات",
            "إدارة المشاريع",
            "أساسيات واجهات المستخدم",
            "الأخلاقيات المهنية"
          ],

          careers: [
            "مهندس برمجيات",
            "مطور واجهات أمامية",
            "مطور خلفيات",
            "مطور جافا",
            "مطور تطبيقات هاتف",
            "مطور أوراكل",
            "مطور بايثون",
            "مهندس برمجيات مدمجة"
          ]
        },

        {
          id: "network",

          title: "حوسبة الشبكات",

          description:
            "يركز هذا التخصص على تصميم وتنفيذ وإدارة شبكات الحاسوب والبنية التحتية. يجمع بين تقنيات الشبكات والحوسبة السحابية وإدارة الأنظمة لبناء شبكات اتصال فعالة.",

          skills: [
            "أساسيات الشبكات",
            "الحوسبة السحابية",
            "إدارة الشبكات",
            "الشبكات اللاسلكية",
            "بروتوكولات الشبكات",
            "تصميم البنية التحتية",
            "خدمات الشبكات",
            "إعداد الأنظمة"
          ],

          careers: [
            "مهندس شبكات",
            "مسؤول شبكات",
            "مهندس سحابة",
            "مهندس بنية تحتية",
            "أخصائي شبكات",
            "مسؤول تصميم الشبكات",
            "أخصائي دعم تقني",
            "أخصائي تحسين الشبكات"
          ]
        },

        {
          id: "cyber",

          title: "الأمن السيبراني وأمن المعلومات",

          description:
            "يركز هذا التخصص على حماية الأنظمة والشبكات والمعلومات الرقمية من التهديدات والهجمات الإلكترونية. يتعلم الطلبة الاختراق الأخلاقي والتشفير والتحليل الجنائي الرقمي وتحليل التهديدات الأمنية.",

          skills: [
            "أساسيات الأمن السيبراني",
            "الاختراق الأخلاقي",
            "اختبار الاختراق",
            "التشفير",
            "التحليل الجنائي الرقمي",
            "تحليل التهديدات",
            "البنية الأمنية",
            "أمن الشبكات"
          ],

          careers: [
            "محلل أمن سيبراني",
            "مهندس أمن معلومات",
            "هاكر أخلاقي",
            "محلل SOC",
            "استشاري أمن سيبراني",
            "محلل أدلة جنائية رقمية",
            "أخصائي استخبارات التهديدات",
            "مهندس أمن سيبراني"
          ]
        },

        {
          id: "ai",

          title: "علم البيانات والذكاء الاصطناعي",

          description:
            "يزود هذا التخصص الطلبة بالمهارات اللازمة لتحليل البيانات الضخمة وبناء نماذج الذكاء الاصطناعي وتطوير الأنظمة الذكية باستخدام تقنيات تعلم الآلة وتحليل البيانات.",

          skills: [
            "تعلم الآلة",
            "تحليل البيانات",
            "الذكاء الاصطناعي",
            "تقنيات البيانات الضخمة",
            "عرض البيانات",
            "التعرف على الأنماط",
            "ذكاء الأعمال",
            "أخلاقيات البيانات"
          ],

          careers: [
            "عالم بيانات",
            "مهندس ذكاء اصطناعي",
            "مهندس تعلم آلة",
            "محلل بيانات",
            "محلل ذكاء أعمال",
            "مهندس تعلم عميق",
            "مطور تحليلات البيانات",
            "مهندس بيانات"
          ]
        },

        {
          id: "database",

          title: "أنظمة قواعد البيانات وإدارة البيانات",

          description:
            "يركز هذا التخصص على تنظيم وتخزين وإدارة وتأمين البيانات داخل المؤسسات. يتعلم الطلبة قواعد البيانات وSQL والبنية التحتية للبيانات وتقنيات إدارة المعلومات.",

          skills: [
            "تصميم قواعد البيانات",
            "SQL",
            "تخزين البيانات",
            "إدارة قواعد البيانات",
            "مستودعات البيانات",
            "إدارة المعلومات",
            "أمن البيانات",
            "البنية التحتية للبيانات"
          ],

          careers: [
            "مسؤول قواعد بيانات",
            "مهندس بيانات",
            "مهندس قواعد بيانات",
            "مطور مستودعات بيانات",
            "مطور SQL",
            "أخصائي نظم معلومات",
            "أخصائي إدارة بيانات",
            "محلل قواعد بيانات"
          ]
        }

      ]
    }
  };

  return (

    <div className="welcome-page2">

      {/* NAVBAR */}
      <div className="navbar2">

        <div className="logo"></div>

        <div className="nav-links2">

          <span onClick={() => setPage("welcome")}>
            {texts[lang].welcome}
          </span>

          <span onClick={() => setPage("feedback")}>
            {texts[lang].feedback}
          </span>

          {userExists && (
            <span onClick={() => setPage("savedResult")}>
              {texts[lang].myResult}
            </span>
          )}
          
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

      {/* CONTENT */}
      <div
        className="info-container"
        style={{
          width: "75%",
          margin: "auto",
          textAlign: lang === "ar" ? "right" : "left"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          {texts[lang].title}
        </h1>

        <p
          style={{
            lineHeight: "1.9",
            marginBottom: "35px",
            textAlign: "center"
          }}
        >
          {texts[lang].intro}
        </p>

        {/* SPECIALIZATION SECTIONS */}
        {texts[lang].sections.map((section) => (

          <div
            key={section.id}
            style={{
              marginBottom: "25px"
            }}
          >

            {/* HEADER */}
            <div
              className={`option ${openSection === section.id ? "selected" : ""}`}
              onClick={() => toggleSection(section.id)}
              style={{
                cursor: "pointer",
                borderRadius: "16px",
                padding: "18px"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >

                <strong style={{ fontSize: "20px" }}>
                  {section.title}
                </strong>

                <span style={{ fontSize: "22px" }}>
                  {openSection === section.id ? "−" : "+"}
                </span>

              </div>
            </div>

            {/* CONTENT */}
            {openSection === section.id && (

              <div
style={{
  background: "rgba(255,255,255,0.7)",
  padding: "25px",
  borderRadius: "18px",
  marginTop: "12px",
  lineHeight: "1.9",
  backdropFilter: "blur(6px)"
}}
              >

                {/* DESCRIPTION */}
                <h3>
                  {lang === "en" ? "Overview" : "نبذة"}
                </h3>

                <p>{section.description}</p>

                {/* SKILLS */}
                <h3 style={{ marginTop: "20px" }}>
                  {lang === "en" ? "Key Skills" : "المهارات الأساسية"}
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "12px"
                  }}
                >

                  {section.skills.map((skill, index) => (

                    <div
                      key={index}
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        padding: "10px 16px",
                        borderRadius: "30px",
                        fontSize: "14px"
                      }}
                    >
                      {skill}
                    </div>

                  ))}

                </div>

                {/* CAREERS */}
                <h3 style={{ marginTop: "25px" }}>
                  {lang === "en" ? "Career Opportunities" : "فرص العمل"}
                </h3>

                <ul style={{ marginTop: "10px" }}>

                  {section.careers.map((career, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "8px"
                      }}
                    >
                      {career}
                    </li>
                  ))}

                </ul>

              </div>

            )}

          </div>

        ))}

        {/* BUTTONS */}
        <div
          className="buttons"
          style={{
            justifyContent: "center",
            marginTop: "40px",
            gap: "18px"
          }}
        >

          <button
            className="orange-btn"
            onClick={() => setPage("signup")}
            style={{
              borderRadius: "14px",
              padding: "12px 28px"
            }}
          >
            {texts[lang].create}
          </button>

          <button
            className="blue-btn"
            onClick={() => setPage("login")}
            style={{
              borderRadius: "14px",
              padding: "12px 28px"
            }}
          >
            {texts[lang].login}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Info;