import React, { useState } from "react";

function Signup({ setPage, lang = "en", changeLang }) {

  const user = JSON.parse(localStorage.getItem("user") || "null"); // ✅ FIX

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const texts = {
    en: {
      title: "Create Your Account",
      subtitle: "Join us and discover the best career path for you",
      name: "Full Name",
      email: "Email",
      password: "Password",
      confirm: "Confirm Password",
      create: "Create Account",
      loginText: "Already have an account?",
      login: "Log in",
      mismatch: "Passwords do not match",
      success: "Registered successfully"
    },
    ar: {
      title: "إنشاء حساب",
      subtitle: "انضم إلينا واكتشف أفضل مسار مهني لك",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirm: "تأكيد كلمة المرور",
      create: "إنشاء الحساب",
      loginText: "لديك حساب بالفعل؟",
      login: "تسجيل الدخول",
      mismatch: "كلمتا المرور غير متطابقتين",
      success: "تم التسجيل بنجاح"
    }
  };

  const handleSignup = async () => {

    if (password !== confirmPassword) {
      alert(texts[lang].mismatch);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        alert(data.msg || texts[lang].success);
        setPage("login");
      } else {
        alert(data.msg || `Server error ${response.status}`);
      }

    } catch (error) {
      console.error(error);
      alert(lang === "en"
        ? "Something went wrong!"
        : "حدث خطأ ما!"
      );
    }
  };

  
  return (
    <div className="welcome-page2">

      {/* NAVBAR */}
      <div className="navbar2">
        <div className="logo"></div>

        <div className="nav-links2">

          <span onClick={() => setPage("welcome")}>
            {lang === "en" ? "Welcome" : "الرئيسية"}
          </span>

          <span onClick={() => setPage("info")}>
            {lang === "en" ? "Info" : "معلومات"}
          </span>

          {/* ✅ FIXED SAFE CHECK */}
          {user?.email && user.email !== "A@gmail.com" && (
            <span onClick={() => setPage("savedResult")}>
              {lang === "en" ? "My Result" : "نتيجتي"}
            </span>
          )}

          <span onClick={() => setPage("jobs")}>
            {lang === "en" ? "Jobs" : "الوظائف"}
          </span>

          {/* LANGUAGE */}
          <span
            onClick={changeLang}
            style={{ cursor: "pointer", color: "orange" }}
          >
            {lang === "en" ? "AR" : "EN"}
          </span>

        </div>
      </div>

      {/* FORM */}
      <div className="signup-container">

        <h2>{texts[lang].title}</h2>

        <p className="signup-subtitle">
          {texts[lang].subtitle}
        </p>

        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>

          <label>{texts[lang].name}</label>
          <input
            type="text"
            placeholder={texts[lang].name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <label>{texts[lang].confirm}</label>
          <input
            type="password"
            placeholder={texts[lang].confirm}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="signup-btn"
            type="button"
            onClick={handleSignup}
          >
            {texts[lang].create}
          </button>

        </form>

        <p className="login-text">
          {texts[lang].loginText}{" "}
          <span onClick={() => setPage("login")}>
            {texts[lang].login}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;