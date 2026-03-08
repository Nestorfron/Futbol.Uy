import React from 'react';

function TeamLogo({ teamId }) {
  const logos = {
    "sr:competitor:3224": "https://media.api-sports.io/football/teams/2352.png", // Juventud
    "sr:competitor:3227": "https://media.api-sports.io/football/teams/2348.png", // Peñarol
    "sr:competitor:3228": "https://media.api-sports.io/football/teams/2363.png", // Danubio
    "sr:competitor:3229": "https://media.api-sports.io/football/teams/2353.png", // Defensor
    "sr:competitor:3230": "https://media.api-sports.io/football/teams/2356.png", // Nacional
    "sr:competitor:3232": "https://media.api-sports.io/football/teams/2367.png", // Central Español
    "sr:competitor:3234": "https://media.api-sports.io/football/teams/2358.png", // Deportivo Maldonado
    "sr:competitor:3238": "https://media.api-sports.io/football/teams/2362.png", // Progreso
    "sr:competitor:3240": "https://media.api-sports.io/football/teams/2360.png", // Wanderers
    "sr:competitor:6879": "https://media.api-sports.io/football/teams/2359.png", // Liverpool
    "sr:competitor:22011": "https://media.api-sports.io/football/teams/2351.png", // Cerro
    "sr:competitor:25009": "https://media.api-sports.io/football/teams/2369.png", // Cerro Largo
    "sr:competitor:25010": "https://media.api-sports.io/football/teams/2350.png", // Racing
    "sr:competitor:174970": "https://media.api-sports.io/football/teams/2361.png", // Boston River
    "sr:competitor:174972": "https://media.api-sports.io/football/teams/2365.png", // City Torque
    "sr:competitor:417775": "https://media.api-sports.io/football/teams/2373.png"  // Albion
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
