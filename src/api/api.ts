import axios from "axios";
import {TORNEO_API_BASE_URL} from "@/constants"
import {ITournamentDetails, ITournamentEntry, IPlayerStats, IApiResponse} from "./interfaces"

const baseurl = TORNEO_API_BASE_URL

export async function getTournaments(){
  return await axios.get<IApiResponse<ITournamentEntry[]>>(`${baseurl}/tournaments`)
}

export async function getTournamentDetails(id:string){
  return axios.get<IApiResponse<ITournamentDetails>>(`${baseurl}/tournaments/${id}`)
}

export async function getPlayersStats(id:string){
  return await axios.get<IApiResponse<IPlayerStats[]>>(`${baseurl}/tournaments/${id}/players`)
}
