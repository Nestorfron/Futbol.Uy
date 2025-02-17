import React from "react";

const LiveMatchCard = ({ match }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center w-80 border-l-4 border-green-500">
      <h3 className="text-lg font-bold text-gray-700 mb-2">⚽ {match.league.name}</h3>

      <div className="flex justify-between w-full items-center">
        {/* Equipo Local */}
        <div className="flex flex-col items-center">
          <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-12 h-12 mb-1" />
          <span className="font-semibold text-gray-800">{match.teams.home.name}</span>
        </div>

        {/* Resultado en Vivo */}
        <div className="text-center">
          <span className="text-2xl font-bold text-red-500">{match.goals.home} - {match.goals.away}</span>
          <p className="text-xs text-gray-600">Min {match.fixture.status.elapsed}</p>
        </div>

        {/* Equipo Visitante */}
        <div className="flex flex-col items-center">
          <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-12 h-12 mb-1" />
          <span className="font-semibold text-gray-800">{match.teams.away.name}</span>
        </div>
      </div>

      {/* Estado del partido */}
      <p className="mt-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-md">
        {match.fixture.status.short} - {match.fixture.status.elapsed}’
      </p>
    </div>
  );
};

export default LiveMatchCard;
