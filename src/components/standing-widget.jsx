import React, { useEffect } from "react";

const StandingsWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.api-sports.io/2.0.3/widgets.js";
    script.async = true;
    script.type = "module";

    script.onload = () => {
      if (window.Widgets) {
        window.Widgets.Standings.init();
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <div
        id="wg-api-football-standings"
        data-host="v3.football.api-sports.io"
        data-key={import.meta.env.VITE_API_KEY}
        data-league="7032"
        data-season="2025"
        data-show-logos="true"
        className="wg_loader"
      ></div>
    </div>
  );
};

export default StandingsWidget;
