import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.jsx";
import AdSpace from "../components/ad-space.jsx";
import TeamCard from "../components/team-card.jsx";

function Teams() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getTeams();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Espacio Publicitario Superior */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSpace position="top" />
      </div>

      {/* Equipos de la Temporada */}
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-xl font-bold text-center mb-4">
          Equipos de la Temporada
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
    </div>
  );
}

export default Teams;