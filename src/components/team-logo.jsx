import React from 'react';

function TeamLogo({ teamId }) {
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
    "sr:competitor:3238": "https://media.api-sports.io/football/teams/2363.png",
  };

  const teamLogo = logos[teamId] || "";

  return teamLogo ? (
    <img
      src={teamLogo}
      alt={`Logo del equipo ${teamId}`}
      className="object-cover"
    />
  ) : null;
}

export default TeamLogo;
