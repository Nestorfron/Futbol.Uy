import { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

export default function StandingsTable() {
  const { store, actions } = useContext(Context);
  const [standings, setStandings] = useState(store.standings2);

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
    <div className="box overflow-x-auto bg-background rounded-lg border-t-4 border-primary-500">
      {store.standings2.map((standing, index) => (
        <p>{standing.rank}</p>
      ))}           
    </div>
  );
}
