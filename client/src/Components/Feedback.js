import React, { useState, useEffect } from "react";

function Feedback({ setPage, lang = "en", changeLang }) {

  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- SAFE USER ----------------
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const isAdmin = user?.email?.toLowerCase() === "a@gmail.com";

  // ---------------- TEXTS ----------------
  const texts = {
    en: {
      title: "Feedback",
      subtitle: "We would love to hear your thoughts",
      placeholder: "Write your feedback here...",
      hint: "Share your honest opinion 💡",
      submit: "Submit Feedback",
      adminTitle: "Users Feedback",
      adminSubtitle: "All submitted feedback from users",
      noFeedback: "No feedback yet"
    },
    ar: {
      title: "التعليقات",
      subtitle: "نود سماع رأيك",
      placeholder: "اكتب تعليقك هنا...",
      hint: "شارك رأيك بصراحة 💡",
      submit: "إرسال",
      adminTitle: "تعليقات المستخدمين",
      adminSubtitle: "جميع تعليقات المستخدمين",
      noFeedback: "لا توجد تعليقات"
    }
  };

  // ---------------- FETCH ----------------
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/feedback");

      if (!res.ok) {
        setFeedbacks([]);
        return;
      }

      const data = await res.json();
      setFeedbacks(Array.isArray(data) ? data : []);

    } catch (err) {
      console.log(err);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchFeedbacks();
    }
  }, [isAdmin]);

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {

    if (!message.trim()) {
      return alert(
        lang === "en"
          ? "Please write feedback"
          : "الرجاء كتابة تعليق"
      );
    }

    try {
      const res = await fetch("http://localhost:3001/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          email: user?.email || "anonymous",
        }),
      });

      if (res.ok) {
        alert(
          lang === "en"
            ? "Feedback sent successfully ✅"
            : "تم إرسال التعليق بنجاح ✅"
        );
        setMessage("");

        // refresh for admin if needed
        if (isAdmin) fetchFeedbacks();
      }

    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- UI ----------------
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

      {/* CONTENT */}
      <div className="feedback-center">

        {/* USER */}
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

        {/* ADMIN */}
        {isAdmin && (
          <div className="feedback-card">

            <h2>{texts[lang].adminTitle}</h2>
            <p className="subtitle">{texts[lang].adminSubtitle}</p>

            {loading ? (
              <p>Loading...</p>
            ) : feedbacks.length === 0 ? (
              <p>{texts[lang].noFeedback}</p>
            ) : (
              <div className="feedback-grid">

                {feedbacks.map((fb) => (
                  <div key={fb._id} className="feedback-item">

                    <p className="fb-message">{fb.message}</p>

                    <div className="fb-footer">
                      <span>{fb.email || "unknown"}</span>
                      <small>
                        {fb.createdAt
                          ? new Date(fb.createdAt).toLocaleString()
                          : ""}
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