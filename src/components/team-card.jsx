import React from "react";

const TeamCard = ({ team }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center w-48 border-t-4 border-blue-500">
      <img src={team.logo} alt={team.name} className="w-16 h-16 mb-2" />
      <h3 className="text-sm font-medium text-gray-700 text-center">{team.name}</h3>
    </div>
  );
};

export default TeamCard;
