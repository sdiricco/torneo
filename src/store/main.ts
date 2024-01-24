import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { setTheme } from "@/theme/utility";
import { Network } from "@capacitor/network";
import {
  getPlayersFromAICSWebPage,
  getTournamentsFromAICSWebPage,
  getMatchResults,
  getDisciplinaryMeasurements
} from "@/services/api";

import * as api from "@/api/api"
import { useRoute } from "vue-router";
import { ITournamentDetails, IPlayerStats, ITournamentEntry } from "@/api/interfaces";

const route = useRoute();

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
  tournaments: ITournamentEntry[];
  tournamentDetails: ITournamentDetails | undefined;
  playersStats: IPlayerStats[];

  teams: any[];
  results: any;
  disciplinaryMeasurements: any;
  longLoadingID: any;
  longLoading: boolean;
}
export const useStore = defineStore({
  id: "store",
  state: (): IState => ({
    httpRequestOnGoing: false,
    appVersion: "0.0.1",
    networkStatus: {
      connected: true,
      connectionType: "",
    },
    preferences: {
      isDark: false,
    },
    tournaments: [],
    tournamentDetails: undefined,
    playersStats: [],
    teams: [],
    results: undefined,
    disciplinaryMeasurements: [],
    longLoadingID: null,
    longLoading: false,
  }),
  getters: {
    isDark: (state: any) => state.preferences.isDark,
    getTournamentName: (state) => state.tournamentDetails?.name,
    getTeamsRanking: (state) => state.tournamentDetails?.teamsRanking || [],
    getLatestMatchResults: (state) => state.tournamentDetails?.latestMatches || [],
    getNextMatches: (state) => state.tournamentDetails?.nextMatches || [],
  },
  actions: {
    async toggleTheme(isDark: boolean) {
      this.preferences.isDark = isDark;
      console.log("Toggle theme");
      console.log("\tisDark", isDark);
      await setTheme(isDark);
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
      await setTheme(this.isDark);
      this.listenForNetworkChanges();
      await this.getNetworkStatus();
    },
    async clear() {
      await Preferences.clear();
    },

    //FETCH TOURNAMENTS
    async fecthTournaments() {
      this.tournaments = [];
      this.httpRequestOnGoing = true;
      this.longLoadingID = setTimeout(() => {
        this.longLoading = true;
      }, 5000);
      const response = await api.getTournaments();
      this.tournaments = response.data.data;
      clearTimeout(this.longLoadingID);
      this.longLoading = false;
      this.longLoadingID = null;
      this.httpRequestOnGoing = false;
    },

    //FETCH TOURNAMENT DETAILS
    async fecthTournamentDetails(id: string) {
      this.tournamentDetails = undefined;
      this.httpRequestOnGoing = true;
      this.longLoadingID = setTimeout(() => {
        this.longLoading = true;
      }, 5000);
      const response = await api.getTournamentDetails(id);
      this.tournamentDetails = response.data.data;
      clearTimeout(this.longLoadingID);
      this.longLoading = false;
      this.longLoadingID = null;
      this.httpRequestOnGoing = false;
    },

    //FETCH PLAYERS
    async fetchPlayers(id: string) {
      this.playersStats = [];
      this.httpRequestOnGoing = true;
      this.longLoadingID = setTimeout(() => {
        this.longLoading = true;
      }, 5000);
      const response = await api.getPlayersStats(id);
      this.playersStats = response.data.data

      clearTimeout(this.longLoadingID);
      this.longLoading = false;
      this.longLoadingID = null;
      this.httpRequestOnGoing = false;
    },

    //FETCH MATCH RESULTS
    async fetchMatchResults(id: string) {
      this.results = [];
      this.httpRequestOnGoing = true;
      this.longLoadingID = setTimeout(() => {
        this.longLoading = true;
      }, 5000);
      const response = await getMatchResults(id);
      clearTimeout(this.longLoadingID);
      this.longLoading = false;
      this.longLoadingID = null;
      this.results = response.data.data;
      this.httpRequestOnGoing = false;
    },
  },
});
