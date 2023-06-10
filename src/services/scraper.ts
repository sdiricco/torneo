import axios from "axios";

export async function getStandingsFromAICSWebPage(){
  return await axios.get('https://torneo-api.onrender.com/api/v1/torneo/standings')
}

export async function getPlayersFromAICSWebPage(){
  return await axios.get('https://torneo-api.onrender.com/api/v1/torneo/players')
}