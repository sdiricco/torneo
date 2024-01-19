import axios from "axios";
import {TORNEO_API_BASE_URL} from "@/constants"

const baseurl = TORNEO_API_BASE_URL

console.log('baseurl', baseurl)



export async function getTournamentsFromAICSWebPage(){
  return await axios.get(`${baseurl}/tournaments`)
}

export async function getTournamentDetailFromAICSWebPage(id:string){
  return await axios.get(`${baseurl}/tournaments/${id}`)
}


export async function getStandingsFromAICSWebPage(id:string){
  return await axios.get(`${baseurl}/tournaments/${id}/teams-ranking`)
}

export async function getPlayersFromAICSWebPage(id:string){
  return await axios.get(`${baseurl}/tournaments/${id}/players-ranking`)
}

export async function getMatchResults(id:string){
  return await axios.get(`${baseurl}/tournaments/${id}/match-results`)
}

export async function getLatestMatchResults(id:string){
  return await axios.get(`${baseurl}/tournaments/${id}/latest-match-results`)
}


export async function getNextMatches(id:string){
  return await axios.get(`${baseurl}/tournaments/${id}/next-matches`)
}