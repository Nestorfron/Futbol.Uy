import React, { useState } from "react";
import TeamModal from "../components/team-modal.jsx";

const TeamCard = ({ team }) => {
  return (
    <div className="box bg-background/80 rounded-2xl p-4 flex flex-col items-center border-t-4 border-primary-500 transition-transform transform hover:scale-105 hover:shadow-xl backdrop-blur-md cursor-pointer">
      <TeamModal team={team} />
    </div>
  );
};

export default TeamCard;
