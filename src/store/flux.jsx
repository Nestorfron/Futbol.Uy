const getState = ({ getStore, getActions, setStore }) => {

  const fetchAPI = async (url) => {
    const store = getStore();
    const response = await fetch(store.PROXY_URL + url, {
      headers: { accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  };


  return {
    store: {
      API_KEY: import.meta.env.VITE_API_KEY2,
      API_URL: "https://api.sportradar.com/soccer/trial/v4/en/",
      PROXY_URL: "https://corsproxy.io/?",
      liveMatches: [],
      finishedMatches: [],
      upcomingMatches: [],
      teams: [],
      standings: [],
      leaders: [],
      teamProfile: null,
      sportEventTimeline: [],
      initial_season_id: null,
      seasons: [],
    },

    actions: {

      getSeasons: async () => {
        const store = getStore();
        try {
          const url = `${store.API_URL}competitions/sr:competition:278/seasons.json?api_key=${store.API_KEY}`;
          const data = await fetchAPI(url);
          const seasonId = data.seasons.at(-1)?.id;
          setStore({
            SEASONS: data.seasons,
            INITIAL_SEASON_ID: seasonId,
          });
          return data.seasons.at(-1)?.id;
        } catch (error) {
          console.error("getSeasons:", error);
          return null;
        }
      },

      getTeams: async () => {
        const store = getStore();
        const actions = getActions();
        if (!store.initial_season_id) {
          store.initial_season_id = await actions.getSeasons();
        }
        try {
          const url = `${store.API_URL}seasons/${store.initial_season_id}/competitors.json?api_key=${store.API_KEY}&limit=100`;
          const data = await fetchAPI(url);
          setStore({
            teams: data.season_competitors || [],
          });
        } catch (error) {
          console.error("getTeams:", error);
        }
      },

      getTeamProfile: async (teamId) => {
        const store = getStore();
        try {
          const url = `${store.API_URL}competitors/${teamId}/profile.json?api_key=${store.API_KEY}`;
          const data = await fetchAPI(url);
          setStore({
            teamProfile: data,
          });
        } catch (error) {
          console.error("getTeamProfile:", error);
        }
      },

      getAllMatches: async () => {
        const store = getStore();
        const actions = getActions();
      
        try {
          let seasonId = store.initial_season_id;
      
          if (!seasonId) {
            seasonId = await actions.getSeasons();
            if (!seasonId) return;
      
            setStore({ initial_season_id: seasonId });
          }
      
          const url = `${store.API_URL}seasons/${seasonId}/summaries.json?api_key=${store.API_KEY}`;
      
          const response = await fetch(store.PROXY_URL + url, {
            headers: { accept: "application/json" },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener los partidos");
          }
      
          const data = await response.json();
          const summaries = data?.summaries ?? [];
      
          const finishedMatches = [];
          const upcomingMatches = [];
          const liveMatches = [];
      
          summaries.forEach((event) => {
            const status = event?.sport_event_status?.match_status;
            const generalStatus = event?.sport_event_status?.status;
      
            if (status === "live") {
              liveMatches.push(event);
            } else if (status === "ended" || generalStatus === "closed") {
              finishedMatches.push(event);
            } else if (status === "not_started" || generalStatus === "not_started") {
              upcomingMatches.push(event);
            }
          });
      
          setStore({
            finishedMatches,
            upcomingMatches,
            liveMatches,
          });
      
      
        } catch (error) {
          console.error("Error en getAllMatches:", error);
        }
      },

      getStandingsTable: async () => {
        const store = getStore();
        const actions = getActions();
        if (!store.initial_season_id) {
          store.initial_season_id = await actions.getSeasons();
        }
        try {
          const URL = `${store.API_URL}seasons/${store.initial_season_id}/standings.json?api_key=${store.API_KEY}`;
          const response = await fetch(store.PROXY_URL + URL, {
            headers: { accept: "application/json" },
          });
          if (!response.ok)
            throw new Error("Error al obtener la tabla de posiciones");
          const data = await response.json();
          setStore({
            standings2: data.standings[0].groups[0].standings,
          });
        } catch (error) {
          console.error("Error en getStandingsTable:", error);
        }
      },


      getLiveMatchesInUruguay: async () => {
        const store = getStore();
        const actions = getActions();

        if (!store.initial_season_id) {
          store.initial_season_id = await actions.getSeasons();
        }


        try {
          const url = `${store.API_URL}schedules/live/schedules.json?api_key=${store.API_KEY}`;
          const data = await fetchAPI(url);
          const partidos = data.schedules?.filter((p) => {
            const category = p.sport_event.sport_event_context?.category;
            const status = p.sport_event_status?.status;
            const seasonId = p.sport_event.sport_event_context?.season?.id;
            return (
              category?.country_code === "URY" &&
              status === "live" &&
              seasonId === store.initial_season_id
            );
          });
          setStore({
            liveMatches: partidos || [],
          });
          console.log(partidos);
          if (partidos?.length > 0) {
            actions.getSportEventTimeline(partidos[0].sport_event.id);
          }
        } catch (error) {
          console.error("getLiveMatchesInUruguay:", error);
        }
      },

      getSportEventTimeline: async (eventId) => {
        const store = getStore();
        try {
          const url = `${store.API_URL}sport_events/${eventId}/timeline.json?api_key=${store.API_KEY}`;
          const data = await fetchAPI(url);

          setStore({
            sportEventTimeline: data.timeline || [],
          });
        } catch (error) {
          console.error("getSportEventTimeline:", error);
        }
      },

      

      getLeaders: async () => {
        const store = getStore();
        const actions = getActions();
        if (!store.initial_season_id) {
          store.initial_season_id = await actions.getSeasons();
        }
        try {
          const url = `${store.API_URL}seasons/${store.initial_season_id}/leaders.json?api_key=${store.API_KEY}`;
          const data = await fetchAPI(url);
          console.log(data);
          setStore({
            leaders: data?.lists?.[1]?.leaders || [],
          });
        } catch (error) {
          console.error("getLeaders:", error);
        }
      },
    },
  };
};

export default getState;