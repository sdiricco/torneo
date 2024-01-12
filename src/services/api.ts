import axios from "axios";

const baseurl = 'https://torneo-api.onrender.com/api/v1/torneo'

export async function getTournamentDetailFromAICSWebPage(id:string){
  return await axios.get(`${baseurl}/tournaments/${id}`)
}

export async function getTournamentsFromAICSWebPage(){
  return await axios.get(`${baseurl}/tournaments`)
}

export async function getStandingsFromAICSWebPage(id:string){
  return await axios.get(`${baseurl}/standings`, {params: {id}})
}

export async function getPlayersFromAICSWebPage(id:string){
  return await axios.get(`${baseurl}/players`,{params: {id}})
}