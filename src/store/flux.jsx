const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      liveMatches: [],
      finishedMatches: [],
      upcomingMatches: [],
      teams: [],
      standings2: [],
      leaders: [],
      teamProfile: [],
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
          if (!response.ok) throw new Error("Error al obtener los equipos");

          const data = await response.json();
          setStore({ teams: data.season_competitors });
        } catch (error) {
          console.error("Error en getTeams:", error);
        }
      },
      getTeamProfile: async (teamId) => {
        const API_KEY = import.meta.env.VITE_API_KEY2;
        const URL = `https://api.sportradar.com/soccer/trial/v4/en/competitors/${teamId}/profile.json?api_key=${API_KEY}`;
        const PROXY_URL = "https://corsproxy.io/?";

        try {
          const response = await fetch(PROXY_URL + URL, {
            headers: {
              accept: "application/json",
            },
          });
          if (!response.ok)
            throw new Error("Error al obtener el perfil del equipo");

          const data = await response.json();
          setStore({ teamProfile: data });
        } catch (error) {
          console.error("Error en getTeamProfile:", error);
        }
      },
      getAllMatches: async () => {
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
            const finishedMatches = data.summaries.filter(
              (event) =>
                event.sport_event_status?.match_status === "ended" ||
                event.sport_event_status?.status === "closed"
            );
            const upcomingMatches = data.summaries.filter(
              (event) =>
                event.sport_event_status?.match_status === "not_started" ||
                event.sport_event_status?.status === "not_started"
            );
            setStore({
              finishedMatches: finishedMatches,
              upcomingMatches: upcomingMatches,
            });
          } else {
            console.error(
              "No se encontraron partidos en la respuesta de la API."
            );
          }
        } catch (error) {
          console.error("Error en getFinishedMatches:", error);
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
          setStore({
            standings2: data.season_form_standings[0].groups[0].form_standings,
          });
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
          if (!response.ok) throw new Error("Error al obtener los jugadores");

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
          if (!response.ok) throw new Error("Error al obtener los líderes");

          const data = await response.json();
          setStore({ leaders: data.lists[1].leaders });
        } catch (error) {
          console.error("Error en getLeaders:", error);
        }
      },
      getLiveMatchesInUruguay: async () => {
        const API_KEY = import.meta.env.VITE_API_KEY2;
        const URL = `https://api.sportradar.com/soccer/trial/v4/en/schedules/live/schedules.json?api_key=${API_KEY}`;
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

          if (!data.schedules || !Array.isArray(data.schedules)) {
            throw new Error("No se encontraron partidos en vivo.");
          }

          const partidosEnUruguay = data.schedules.filter((partido) => {
            const categoria = partido.sport_event.sport_event_context?.category;
            const status = partido.sport_event_status?.status;
            const seasonIdFromResponse =
              partido.sport_event.sport_event_context?.season?.id;

            return (
              categoria?.country_code === "URY" &&
              status === "live" &&
              seasonIdFromResponse === "sr:season:128225"
            );
          });

          if (partidosEnUruguay.length === 0) {
            throw new Error("No se encontraron partidos en vivo en Uruguay.");
          }

          setStore({ liveMatches: partidosEnUruguay });
        } catch (error) {
          console.error("Error en getLiveMatchesInUruguay:", error.message);
        }
      },
    },
  };
};

export default getState;
