import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IChef } from "../assets/models";

@Injectable({ providedIn: 'root' })
export class HttpService {

    constructor(private http: HttpClient) { }

    // fetchTeams(league: string): Observable<ITeam[]> {
    //     return this.http.get(API_URLS + league).pipe(map((responseData: { [key: string]: object }) => {
    //         const fetchData = [];

    //         for (const key in responseData) {
    //             fetchData.push(responseData[key]);
    //         }

    //         const teams: ITeam[] = fetchData[0].map(team => { return { name: team.strTeam, logo: team.strTeamBadge } });

    //         return teams;
    //     }))
    // }

    sendGetRequest(url) : Observable<IChef[]>{
        return this.http.get(url).pipe(map((responseData: IChef[]) => {
            return responseData;
        }))
    }
}
