const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      matches: [],
      pastMatches: [],
      upcomingMatches: [],
      teams: [],
      standings: [],
      standings2: [],
    },
    actions: {
      getTeams: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const LEAGUE_ID = 268;
        const SEASON_YEAR = 2025;
        const store = getStore();
        try {
          const response = await fetch(
            `https://v3.football.api-sports.io/teams?country=Uruguay&league=${LEAGUE_ID}&season=${SEASON_YEAR}`,
            {
              headers: {
                "x-apisports-key": API_KEY,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error al obtener los equipos");
          }

          const data = await response.json();
          setStore({ teams: data.response });
          console.log(data.response);
        } catch (error) {
          console.error("Error en getTeams:", error);
        }
      },
      getMatches: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const LEAGUE_ID = 268;
        const SEASON_YEAR = 2025;

        try {
          const response = await fetch(
            `https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON_YEAR}&live=all`,
            {
              headers: {
                "x-apisports-key": API_KEY,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error al obtener los partidos");
          }

          const data = await response.json();
          setStore({ matches: data.response });
        } catch (error) {
          console.error("Error en getMatches:", error);
        }
      },
      getPastMatches: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const LEAGUE_ID = 268;
        const SEASON_YEAR = 2025;

        try {
          const response = await fetch(
            `https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON_YEAR}&status=FT`,
            {
              headers: {
                "x-apisports-key": API_KEY,
              },
            }
          );

          if (!response.ok)
            throw new Error("Error al obtener los partidos finalizados");

          const data = await response.json();
          setStore({ pastMatches: data.response });
        } catch (error) {
          console.error("Error en getPastMatches:", error);
        }
      },
      getUpcomingMatches: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const LEAGUE_ID = 268;
        const SEASON_YEAR = 2025;

        try {
          const response = await fetch(
            `https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON_YEAR}&status=NS`,
            {
              headers: {
                "x-apisports-key": API_KEY,
              },
            }
          );

          if (!response.ok)
            throw new Error("Error al obtener los proximos partidos");

          const data = await response.json();
          setStore({ upcomingMatches: data.response });
        } catch (error) {
          console.error("Error en getUpcomingMatches:", error);
        }
      },
      getStandings: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const LEAGUE_ID = 268;
        const SEASON_YEAR = 2025;
        const store = getStore();

        try {
          const response = await fetch(
            `https://v3.football.api-sports.io/standings?league=${LEAGUE_ID}&season=${SEASON_YEAR}`,
            {
              headers: {
                "x-apisports-key": API_KEY,
              },
            }
          );

          if (!response.ok)
            throw new Error("Error al obtener estadisticas de los equipos");

          const data = await response.json();
          setStore({ standings: data.response[0].league.standings[0] });
        } catch (error) {
          console.error("Error en getStandings:", error);
        }
      },
      getStandingsTable: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY2;
        const URL = `https://api.sportradar.com/soccer/trial/v4/en/seasons/sr%3Aseason%3A128225/form_standings.json?api_key=${API_KEY}`;

        const PROXY_URL = "https://cors-anywhere.herokuapp.com/"; // Proxy para evitar CORS

        try {
          const response = await fetch(PROXY_URL + URL, {
            headers: { accept: "application/json" },
          });

          if (!response.ok)
            throw new Error("Error al obtener la tabla de posiciones");

          const data = await response.json();
          setStore({ standings2: data.season_form_standings[0].groups[0].form_standings });
          console.log(data.season_form_standings[0].groups[0].form_standings);
        } catch (error) {
          console.error("Error en getStandingsTable:", error);
        }
      },
    },
  };
};

export default getState;

// https://v3.football.api-sports.io/teams/statistics?league=268&season=2023&team=2348

//GET : https://v3.football.api-sports.io/venues?country=Uruguay estadios
