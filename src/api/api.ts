import axios from "axios";
import {TORNEO_API_BASE_URL} from "@/constants"
import {ITournamentDetails, ITournamentEntry, ITeamRanking, IPlayerRanking, ILatestMatchResult, INextMatchResult, IApiResponse} from "./interfaces"

const baseurl = TORNEO_API_BASE_URL

export async function getTournaments(){
  return await axios.get<IApiResponse<ITournamentEntry[]>>(`${baseurl}/tournaments`)
}

export async function getTournamentDetails(id:string){
  return axios.get<IApiResponse<ITournamentDetails>>(`${baseurl}/tournaments/${id}`)
}

export async function getPlayers(id:string){
  return await axios.get<IApiResponse<IPlayerRanking[]>>(`${baseurl}/tournaments/${id}/players-ranking`)
}

export async function getDisciplinaryMeasurements(id:string){
  return await axios.get(`${baseurl}/tournaments/${id}/disciplinary-measurements`)
}