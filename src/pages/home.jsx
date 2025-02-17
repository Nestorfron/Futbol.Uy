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
    actions.getPastMatches();
    actions.getTeams();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-football-green via-football-blue to-football-red">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <AdSpace position="top" />
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 lg:space-y-0">

            {/* Partidos en Vivo */}
            <div className="max-w-4xl mx-auto p-4">
              <h1 className="text-2xl font-bold text-center mb-4">
                Partidos en Vivo
              </h1>
              <div className="flex flex-wrap gap-6 justify-center">
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
              <h1 className="text-2xl font-bold text-center mb-4">
                Próximos partidos
              </h1>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
                {store.upcomingMatches.length > 0 ? (
                  store.upcomingMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      teams={match.teams}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center col-span-full">
                    Cargando partidos...
                  </p>
                )}
              </div>
            </div>

            {/* Partidos Finalizados */}
            <div className="max-w-4xl mx-auto p-4">
              <h1 className="text-2xl font-bold text-center mb-4">
                Resultados
              </h1>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
                {store.pastMatches.length > 0 ? (
                  store.pastMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      teams={match.teams}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center col-span-full">
                    Cargando partidos...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Equipos de la Temporada */}
          <div className="max-w-md mx-auto p-8 mt-8 lg:mt-0">
            <h1 className="text-2xl font-bold text-center mb-4">
              Equipos de la Temporada
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {store.teams.length > 0 ? (
                store.teams.map((team) => (
                  <TeamCard key={team.id} team={team.team} />
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                  Cargando equipos...
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <AdSpace position="bottom" />
        </div>
      </main>
    </div>
  );
}

export default Home;
