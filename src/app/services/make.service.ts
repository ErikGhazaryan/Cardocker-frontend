import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GlobalVariables } from '../common/global-variables';
import { Make } from '../common/make';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  private makeUrl = `${GlobalVariables.baseUrlConst}/makes`;

  constructor(private httpClient: HttpClient) { }

  getMakeList(): Observable<Make[]>{
    return this.httpClient.get<GetResponse>(this.makeUrl).pipe(
      map((response: { _embedded: { makes: any; }; })=>response._embedded.makes)
    );
  }
}

interface GetResponse{
  _embedded: {
    makes: Make[];
  }
}