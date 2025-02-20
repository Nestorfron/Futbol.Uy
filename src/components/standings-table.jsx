import { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

export default function StandingsTable() {
  const { store, actions } = useContext(Context);
  const [standings, setStandings] = useState(store.standings);

 useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < store.teams.length) {
        const teamId = store.teams[index].team.id;
        actions.getTeamStats(teamId);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  }, []);

  return (
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
                index % 2 === 0 ? "bg-background/10" : "bg-background/80"
              } transition-transform`}
            >
              <td className="px-6 py-3 border border-primary rounded-lg">
                {standing.rank}
              </td>
              <td className="px-6 py-3 border border-primary rounded-lg font-medium">
                <img
                  src={standing.team?.logo}
                  alt="Bandera del equipo"
                  className="w-6 h-6 m-auto"
                />
              </td>
              <td className="px-6 py-3 border border-primary rounded-lg">
                {standing.home.played + standing.away.played}
              </td>
              <td className="px-6 py-3 border border-primary rounded-lg">
                {standing.home.win + standing.away.win}
              </td>
              <td className="px-6 py-3 border border-primary rounded-lg">
                {standing.home.draw + standing.away.draw}
              </td>
              <td className="px-6 py-3 border border-primary rounded-lg">
                {standing.home.lose + standing.away.lose}
              </td>
              <td className="px-6 py-3 border border-primary rounded-lg">
                {standing.goalsDiff}
              </td>
              <td className="px-6 py-3 border border-primary rounded-lg">
                {standing.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
