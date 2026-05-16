import React, { useEffect } from "react";

function Processing({ setPage }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage("result");
    }, 2000);

    return () => clearTimeout(timer);
  }, [setPage]);

  return (
    <div className="welcome-page2">
      <div className="processing-container">
        <h2>Analyzing your answers...</h2>
        <p>We're determining the best major for you...</p>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Processing;