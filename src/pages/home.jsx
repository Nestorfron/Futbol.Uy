import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.jsx";
import AdSpace from "../components/ad-space.jsx";
import LiveMatchCard from "../components/live-matches.jsx";
import TeamCard from "../components/team-card.jsx";
import MatchCard from "../components/match-card.jsx";

function Home() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getMatches();
    actions.getUpcomingMatches();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Espacio Publicitario Superior */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSpace position="top" />
      </div>

      {/* Partidos en Vivo */}
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-xl font-bold text-center mb-4">Partidos en Vivo</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {store.matches.length > 0 ? (
            store.matches.map((match) => (
              <LiveMatchCard key={match.fixture.id} match={match} />
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              No hay partidos en vivo en este momento.
            </p>
          )}
        </div>
      </div>

      {/* Próximos partidos */}
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-xl font-bold text-center mb-4">Próximos partidos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {store.upcomingMatches.length > 0 ? (
            store.upcomingMatches.map((match, index) => (
              <MatchCard key={index + 1} match={match} teams={match.teams} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              Cargando partidos...
            </p>
          )}
        </div>
      </div> 

      {/* Tabla de Posiciones */}
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-xl font-bold text-center mb-4">Tabla de Posiciones</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {store.standings.length > 0 ? (
            store.standings.map((standing, index) => (
              <StandingCard key={index + 1} standing={standing} rank={index + 1} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              Cargando estadísticas...
            </p>
          )}
        </div>
      </div>

      {/* Espacio Publicitario Inferior */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSpace position="bottom" />
      </div>
    </div>
  );
}

export default Home;
