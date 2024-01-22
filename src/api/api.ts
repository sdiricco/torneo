import axios from "axios";
import {TORNEO_API_BASE_URL} from "@/constants"
import {ITournamentDetails, ITournamentEntry, ITeamRanking, IPlayerRanking, ILatestMatchResult, INextMatchResult} from "./interfaces"

const baseurl = TORNEO_API_BASE_URL

export async function getTournamentsFromAICSWebPage(){
  return await axios.get<ITournamentEntry[]>(`${baseurl}/tournaments`)
}

export async function getTournamentDetailFromAICSWebPage(id:string){
  return await axios.get<ITournamentDetails>(`${baseurl}/tournaments/${id}`)
}

export async function getTeamsRankingFromAICSWebPage(id:string){
  return await axios.get<ITeamRanking[]>(`${baseurl}/tournaments/${id}/teams-ranking`)
}

export async function getPlayersFromAICSWebPage(id:string){
  return await axios.get<IPlayerRanking[]>(`${baseurl}/tournaments/${id}/players-ranking`)
}

export async function getMatchResults(id:string){
  return await axios.get(`${baseurl}/tournaments/${id}/match-results`)
}

export async function getLatestMatchResults(id:string){
  return await axios.get<ILatestMatchResult[]>(`${baseurl}/tournaments/${id}/latest-match-results`)
}


export async function getNextMatches(id:string){
  return await axios.get<INextMatchResult[]>(`${baseurl}/tournaments/${id}/next-matches`)
}

export async function getDisciplinaryMeasurements(id:string){
  return await axios.get(`${baseurl}/tournaments/${id}/disciplinary-measurements`)
}