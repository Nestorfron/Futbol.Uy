import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.jsx";
import { Spinner } from "@heroui/react";
import StandingsWidget from "../components/standing-widget.jsx";
import AdSpace from "../components/ad-space.jsx";
import LiveMatchCard from "../components/live-matches.jsx";
import TeamCard from "../components/team-card.jsx";
import MatchCard from "../components/match-card.jsx";

function Home() {
  const { store, actions } = useContext(Context);

  const logos = {
    "sr:competitor:3229": "https://media.api-sports.io/football/teams/2350.png",
    "sr:competitor:3235": "https://media.api-sports.io/football/teams/2355.png",
    "sr:competitor:25009": "https://media.api-sports.io/football/teams/2369.png",
    "sr:competitor:6879": "https://media.api-sports.io/football/teams/2358.png",
    "sr:competitor:3230": "https://media.api-sports.io/football/teams/2356.png",
    "sr:competitor:174972": "https://media.api-sports.io/football/teams/2365.png",
    "sr:competitor:3227": "https://media.api-sports.io/football/teams/2348.png",
    "sr:competitor:3224": "https://media.api-sports.io/football/teams/2353.png",
    "sr:competitor:25010": "https://media.api-sports.io/football/teams/2359.png",
    "sr:competitor:22011":  "https://media.api-sports.io/football/teams/2362.png",
    "sr:competitor:3228": "https://media.api-sports.io/football/teams/2352.png",
    "sr:competitor:3240": "https://media.api-sports.io/football/teams/2360.png",
    "sr:competitor:174970": "https://media.api-sports.io/football/teams/2361.png",
    "sr:competitor:3237": "https://media.api-sports.io/football/teams/2351.png",
    "sr:competitor:6880": "https://media.api-sports.io/football/teams/2373.png",
    "sr:competitor:3238": "https://media.api-sports.io/football/teams/2363.png"
  };

  useEffect(() => {
    actions.getMatches();
    actions.getUpcomingMatches();
    actions.getPastMatches();
    actions.getTeams();
    actions.getStandings();
    actions.getStandingsTable();

    const interval = setInterval(() => {
      if (store.matches.length > 0) {
        actions.getMatches();
      }
    }, 60000); // 60000 ms = 1 minuto

    return () => clearInterval(interval);
  }, []);

  const groupMatchesByRound = (matches) => {
    return matches.reduce((acc, match) => {
      const roundParts = match.league.round.split(" - ");
      if (roundParts.length === 2) {
        const formattedRound = `${roundParts[0]} - Fecha ${roundParts[1]} `;

        if (!acc[formattedRound]) {
          acc[formattedRound] = [];
        }

        acc[formattedRound].push(match);
      }
      return acc;
    }, {});
  };

  const groupedPastMatches = groupMatchesByRound(store.pastMatches);
  const groupedUpcomingMatches = groupMatchesByRound(store.upcomingMatches);

  const reversedGroupedPastMatches = Object.entries(groupedPastMatches)
    .reverse()
    .reduce((acc, [round, matches]) => {
      acc[round] = matches;
      return acc;
    }, {});

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-2 py-8">
        <div className="mb-8 hidden">
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

              {Object.entries(groupedUpcomingMatches).length > 0 ? (
                Object.entries(groupedUpcomingMatches).map(
                  ([round, matches]) => (
                    <div key={round} className="mb-6">
                      <h2 className="text-xl font-semibold text-center mb-2">
                        {round}
                      </h2>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
                        {matches.map((match, index) => (
                          <MatchCard
                            key={index}
                            match={match}
                            teams={match.teams}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="text-gray-500 text-center">
                  <Spinner size="lg" />
                </div>
              )}
            </div>

            {/* Partidos Finalizados */}
            <div className="max-w-4xl mx-auto p-4">
              <h1 className="text-2xl font-bold text-center mb-4">
                Resultados anteriores
              </h1>

              {Object.entries(reversedGroupedPastMatches).length > 0 ? (
                Object.entries(reversedGroupedPastMatches).map(
                  ([round, matches]) => (
                    <div key={round} className="mb-6">
                      <h2 className="text-xl font-semibold text-center mb-2">
                        {round}
                      </h2>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
                        {matches.map((match, index) => (
                          <MatchCard
                            key={index}
                            match={match}
                            teams={match.teams}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="text-gray-500 text-center">
                  <Spinner size="lg" />
                </div>
              )}
            </div>
          </div>

          {/* Barra lateral */}
          <div className="lg:col-span-1 text-xs mt-8 lg:mt-0 space-y-8">
            {/* Equipos de la Temporada */}
            <div className="max-w-lg mx-auto p-8">
              <h1 className="text-2xl font-bold text-center mb-8">
                Equipos de la Temporada
              </h1>
              <div
                className={
                  store.teams.length > 0
                    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                    : "text-center"
                }
              >
                {store.teams.length > 0 ? (
                  store.teams.map((team, index) => (
                    <TeamCard key={index} team={team.team} />
                  ))
                ) : (
                  <div className="text-gray-500 text-center">
                    <Spinner size="lg" />
                  </div>
                )}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="max-w-lg mx-auto mt-8 p-2">
              <h1 className="text-2xl font-bold text-center mb-8">
                Tabla de Posiciones
              </h1>
              {store.standings.length > 0 ? (
                <div className="box overflow-x-auto bg-background rounded-lg shadow-xl border-t-4 border-primary-500 px-2 pb-2">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-background/80">
                        <th className="px-2 py-3 text-md"></th>
                        <th className="px-2 py-3 text-md">Equipo</th>
                        <th className="px-2 py-3 text-md">J</th>
                        <th className="px-2 py-3 text-md">G</th>
                        <th className="px-2 py-3 text-md">E</th>
                        <th className="px-2 py-3 text-md">P</th>
                        <th className="px-2 py-3 text-md">DG</th>
                        <th className="px-2 py-3 text-md">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {store.standings2.map((standing, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0
                              ? "bg-background/10"
                              : "bg-background/80"
                          } transition-transform`}
                        >
                          <td className="md:px-3 py-3 border border-primary rounded-lg">
                            {index + 1}
                          </td>
                          <td className="px-6 py-3 border border-primary rounded-lg font-medium">
                            <img src={logos[standing.competitor.id]} alt="Bandera del equipo" className="min-w-6 min-h-6 m-auto" />
                          </td>
                          <td className="px-6 py-3 border border-primary rounded-lg">
                            {standing.played}
                          </td>
                          <td className="px-6 py-3 border border-primary rounded-lg">
                            {standing.win}
                          </td>
                          <td className="px-6 py-3 border border-primary rounded-lg">
                            {standing.draw}
                          </td>
                          <td className="px-6 py-3 border border-primary rounded-lg">
                            {standing.loss}
                          </td>
                          <td className="px-6 py-3 border border-primary rounded-lg">
                            {standing.goals_diff}
                          </td>
                          <td className="px-6 py-3 border border-primary rounded-lg font-bold">
                            {standing.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-gray-500 text-center">
                  <Spinner size="lg" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 hidden">
          <AdSpace position="bottom" />
        </div>
      </main>
    </div>
  );
}

export default Home;
