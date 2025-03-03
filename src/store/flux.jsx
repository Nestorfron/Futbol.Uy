const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      matches: [],
      pastMatches: [],
      finishedMatches: [],
      upcomingMatches: [],
      teams: [],
      standings: [],
      standings2: [],
      leaders: [],
    },
    actions: {
      getTeams: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY2;
        const URL = `https://api.sportradar.com/soccer/trial/v4/en/seasons/sr%3Aseason%3A128225/competitors.json?api_key=${API_KEY}`;
        const PROXY_URL = "https://corsproxy.io/?";


        try {
          const response = await fetch(PROXY_URL + URL, {
            headers: {
              accept: "application/json",
            },
          });
          if (!response.ok)
            throw new Error("Error al obtener los equipos");

          const data = await response.json();
          setStore({ teams: data.season_competitors });
        } catch (error) {
          console.error("Error en getTeams2:", error);
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
      getFinishedMatches: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY2;
        const URL = `https://api.sportradar.com/soccer/trial/v4/en/seasons/sr%3Aseason%3A128225/summaries.json?api_key=${API_KEY}`;
        const PROXY_URL = "https://corsproxy.io/?";
      
        try {
          const response = await fetch(PROXY_URL + URL, {
            headers: {
              accept: "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener los partidos");
          }
          const data = await response.json();
          if (data.summaries && Array.isArray(data.summaries)) {
            const finishedMatches = data.summaries.filter(event => 
              event.sport_event_status?.match_status === "ended" || event.sport_event_status?.status === "closed"
            );
            setStore({ finishedMatches: finishedMatches });
      
            console.log(finishedMatches);
          } else {
            console.error("No se encontraron partidos en la respuesta de la API.");
          }
        } catch (error) {
          console.error("Error en getFinishedMatches:", error);
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

        const PROXY_URL = "https://corsproxy.io/?";


        try {
          const response = await fetch(PROXY_URL + URL, {
            headers: { accept: "application/json" },
          });

          if (!response.ok)
            throw new Error("Error al obtener la tabla de posiciones");

          const data = await response.json();
          setStore({ standings2: data.season_form_standings[0].groups[0].form_standings });
        } catch (error) {
          console.error("Error en getStandingsTable:", error);
        }
      },
      getPlayers: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY2;
        const URL = `https://api.sportradar.com/soccer/trial/v4/en/seasons/sr%3Aseason%3A128225/lineups.json?api_key=${API_KEY}`;
        const PROXY_URL = "https://corsproxy.io/?";


        try {
          const response = await fetch(PROXY_URL + URL, {
            headers: {
              accept: "application/json",
            },
          });
          if (!response.ok)
            throw new Error("Error al obtener los jugadores");

          const data = await response.json();
          console.log(data.lineups);
        } catch (error) {
          console.error("Error en getPlayers:", error);
        }
      },
      getLeaders: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY2;
        const URL = `https://api.sportradar.com/soccer/trial/v4/en/seasons/sr%3Aseason%3A128225/leaders.json?api_key=${API_KEY}`;
        const PROXY_URL = "https://corsproxy.io/?";


        try {
          const response = await fetch(PROXY_URL + URL, {
            headers: {
              accept: "application/json",
            },
          });
          if (!response.ok)
            throw new Error("Error al obtener los líderes");

          const data = await response.json();
          setStore({ leaders: data.lists[1].leaders });
        } catch (error) {
          console.error("Error en getLeaders:", error);
        }
      },
    },
  };
};

export default getState;


