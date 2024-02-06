import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { Network } from "@capacitor/network";

import * as api from "@/api/api";
import { ITournamentDetails, IPlayerStats, ITournamentEntry, ICalendar } from "@/api/interfaces";

interface IState {
  httpRequestOnGoing: boolean;
  appVersion: string;
  networkStatus: {
    connected: boolean;
    connectionType: string;
  };
  preferences: {
    isDark: boolean;
  };

  longLoadingID: any;
  longLoading: boolean;
  isLoadingDebounced: boolean;

  //tournament specific
  tournaments: ITournamentEntry[];
  tournamentDetails: ITournamentDetails | undefined;
  playersStats: IPlayerStats[];
  tournamentCalendar: ICalendar | undefined;

  loading: {
    fetchTournaments: boolean;
    fetchTournamentDetails: boolean;
    fetchTournamentPlayersStats: boolean;
    fetchTournamentCalender: boolean;
  };

  loadingMessage: {
    fetchTournaments: string | undefined;
    fetchTournamentDetails: string | undefined;
    fetchTournamentPlayersStats: string | undefined;
    fetchTournamentCalender: string | undefined;
  };

  requestDate: Date | undefined;
}
export const useStore = defineStore({
  id: "store",
  state: (): IState => ({
    httpRequestOnGoing: false,
    appVersion: "0.0.3",
    networkStatus: {
      connected: true,
      connectionType: "",
    },
    preferences: {
      isDark: false,
    },

    longLoadingID: null,
    longLoading: false,

    tournaments: [],
    tournamentDetails: undefined,
    playersStats: [],
    tournamentCalendar: undefined,
    isLoadingDebounced: false,

    loading: {
      fetchTournaments: false,
      fetchTournamentDetails: false,
      fetchTournamentPlayersStats: false,
      fetchTournamentCalender: false,
    },

    loadingMessage: {
      fetchTournaments: undefined,
      fetchTournamentDetails: undefined,
      fetchTournamentPlayersStats: undefined,
      fetchTournamentCalender: undefined,
    },

    requestDate: undefined,
  }),
  getters: {
    isDark: (state) => state.preferences.isDark,
    getTournamentName: (state) => state.tournamentDetails?.name,
    getTeamsRanking: (state) => state.tournamentDetails?.teamsRanking || [],
    getLatestMatchResults: (state) => state.tournamentDetails?.latestMatches || [],
    getNextMatches: (state) => state.tournamentDetails?.nextMatches || [],
    getTournamentCalendarValues: (state) => state.tournamentCalendar?.values || [],
    getIsLoading: (state) => Object.values(state.loading).some((item) => item),
  },
  actions: {
    async toggleTheme(isDark: boolean) {
      this.preferences.isDark = isDark;
    },
    async fetchPreferences() {
      console.log("Fetch preferences");
      try {
        const data = await Preferences.get({ key: "preferences" });
        const result = JSON.parse(String(data.value));
        if (!result) {
          return;
        }
        this.preferences = result;
        console.log("\tpreferences", this.preferences);
      } catch (e) {
        console.log("\tError fetching preferences");
      }
    },
    async savePreferences(preferences: any) {
      try {
        await Preferences.set({
          key: "preferences",
          value: JSON.stringify(preferences),
        });
      } catch (e) {
        console.log("\tError saving preferences");
      }
    },
    listenForNetworkChanges() {
      Network.addListener("networkStatusChange", (status) => {
        this.networkStatus = status;
        console.log("Network status changed", status.connected);
      });
    },
    async getNetworkStatus() {
      try {
        const status = await Network.getStatus();
        this.networkStatus = status;
        console.log("Network status:", status.connected);
      } catch (e) {
        console.log("Error getting network status");
      }
    },
    async loadApp() {
      await this.fetchPreferences();
      this.listenForNetworkChanges();
      await this.getNetworkStatus();
    },
    async clear() {
      await Preferences.clear();
    },

    /***********************************************************************************************
     * Tournament specific
     ***********************************************************************************************/

    //Fetch list of tournaments
    async fecthTournaments() {
      this.loading.fetchTournaments = true;
      this.loadingMessage.fetchTournaments = "Sto caricando i campionati..";
      this.requestDate = new Date();
      const response = await api.getTournaments();
      this.tournaments = response.data.data;
      this.loadingMessage.fetchTournaments = undefined;
      this.loading.fetchTournaments = false;
    },

    //fetch tournament details
    async fecthTournamentDetails(id: string) {
      this.loading.fetchTournamentDetails = true;
      this.loadingMessage.fetchTournamentDetails = "Sto caricando i dettagli del campionato ..";
      this.requestDate = new Date();
      const response = await api.getTournamentDetails(id);
      this.tournamentDetails = response.data.data;
      this.loadingMessage.fetchTournamentDetails = undefined;
      this.loading.fetchTournamentDetails = false;
    },

    //fetch players of tournament
    async fetchPlayers(id: string) {
      this.loading.fetchTournamentPlayersStats = true;
      this.loadingMessage.fetchTournamentPlayersStats = "Sto caricando le statistiche dei calciatori ..";
      this.requestDate = new Date();
      const response = await api.getPlayersStats(id);
      this.playersStats = response.data.data;
      this.loadingMessage.fetchTournamentPlayersStats = undefined;
      this.loading.fetchTournamentPlayersStats = false;
    },

    //fetch tournament calendar
    async fetchTournamentCalendar(id: string, week?: number) {
      this.loading.fetchTournamentCalender = true;
      this.loadingMessage.fetchTournamentCalender = "Sto caricando il calendario delle giornate ..";
      this.requestDate = new Date();
      const response = await api.getTournamentCalendar(id, week);
      this.tournamentCalendar = response.data.data;
      this.loadingMessage.fetchTournamentCalender = undefined;
      this.loading.fetchTournamentCalender = false;
    },
  },
});
