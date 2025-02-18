import React, { useEffect, useContext, useState } from "react";
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
    actions.getStandings();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-2 py-8">
        <div className="mb-8">
          <AdSpace position="top" />
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-8">
            {/* Partidos en Vivo */}
            <div className="max-w-4xl mx-auto p-4">
              <h1 className="text-2xl font-bold text-center mb-4">
                Resultados en Vivo
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
            <div className="max-w-4xl mx-auto p-4 mt-8">
              <h1 className="text-2xl font-bold text-center mb-4">
                Próximos encuentros
              </h1>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
                {store.upcomingMatches.length > 0 ? (
                  store.upcomingMatches.map((match, index) => (
                    <MatchCard key={index} match={match} teams={match.teams} />
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
                Resultados anteriores
              </h1>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
                {store.pastMatches.length > 0 ? (
                  store.pastMatches.map((match, index) => (
                    <MatchCard key={index} match={match} teams={match.teams} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center col-span-full">
                    Cargando partidos...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Barra lateral */}
          <div className="lg:col-span-1 text-xs mt-8 lg:mt-0 space-y-8">

            {/* Equipos de la Temporada */}
            <div className="max-w-lg mx-auto p-8">
              <h1 className="text-2xl font-bold text-center mb-8">
                Equipos de la Temporada
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {store.teams.length > 0 ? (
                  store.teams.map((team, index) => (
                    <TeamCard key={index} team={team.team} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center col-span-full">
                    Cargando equipos...
                  </p>
                )}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="max-w-lg mx-auto mt-8 p-2">
              <h1 className="text-2xl font-bold text-center mb-8">
                Tabla de Posiciones
              </h1>
              {store.standings.length > 0 ? (
                <div className="overflow-x-auto bg-background rounded-lg shadow-xl border-t-4 border-primary-500">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-background/80">
                        <th className="px-6 py-3 text-md">Pos</th>
                        <th className="px-6 py-3 text-md">Equipo</th>
                        <th className="px-6 py-3 text-md">Jugados</th>
                        <th className="px-6 py-3 text-md">Ganados</th>
                        <th className="px-6 py-3 text-md">Empatados</th>
                        <th className="px-6 py-3 text-md">Perdidos</th>
                        <th className="px-6 py-3 text-md">Dif. Goles</th>
                        <th className="px-6 py-3 text-md">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {store.standings.map((standing, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0
                              ? "bg-background/10"
                              : "bg-background/80"
                          } transition-transform`}
                        >
                          <td className="px-6 py-3 border border-gray-700 dark:border-gray-600">
                            {standing.rank}
                          </td>
                          <td className="px-6 py-3 border border-gray-700 dark:border-gray-600 font-medium">
                            <img
                              src={standing.team?.logo}
                              alt="Bandera del equipo"
                              className="w-6 h-6 m-auto"
                            />
                          </td>
                          <td className="px-6 py-3 border border-gray-700 dark:border-gray-600">
                            {standing.home.played + standing.away.played}
                          </td>
                          <td className="px-6 py-3 border border-gray-700 dark:border-gray-600">
                            {standing.home.win + standing.away.win}
                          </td>
                          <td className="px-6 py-3 border border-gray-700 dark:border-gray-600">
                            {standing.home.draw + standing.away.draw}
                          </td>
                          <td className="px-6 py-3 border border-gray-700 dark:border-gray-600">
                            {standing.home.lose + standing.away.lose}
                          </td>
                          <td className="px-6 py-3 border border-gray-700 dark:border-gray-600">
                            {standing.goalsDiff}
                          </td>
                          <td className="px-6 py-3 border border-gray-700 dark:border-gray-600">
                            {standing.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400 text-center">
                  Cargando estadísticas...
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
