import React from "react";

const loading = () => {
  return (
    <div className="min-h-[65vh] flex items-center justify-center">
      <div className="typewriter">
        <div className="slide">
          <i></i>
        </div>
        <div className="paper"></div>
        <div className="keyboard"></div>
      </div>
    </div>
  );
};

export default loading;
