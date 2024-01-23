import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { setTheme } from "@/theme/utility";
import { Network } from "@capacitor/network";
import {
  getPlayersFromAICSWebPage,
  getTeamsRankingFromAICSWebPage,
  getTournamentsFromAICSWebPage,
  getTournamentDetailFromAICSWebPage,
  getMatchResults,
  getLatestMatchResults,
  getNextMatches,
  getDisciplinaryMeasurements
} from "@/services/api";

import * as api from "@/api/api"
import { useRoute } from "vue-router";
import { ITournamentDetails } from "@/api/interfaces";

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
  tournaments: any[];
  tournamentDetails: ITournamentDetails | undefined;
  teams: any[];
  players: any[];
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
    teams: [],
    players: [],
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
    getNextMatches: (state) => state.tournamentDetails?.nextMatches || []
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
      const response = await getTournamentsFromAICSWebPage();
      clearTimeout(this.longLoadingID);
      this.longLoading = false;
      this.longLoadingID = null;
      this.tournaments = response.data.data;
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
      clearTimeout(this.longLoadingID);
      this.longLoading = false;
      this.longLoadingID = null;
      this.tournamentDetails = response.data.data;
      this.httpRequestOnGoing = false;
    },

    //FETCH STANDINGS
    async fecthStandings(id: string) {
      this.teams = [];
      this.httpRequestOnGoing = true;
      this.longLoadingID = setTimeout(() => {
        this.longLoading = true;
      }, 5000);
      const response = await getTeamsRankingFromAICSWebPage(id);
      clearTimeout(this.longLoadingID);
      this.longLoading = false;
      this.longLoadingID = null;
      this.teams = response.data.data.map((_: any) => {
        return {
          ..._,
          goal: Number(_.points),
        };
      });
      this.httpRequestOnGoing = false;
    },

    //FETCH PLAYERS
    async fetchPlayers(id: string) {
      this.players = [];
      this.httpRequestOnGoing = true;
      this.longLoadingID = setTimeout(() => {
        this.longLoading = true;
      }, 5000);
      const response = await getPlayersFromAICSWebPage(id);
      clearTimeout(this.longLoadingID);
      this.longLoading = false;
      this.longLoadingID = null;
      this.players = response.data.data.map((p: any) => {
        return {
          ...p,
          goal: Number(p.goal),
        };
      });
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

    //FETCH NEXT MATCHE
    async fetchDisciplinaryMeasurements(id: string) {
      this.disciplinaryMeasurements = [];
      this.httpRequestOnGoing = true;
      this.longLoadingID = setTimeout(() => {
        this.longLoading = true;
      }, 5000);
      const response = await getDisciplinaryMeasurements(id);
      clearTimeout(this.longLoadingID);
      this.longLoading = false;
      this.longLoadingID = null;
      this.disciplinaryMeasurements = response.data.data;
      this.httpRequestOnGoing = false;
    },
  },
});
