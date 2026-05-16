import React from "react";

function Welcome({ setPage, lang, changeLang }) {

  const user = JSON.parse(localStorage.getItem("user"));

const isAdminViewer = user?.email === "A@gmail.com";
  const handleFeedbackClick = () => {
    if (user) {
      setPage("feedback");
    } else {
      alert(lang === "en"
        ? "⚠️ You must login first to access Feedback"
        : "⚠️ يجب تسجيل الدخول أولاً للوصول إلى التعليقات"
      );
      setPage("login");
    }
  };

  const texts = {
    en: {
      welcome: "Welcome",
      info: "Info",
      feedback: "Feedback",
      title: "Choosing IT Specialization",
      subtitle: "Discover the right specialization for you",
      p1: "Explore IT specializations, skills, and career paths to understand each option before taking the recommendation survey.",
      p2: "You can explore freely without signing up. To answer the questionnaire and receive your personalized recommendation, you must create an account or log in.",
      create: "Create Account",
      login: "Log In",
      quiz: "Go to Quiz",
      logout: "Logout"
    },
    ar: {
      welcome: "الرئيسية",
      info: "معلومات",
      feedback: "التعليقات",
      title: "اختيار تخصص تقنية المعلومات",
      subtitle: "اكتشف التخصص المناسب لك",
      p1: "استكشف تخصصات تقنية المعلومات والمهارات والمسارات الوظيفية لفهم كل خيار قبل إجراء الاختبار.",
      p2: "يمكنك التصفح بحرية بدون تسجيل. للحصول على التوصية يجب إنشاء حساب أو تسجيل الدخول.",
      create: "إنشاء حساب",
      login: "تسجيل الدخول",
      quiz: "الذهاب إلى الاختبار",
      logout: "تسجيل الخروج"
    }
  };

  return (
    <div className="welcome-page">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">Logo</div>

        <div className="nav-links">
          <span onClick={() => setPage("info")}>
            {texts[lang].info}
          </span>

          <span onClick={handleFeedbackClick}>
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

          {/* 🌍 زر اللغة (فقط هذا التعديل) */}
          <span
            onClick={changeLang}
            style={{ cursor: "pointer", marginLeft: "10px", marginRight:"100px" }}
          >
            {lang === "en" ? "AR" : "EN"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="page">
        <h1>{texts[lang].title}</h1>
        <h2>{texts[lang].subtitle}</h2>

        <p>{texts[lang].p1}</p>
        <p>{texts[lang].p2}</p>

        <div className="buttons">

  {!user && (
    <>
      <button
        className="orange-btn"
        onClick={() => setPage("signup")}
      >
        {texts[lang].create}
      </button>

      <button
        className="blue-btn"
        onClick={() => setPage("login")}
      >
        {texts[lang].login}
      </button>
    </>
  )}

  {user && !isAdminViewer && (
    <>
      <button
        className="blue-btn"
        onClick={() => setPage("quiz")}
      >
        {texts[lang].quiz}
      </button>

      <button
        className="orange-btn"
        onClick={() => {
          localStorage.removeItem("user");
          setPage("welcome");
          window.location.reload();
        }}
      >
        {texts[lang].logout}
      </button>
    </>
  )}

  {user && isAdminViewer && (
    <>
      <button
        className="blue-btn"
        onClick={() => setPage("allResults")}
      >
        {lang === "en"
          ? "View All Results"
          : "عرض جميع النتائج"}
      </button>

      <button
        className="orange-btn"
        onClick={() => {
          localStorage.removeItem("user");
          setPage("welcome");
          window.location.reload();
        }}
      >
        {texts[lang].logout}
      </button>
    </>
  )}

</div>
      </div>
    </div>
  );
}

export default Welcome;