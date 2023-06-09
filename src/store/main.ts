import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { setTheme } from "@/theme/utility";
import { Network } from '@capacitor/network';
import useTheme from "@/composables/useTheme"
import { getPlayersFromAICSWebPage, getStandingsFromAICSWebPage } from "@/services/scraper";



interface IState {
  httpRequestOnGoing: boolean;
  appVersion: string;
  networkStatus: {
    connected: boolean;
    connectionType: string;
  },
  preferences: {
    isDark: boolean;
  },
  teams: any[];
  players: any[];
  longLoadingID: any;
  longLoading: boolean;
}
export const useStore = defineStore({
  id: "store",
  state: (): IState =>({
    httpRequestOnGoing: false,
    appVersion: "0.0.1",
    networkStatus: {
      connected: true,
      connectionType: ''
    },
    preferences: {
      isDark: false,
    },
    teams: [],
    players: [],
    longLoadingID:null,
    longLoading:false,
  }),
  getters: {
    isDark: (state: any) => state.preferences.isDark,
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
    listenForNetworkChanges(){
      Network.addListener('networkStatusChange', status => {
        this.networkStatus = status;
        console.log('Network status changed', status.connected);
      });
    },
    async getNetworkStatus(){
      try {
        const status = await Network.getStatus()
        this.networkStatus = status;
        console.log('Network status:', status.connected);
      } catch (e) {
        console.log('Error getting network status')
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
    async fecthStandings(){
      this.httpRequestOnGoing = true;
      this.longLoadingID = setTimeout(()=> {
        this.longLoading = true
      }, 5000)
      const response = await getStandingsFromAICSWebPage();
      clearTimeout(this.longLoadingID)
      this.longLoading = false;
      this.longLoadingID = null;
      this.teams = response.data.data;
      this.httpRequestOnGoing = false;
    },
    async fetchPlayers(){
      this.httpRequestOnGoing = true;
      this.longLoadingID = setTimeout(()=> {
        this.longLoading = true
      }, 5000)
      const response = await getPlayersFromAICSWebPage();
      clearTimeout(this.longLoadingID)
      this.longLoading = false;
      this.longLoadingID = null;
      this.players = response.data.data;
      this.httpRequestOnGoing = false;
    }
  },
});
