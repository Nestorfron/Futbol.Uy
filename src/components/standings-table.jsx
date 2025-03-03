import { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import TeamLogo from "../components/team-logo.jsx"; 

export default function StandingsTable() {
  const { store, actions } = useContext(Context);

  return (
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
                index % 2 === 0 ? "bg-background/10" : "bg-background/80"
              } transition-transform`}
            >
              <td className="md:px-3 py-3 border border-primary rounded-lg">
                {index + 1}
              </td>
              <td className="px-4 py-3 border border-primary rounded-lg font-medium">
                <TeamLogo teamId={standing.competitor.id} />
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
  );
}
