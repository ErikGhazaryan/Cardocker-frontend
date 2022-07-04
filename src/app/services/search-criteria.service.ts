import { MakeService } from './make.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Make } from '../common/make';
import { BodyStyle } from '../common/body-style';
import { GlobalVariables } from '../common/global-variables';

@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {
  
  searchBodyStylesUrl = `${GlobalVariables.baseUrlConst}/bodystyles`
  
  getBodyStyles() {
    
    return this.httpClient.get<getResponseBodyStyle>(this.searchBodyStylesUrl).pipe(
      map(response=>response._embedded.bodystyles));   
  }
  
  getMakes(): Observable<Make[]> {

    const searchmakeUrl = `${GlobalVariables.baseUrlConst}/makes`;
    return this.httpClient.get<getResponseMake>(searchmakeUrl).pipe(
      map(response=>response._embedded.makes));
  }

  constructor(private httpClient: HttpClient) {

   }
}

interface getResponseMake {
  _embedded: {
    makes: Make []
  }
}

interface getResponseBodyStyle {
  _embedded: {
    bodystyles: BodyStyle []
  }
}


