import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.jsx";
import AdSpace from "../components/ad-space.jsx";
import MatchCard from "../components/match-card.jsx";

function Matches() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPastMatches();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Espacio Publicitario Superior */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSpace position="top" />
      </div>

      {/* Partidos Finalizados */}
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-xl font-bold text-center mb-4">Resultados</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {store.pastMatches.length > 0 ? (
            store.pastMatches.map((match, index) => (
              <MatchCard key={index + 1} match={match} teams={match.teams} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              Cargando partidos...
            </p>
          )}
        </div>
      </div>
    </div>
  );    
  }

export default Matches;