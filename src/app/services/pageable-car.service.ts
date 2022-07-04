import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GlobalVariables } from '../common/global-variables';
import { PageableCar } from '../common/pageable-car';

@Injectable({
  providedIn: 'root'
})
export class PageableCarService {

  private pageableCarsUrl = `${GlobalVariables.baseUrlConst}/cars?page=1&size=5`;

  constructor(private httpClient: HttpClient) {
  }

  callPageableCars(): Observable<PageableCar[]> {
    return this.httpClient.get<PageableCars>(this.pageableCarsUrl).pipe(
      map(response => response._embedded.cars)
    )
  }

}

interface PageableCars {
  _embedded: {
    cars: PageableCar[];
  }
}