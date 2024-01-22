export interface ITournamentEntry {
    name: string;
    circolo: string;
    location: string;
    id: string;
}

export interface ITournamentDetails {
    name: string;
    circolo: string;
    location: string;
    id: string;
    teams: string[];
}

export interface ITeamRanking {
    name: string;
    points: string;
    matches: string;
    won_matches: string;
    drawn_matches: string;
    lost_matches: string;
    goals_scored: string;
    goals_conceded: string;
    fair_play: string;
}

export interface IPlayerRanking {
    firstName: string;
    lastName: string;
    team: string;
    goal: string;
}

export interface ILatestMatchResult {
    week: string;
    teamA: string;
    teamB: string;
    date: string;
    time: string;
    location: string;
}

export interface INextMatchResult {
    week: string;
    teamA: string;
    teamB: string;
    date: string;
    time: string;
    location: string;
}