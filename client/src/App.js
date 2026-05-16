import React, { useState } from "react";

import Welcome from "./Components/Welcome";
import Quiz from "./Components/Quiz";
import Result from "./Components/Result";
import Info from "./Components/info";
import Feedback from "./Components/Feedback";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Processing from "./Components/Processing";
import SavedResult from "./Components/SavedResult";
import AllResults from "./Components/AllResults";
import Jobs from "./Components/Jobs";

function App() {

  const [page, setPage] = useState("welcome");

  // 🌍 اللغة
  const [lang, setLang] = useState(
    localStorage.getItem("lang") || "en"
  );

  // 🔄 تغيير اللغة
  const changeLang = () => {

    const newLang = lang === "en" ? "ar" : "en";

    setLang(newLang);

    localStorage.setItem("lang", newLang);

  };

  return (
    <div>

      {/* WELCOME */}
      {page === "welcome" && (
        <Welcome
          setPage={setPage}
          lang={lang}
          changeLang={changeLang}
        />
      )}

      {/* QUIZ */}
      {page === "quiz" && (
        <Quiz
          setPage={setPage}
          lang={lang}
          changeLang={changeLang}
        />
      )}

      {/* RESULT */}
      {typeof page === "object" && page?.name === "result" && (
        <Result
          setPage={setPage}
          answers={page.data}
          questions={page.questions}
          lang={lang}
          changeLang={changeLang}
        />
      )}

      {/* INFO */}
      {page === "info" && (
        <Info
          setPage={setPage}
          lang={lang}
          changeLang={changeLang}
        />
      )}

      {/* jobs */}
      {page === "jobs" && (
  <Jobs
    setPage={setPage}
    lang={lang}
    changeLang={changeLang}
  />
)}

      {/* FEEDBACK */}
      {page === "feedback" && (
        <Feedback
          setPage={setPage}
          lang={lang}
          changeLang={changeLang}
        />
      )}

      {/* LOGIN */}
      {page === "login" && (
        <Login
          setPage={setPage}
          lang={lang}
          changeLang={changeLang}
        />
      )}

      {/* SIGNUP */}
      {page === "signup" && (
        <Signup
          setPage={setPage}
          lang={lang}
          changeLang={changeLang}
        />
      )}

      {/* PROCESSING */}
      {page === "processing" && (
        <Processing
          setPage={setPage}
          lang={lang}
          changeLang={changeLang}
        />
      )}

      {page === "savedResult" && (
  <SavedResult
    setPage={setPage}
    lang={lang}
    changeLang={changeLang}
  />
)}

{page === "allResults" && (
  <AllResults
    setPage={setPage}
    lang={lang}
    changeLang={changeLang}
  />
)}

    </div>
  );
}

export default App;