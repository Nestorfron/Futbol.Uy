import React from "react";

const TeamCard = ({ team }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center border-t-4 border-blue-500 transition-transform transform hover:scale-105 hover:shadow-xl">
      <img 
        src={team.logo} 
        alt={team.name} 
        className="w-14 h-14 mb-3 object-contain" 
      />
    </div>
  );
};

export default TeamCard;
