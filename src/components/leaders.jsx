import React from "react";
import TeamLogo from "../components/team-logo.jsx";

function Leaders({ leaders }) {
  return (
    <div className="max-w-lg mx-auto rounded-lg shadow-xl border-t-4 border-primary-500 px-2 pb-2">
      <div className="max-h-96 overflow-y-auto space-y-2">
        {" "}
        <ul className="space-y-2 pt-2">
          {leaders.map((leader) =>
            leader.players.map((player) => {
              const goals =
                player.competitors?.[0]?.datapoints?.find(
                  (dp) => dp.type === "goals"
                )?.value || 0;
              const teamId = player.competitors?.[0]?.id;
              return (
                <li
                  key={player.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="max-w-10 max-h-10 overflow-hidden">
                      <TeamLogo teamId={teamId} />
                    </div>
                    <span>{player.name}</span>
                  </div>
                  <span className="font-bold">{goals} ⚽</span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default Leaders;
