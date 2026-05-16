import React, { useState } from "react";

function Login({ setPage, lang = "en", changeLang }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const texts = {
    en: {
      title: "Log In",
      subtitle: "Enter your credentials to continue",
      email: "Email",
      password: "Password",
      login: "Log In",
      noAccount: "Don't have an account?",
      create: "Create one",
      feedbackAlert: "⚠️ You must login first to access Feedback"
    },
    ar: {
      title: "تسجيل الدخول",
      subtitle: "أدخل بياناتك للمتابعة",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      login: "تسجيل الدخول",
      noAccount: "ليس لديك حساب؟",
      create: "إنشاء حساب",
      feedbackAlert: "⚠️ يجب تسجيل الدخول أولاً للوصول إلى التعليقات"
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert(lang === "en"
        ? "Please enter email and password"
        : "الرجاء إدخال البريد وكلمة المرور"
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        alert(data.msg || (lang === "en" ? "Login successful" : "تم تسجيل الدخول بنجاح"));
        localStorage.setItem("user", JSON.stringify(data.user));
        setPage("welcome");
      } else {
        alert(data.msg || `Server returned status ${response.status}`);
      }

    } catch (error) {
      console.error("Fetch error:", error);
      alert(lang === "en"
        ? "Error connecting to server"
        : "خطأ في الاتصال بالسيرفر"
      );
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleFeedbackClick = () => {
    if (user) {
      setPage("feedback");
    } else {
      alert(texts[lang].feedbackAlert);
      setPage("login");
    }
  };

  return (
    <div className="welcome-page2">

      {/* Navbar */}
      <div className="navbar2">
        <div className="logo">Logo</div>

        <div className="nav-links2">

          <span onClick={() => setPage("welcome")}>
            {lang === "en" ? "Welcome" : "الرئيسية"}
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

          {/* 🌍 Language toggle */}
          <span
            onClick={changeLang}
            style={{ cursor: "pointer", color: "orange" }}
          >
            {lang === "en" ? "AR" : "EN"}
          </span>

        </div>
      </div>

      {/* Login Card */}
      <div className="login-container">

        <h2>{texts[lang].title}</h2>

        <p className="login-subtitle">
          {texts[lang].subtitle}
        </p>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>

          <label>{texts[lang].email}</label>
          <input
            type="email"
            placeholder={texts[lang].email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>{texts[lang].password}</label>
          <input
            type="password"
            placeholder={texts[lang].password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="login-btn"
            onClick={handleLogin}
          >
            {texts[lang].login}
          </button>

        </form>

        <p className="signup-text">
          {texts[lang].noAccount}{" "}
          <span onClick={() => setPage("signup")}>
            {texts[lang].create}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;