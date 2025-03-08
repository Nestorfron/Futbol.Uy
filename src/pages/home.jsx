import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.jsx";
import { Spinner } from "@heroui/react";
import AdSpace from "../components/ad-space.jsx";
import LiveMatchCardUruguay from "../components/live-match.jsx";
import TeamCard from "../components/team-card.jsx";
import MatchCard from "../components/match-card.jsx";
import StandingsTable from "../components/standings-table.jsx";
import Leaders from "../components/leaders.jsx";
import Footer from "../components/footer.jsx";
import Calendar from "../assets/calendar.jsx";

function Home() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getLiveMatchesInUruguay();
    actions.getAllMatches();
    actions.getTeams();
    actions.getStandingsTable();
    actions.getLeaders();

    const interval = setInterval(() => {
      if (store.liveMatches.length > 0) {
        actions.getLiveMatchesInUruguay();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const groupMatchesByRound = (matches) => {
    return matches.reduce((acc, match) => {
      const roundNumber = match.sport_event?.sport_event_context?.round?.number;
      if (roundNumber) {
        const formattedRound = `Fecha ${roundNumber}`;
        if (!acc[formattedRound]) {
          acc[formattedRound] = [];
        }
        acc[formattedRound].push(match);
      }
      return acc;
    }, {});
  };

  const groupedUpcomingMatches = groupMatchesByRound(
    store.upcomingMatches || []
  );
  const groupedFinishedMatches = groupMatchesByRound(
    store.finishedMatches || []
  );
  const reversedGroupedFinishedMatches = Object.entries(groupedFinishedMatches)
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
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-8">
            {/* Partidos en Vivo en Uruguay */}
            <div className="max-w-4xl mx-auto p-4">
              <h1 className="text-2xl font-bold text-center mb-4">
                Resultados en Vivo
              </h1>
              <div className="flex flex-wrap gap-6 justify-center">
                {store.liveMatches?.length > 0 ? (
                  store.liveMatches.map((match, index) => (
                    <LiveMatchCardUruguay key={index} match={match} />
                  ))
                ) : (
                  <div className="justify-center items-center m-auto">
                    <Calendar />
                    <p className="pt-2 text-gray-500 text-center w-full">
                      No hay partidos en vivo en este momento.
                    </p>
                  </div>
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
                      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                        {matches.map((match, index) => (
                          <MatchCard key={index} match={match} />
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
            <div className="max-w-4xl mx-auto p-4 mt-8">
              <h1 className="text-2xl font-bold text-center mb-4">
                Resultados anteriores
              </h1>
              {Object.entries(reversedGroupedFinishedMatches).length > 0 ? (
                Object.entries(reversedGroupedFinishedMatches).map(
                  ([round, matches]) => (
                    <div key={round} className="mb-6">
                      <h2 className="text-xl font-semibold text-center mb-2">
                        {round}
                      </h2>
                      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                        {matches.map((match, index) => (
                          <MatchCard key={index} match={match} />
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
          <div className="lg:col-span-1 text-xs mt-8 lg:mt-0 space-y-8 lg:space-y-0">
            {/* Equipos de la Temporada */}
            <div className="max-w-md mx-auto p-8">
              <h1 className="text-2xl font-bold text-center mb-8">
                Equipos de la Temporada
              </h1>
              <div
                className={
                  store.teams?.length > 0
                    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "text-center"
                }
              >
                {store.teams?.length > 0 ? (
                  store.teams.map((team, index) => (
                    <TeamCard key={index} team={team} />
                  ))
                ) : (
                  <div className="text-gray-500 text-center">
                    <Spinner size="lg" />
                  </div>
                )}
              </div>
            </div>

            {/* Tabla de Posiciones */}
            <div className="max-w-lg mx-auto mt-8 p-2">
              <h1 className="text-2xl font-bold text-center mb-8">
                Tabla de Posiciones
              </h1>
              {store.standings2?.length > 0 ? (
                <StandingsTable />
              ) : (
                <div className="text-gray-500 text-center">
                  <Spinner size="lg" />
                </div>
              )}
            </div>

            {/* Líderes */}
            <div className="max-w-lg mx-auto mt-8 p-2">
              <h1 className="text-2xl font-bold text-center mb-8">
                Goleadores
              </h1>
              {store.leaders?.length > 0 ? (
                <Leaders leaders={store.leaders} />
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
      <Footer />
    </div>
  );
}

export default Home;
