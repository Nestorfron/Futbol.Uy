import { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

export default function StandingsTable() {
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
    "sr:competitor:22011": "https://media.api-sports.io/football/teams/2362.png",
    "sr:competitor:3228": "https://media.api-sports.io/football/teams/2352.png",
    "sr:competitor:3240": "https://media.api-sports.io/football/teams/2360.png",
    "sr:competitor:174970": "https://media.api-sports.io/football/teams/2361.png",
    "sr:competitor:3237": "https://media.api-sports.io/football/teams/2351.png",
    "sr:competitor:6880": "https://media.api-sports.io/football/teams/2373.png",
    "sr:competitor:3238": "https://media.api-sports.io/football/teams/2363.png"
  };

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
              <td className="px-6 py-3 border border-primary rounded-lg font-medium">
                <img
                  src={logos[standing.competitor.id]}
                  alt="Bandera del equipo"
                  className="min-w-6 min-h-6 m-auto"
                />
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
