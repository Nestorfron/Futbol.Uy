import React from "react";

const MatchCard = ({ match, teams }) => {
  const homeScore = match.goals.home;
  const awayScore = match.goals.away;

  // Formatear la fecha del partido
  const matchDate = new Date(match.fixture.date);
  const formattedDate = matchDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = matchDate.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center w-64 border-l-4 border-gray-500">
      <div className="flex justify-between items-center w-full mt-2">
        {/* Equipo Local */}
        <div className="flex flex-col items-center w-1/3">
          <img src={teams.home.logo} alt={teams.home.name} className="w-10 h-10" />
          <span className="text-sm font-medium text-gray-700 text-center">{teams.home.name}</span>
          <span
            className={`text-lg ${
              homeScore > awayScore ? "font-bold text-black" : "text-gray-600"
            }`}
          >
            {homeScore}
          </span>
        </div>

        {/* Marcador en el centro */}
        <span className="text-lg font-bold text-gray-800">-</span>

        {/* Equipo Visitante */}
        <div className="flex flex-col items-center w-1/3">
          <img src={teams.away.logo} alt={teams.away.name} className="w-10 h-10" />
          <span className="text-sm font-medium text-gray-700 text-center">{teams.away.name}</span>
          <span
            className={`text-lg ${
              awayScore > homeScore ? "font-bold text-black" : "text-gray-600"
            }`}
          >
            {awayScore}
          </span>
        </div>
      </div>

      {/* Fecha del partido en formato corto */}
      <p className="text-xs text-gray-500 mt-2">
        {formattedDate} - {formattedTime}
      </p>
    </div>
  );
};

export default MatchCard;
