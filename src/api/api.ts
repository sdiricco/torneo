import axios from "axios";
import { TORNEO_API_BASE_URL } from "@/constants";
import { ITournamentDetails, ICalendar, ITournamentEntry, IPlayerStats, IApiResponse, ITournamentEntryV2 } from "./interfaces";

const baseurl = TORNEO_API_BASE_URL;

export async function getTournaments() {
  return await axios.get<IApiResponse<ITournamentEntry[]>>(`${baseurl}/tournaments`);
}

export async function getTournamentsV2() {
  return await axios.get<IApiResponse<ITournamentEntryV2[]>>(`${baseurl}/tournaments/v2`);
}

export async function getTournamentDetails(id: string) {
  return axios.get<IApiResponse<ITournamentDetails>>(`${baseurl}/tournaments/${id}`);
}

export async function getPlayersStats(id: string) {
  return await axios.get<IApiResponse<IPlayerStats[]>>(`${baseurl}/tournaments/${id}/players`);
}

export async function getTournamentCalendar(id: string, week?: number) {
  return await axios.get<IApiResponse<ICalendar>>(`${baseurl}/tournaments/${id}/calendar/${week}`);
}
