import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const LiveMatchCard = ({ match }) => {
  const homeScore = match.goals.home;
  const awayScore = match.goals.away;

  const [lastScores, setLastScores] = useState({
    home: homeScore,
    away: awayScore,
  });

  const [goalScored, setGoalScored] = useState(null);

  useEffect(() => {
    if (homeScore > lastScores.home) {
      setGoalScored("home");
    } else if (awayScore > lastScores.away) {
      setGoalScored("away");
    }

    // Usamos un setTimeout para actualizar después de mostrar la animación
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

  return (
    <div className="relative box bg-background/50 rounded-xl p-4 flex flex-col items-center w-80 border-l-4 border-green-500">
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
            <Confetti className="absolute top-0 left-0 w-full h-full" numberOfPieces={150} />
          </>
        )}
      </AnimatePresence>

      <div className="flex justify-between w-full items-center mt-4">
        {/* Equipo Local */}
        <div className="flex flex-col items-center flex-1">
          <img
            src={match.teams.home.logo}
            alt={match.teams.home.name}
            className="w-12 h-12 mb-1"
          />
          <span className="font-semibold text-foreground text-center">
            {match.teams.home.name}
          </span>
        </div>

        {/* Resultado en Vivo */}
        <div className="text-center min-w-[80px] flex items-center justify-center">
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
        <div className="flex flex-col items-center flex-1">
          <img
            src={match.teams.away.logo}
            alt={match.teams.away.name}
            className="w-12 h-12 mb-1"
          />
          <span className="font-semibold text-foreground text-center">
            {match.teams.away.name}
          </span>
        </div>
      </div>

      {/* Estado del partido con animación */}
      <p className="mt-2 text-xs text-white bg-red-500 px-2 py-1 rounded-md animate-pulse">
        ⚽ {match.fixture.status.short === "1H" ? "1T" : "2T"} -{" "}
        <span className="font-bold">{match.fixture.status.elapsed}’</span>
      </p>
    </div>
  );
};

export default LiveMatchCard;
