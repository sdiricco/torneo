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

    requestDate: undefined,
  }),
  getters: {
    isDark: (state) => state.preferences.isDark,
    getTournamentName: (state) => state.tournamentDetails?.name,
    getTeamsRanking: (state) => state.tournamentDetails?.teamsRanking || [],
    getLatestMatchResults: (state) => state.tournamentDetails?.latestMatches || [],
    getNextMatches: (state) => state.tournamentDetails?.nextMatches || [],
    getTournamentCalendarValues: (state) => state.tournamentCalendar?.values || [],
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
      this.requestDate = new Date();
      const response = await api.getTournaments();
      this.tournaments = response.data.data;
    },

    //fetch tournament details
    async fecthTournamentDetails(id: string) {
      this.requestDate = new Date();
      const response = await api.getTournamentDetails(id);
      this.tournamentDetails = response.data.data;
    },

    //fetch players of tournament
    async fetchPlayers(id: string) {
      this.requestDate = new Date();
      const response = await api.getPlayersStats(id);
      this.playersStats = response.data.data;
    },

    //fetch tournament calendar
    async fetchTournamentCalendar(id: string, week?: number) {
      this.requestDate = new Date();
      const response = await api.getTournamentCalendar(id, week);
      this.tournamentCalendar = response.data.data;
    },
  },
});
