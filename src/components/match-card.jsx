import React from "react";
import TeamLogo from "./team-logo";

function MatchCard({ match }) {


  const homeTeam = match.sport_event.competitors[0];
  const awayTeam = match.sport_event.competitors[1];

  const homeScore = match.sport_event_status?.home_score;
  const awayScore = match.sport_event_status?.away_score;

  const formattedStartTime = new Date(match.sport_event.start_time).toLocaleString();

  return (
    <div className="box bg-background/80 rounded-xl p-4 flex flex-col items-center w-64 h-72 border-l-4 border-primary-500 backdrop-blur-md">
    
    
      <div className="match-info flex justify-between items-center w-full my-4 flex-grow">
        {/* Equipo Local */}
        <div className="team-info flex flex-col items-center w-1/3">
          <TeamLogo teamId={homeTeam.id} />
          <div className="team-name flex items-center justify-center h-14 mb-2">
            <p className="text-sm font-medium text-foreground text-center">
              {homeTeam?.name}
            </p>
          </div>
          <span
            className={`text-xl font-bold ${
              homeScore > awayScore ? "text-primary-500" : "text-gray-400"
            }`}
          >
            {homeScore}
          </span>
        </div>

        {/* Marcador en el centro */}
        <span className="text-lg font-bold text-foreground">-</span>

        {/* Equipo Visitante */}
        <div className="team-info flex flex-col items-center w-1/3">
          <TeamLogo teamId={awayTeam.id} />
          <div className="team-name flex items-center justify-center h-14 mb-2">
            <p className="text-sm font-medium text-foreground text-center">
              {awayTeam?.name}
            </p>
          </div>
          <span
            className={`text-xl font-bold ${
              awayScore > homeScore ? "text-primary-500" : "text-gray-400"
            }`}
          >
            {awayScore}
          </span>
        </div>
      </div>

      {/* Estadio del partido */}
      <div className="match-venue text-xs text-gray-400 text-center text-bold">
        {match.sport_event_status.status != "closed" ? match.sport_event.venue.name : ""}
      </div>

      {/* Fecha de inicio */}
      <div className="match-time text-xs text-gray-500 text-center text-bold">
        {formattedStartTime}
      </div>
    </div>
  );
}

export default MatchCard;
