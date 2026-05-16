import React, { useState, useEffect } from "react";

function Feedback({ setPage, lang = "en", changeLang }) {

  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.email === "A@gmail.com";

  const texts = {
    en: {
      title: "Feedback",
      subtitle: "We would love to hear your thoughts",
      placeholder: "Write your feedback here...",
      hint: "Share your honest opinion 💡",
      submit: "Submit Feedback",
      adminTitle: "Users Feedback",
      noFeedback: "No feedback yet"
    },
    ar: {
      title: "التعليقات",
      subtitle: "نود سماع رأيك",
      placeholder: "اكتب تعليقك هنا...",
      hint: "شارك رأيك بصراحة 💡",
      submit: "إرسال",
      adminTitle: "تعليقات المستخدمين",
      noFeedback: "لا توجد تعليقات"
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:3001/feedback");
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchFeedbacks();
    }
  }, []);

  const handleSubmit = async () => {
    if (!message) return alert(lang === "en"
      ? "Please write feedback"
      : "الرجاء كتابة تعليق"
    );

    try {
      const res = await fetch("http://localhost:3001/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          email: user?.email || "anonymous",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(lang === "en"
          ? "Feedback sent successfully ✅"
          : "تم إرسال التعليق بنجاح ✅"
        );
        setMessage("");
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="welcome-page2">

      {/* Navbar */}
      <div className="navbar2">
        <div className="logo">IT Guide</div>

        <div className="nav-links2">

          <span onClick={() => setPage("welcome")}>
            {lang === "en" ? "Welcome" : "الرئيسية"}
          </span>

          <span onClick={() => setPage("info")}>
            {lang === "en" ? "Info" : "معلومات"}
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

      <div className="feedback-center">

        {/* ================= USER ================= */}
        {!isAdmin && (
          <div className="feedback-card">

            <h2>{texts[lang].title}</h2>

            <p className="subtitle">{texts[lang].subtitle}</p>

            <textarea
              placeholder={texts[lang].placeholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="form-bottom">

              <p className="hint">{texts[lang].hint}</p>

              <button className="login-btn" onClick={handleSubmit}>
                {texts[lang].submit}
              </button>

            </div>

          </div>
        )}

        {/* ================= ADMIN ================= */}
        {isAdmin && (
          <div className="feedback-card">

            <h2>{texts[lang].adminTitle}</h2>
            <p className="subtitle">{texts[lang].adminSubtitle}</p>

            {feedbacks.length === 0 ? (
              <p>{texts[lang].noFeedback}</p>
            ) : (
              <div className="feedback-grid">
                {feedbacks.map((fb) => (
                  <div key={fb._id} className="feedback-item">

                    <p className="fb-message">{fb.message}</p>

                    <div className="fb-footer">
                      <span>{fb.email}</span>
                      <small>
                        {new Date(fb.createdAt).toLocaleString()}
                      </small>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Feedback;