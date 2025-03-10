import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import TeamLogo from "../components/team-logo.jsx";

const LiveMatchCard = ({ match, incidents }) => {
  const homeTeam = match.sport_event.competitors[0].name;
  const awayTeam = match.sport_event.competitors[1].name;

  const homeScore = match.sport_event_status.home_score;
  const awayScore = match.sport_event_status.away_score;

  const venue = match.sport_event.venue.name;

  const [lastScores, setLastScores] = useState({
    home: homeScore,
    away: awayScore,
  });

  const isOngoing = ["live"].includes(match.sport_event_status.status);

  const [goalScored, setGoalScored] = useState(null);

  useEffect(() => {
    if (homeScore > lastScores.home) {
      setGoalScored("home");
    } else if (awayScore > lastScores.away) {
      setGoalScored("away");
    }
    setTimeout(() => {
      setLastScores({ home: homeScore, away: awayScore });
    }, 500);
  }, [homeScore, awayScore]);

  useEffect(() => {
    if (goalScored) {
      const timer = setTimeout(() => setGoalScored(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [goalScored]);

  const minutesPlayed = match.sport_event_status.clock.played.split(":")[0];

  const firstHalf = match.sport_event_status.match_status === "1st_half";
  const secondHalf = match.sport_event_status.match_status === "2nd_half";

  const matchStatus = firstHalf ? " 1T" : secondHalf ? " 2T" : "";

  // Mapeo de tipos de incidencias a su traducción en español
  const incidentTypes = {
    goal: "Gol",
    yellow_card: "Tarjeta amarilla",
    red_card: "Tarjeta roja",
    substitution: "Sustitución",
    penalty: "Penalti",
    offside: "Fuera de lugar",
    foul: "Falta",
    corner: "Córner",
    free_kick: "Tiro libre",
    goal_kick: "Saque de meta",
    own_goal: "Autogol",
    shot_saved: "Tiro salvado",
    throw_in: "Saque de banda",
    corner_kick: "Tiro de córner",
    injury_time_shown: "Detención por lesión",
    shot_off_target: "Tiro fuera de meta",
    match_started: "Partido iniciado",
    period_start: "Inicio de período",
  };

  // Extraemos las últimas incidencias
  const recentIncidents = incidents.reverse().slice(0, 3);

  return (
    <div className="relative box bg-background/50 rounded-xl p-4 md:w-96  w-full  flex flex-col items-center border-l-4 border-primary-500 backdrop-blur-md">
      {/* Contenedor principal del partido */}
      <div className="w-full flex flex-col items-center border-b-4 border-green-500 pb-4 ">
        {/* Animación de Gol */}
        <AnimatePresence>
          {goalScored && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary bg-opacity-10 rounded-xl"
              >
                <h1 className="text-5xl font-bold text-yellow-400 animate-pulse">
                  ¡GOOOL!
                </h1>
              </motion.div>
              <Confetti
                className="absolute top-0 left-0 w-full h-full"
                numberOfPieces={150}
              />
            </>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center w-full mt-4">
          {/* Equipo Local */}
          <div className="team-info flex flex-col items-center w-1/3 sm:w-1/3">
            <TeamLogo teamId={match.sport_event.competitors[0].id} />
            <span className="font-semibold text-foreground text-center mt-2">
              {homeTeam}
            </span>
          </div>

          {/* Resultado en Vivo */}
          <div className="text-center mt-2 sm:mt-0 sm:mx-4">
            <span
              className={`text-3xl p-2 text-primary-500 ${
                homeScore > awayScore ? "font-bold" : ""
              }`}
            >
              {homeScore}
            </span>
            <span className="text-3xl font-bold text-foreground">-</span>
            <span
              className={`text-3xl p-2 text-primary-500 ${
                awayScore > homeScore ? "font-bold" : ""
              }`}
            >
              {awayScore}
            </span>
          </div>

          {/* Equipo Visitante */}
          <div className="team-info flex flex-col items-center w-1/3 sm:w-1/3">
            <TeamLogo teamId={match.sport_event.competitors[1].id} />
            <span className="font-semibold text-foreground text-center mt-2">
              {awayTeam}
            </span>
          </div>
        </div>

        {/* Estado del partido */}
        <p className="mt-2 text-xs text-white bg-red-500 px-2 py-1 rounded-md animate-pulse">
          {isOngoing &&
            `${
              match.sport_event_status.match_status === "halftime"
                ? "Medio tiempo"
                : "⚽ " + minutesPlayed + "’ -" + matchStatus
            }`}
        </p>

        {/* Estadio del partido */}
        <p className="pt-2 match-venue text-xs text-gray-400 text-center text-bold">
          {isOngoing && `${venue}`}
        </p>
      </div>

      {/* Mostrar las últimas incidencias debajo del card */}
      {recentIncidents.length > 0 && (
        <div className="mt-4 w-full px-4 py-2 bg-background/50 rounded-lg">
          <h2 className="text-xs text-gray-400 text-center">Últimas incidencias</h2>
          {/* Muestra las incidencias en una lista vertical */}
          {recentIncidents.map((incident, index) => (
            <div
              key={index}
              className="m-2 text-xs text-foreground flex items-center gap-2"
            >
              <div className="items-center justify-center w-5 h-5">
                <TeamLogo
                  teamId={
                    incident.competitor === "home"
                      ? match.sport_event.competitors[0].id
                      : match.sport_event.competitors[1].id
                  }
                />
              </div>
              <div>
                <span className="p-2">
                  { incidentTypes[incident.type] || incident.type }
                </span>
                <span className="text-gray-400">{incident.match_clock}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveMatchCard;
