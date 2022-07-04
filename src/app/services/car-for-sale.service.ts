import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarMake } from '../common/car-make';
import { GlobalVariables } from '../common/global-variables';

@Injectable({
  providedIn: 'root'
})
export class CarForSaleService {
   carForSaleUrl = `${GlobalVariables.baseUrlConst}/carforsale`;
  
  constructor(private httpClient: HttpClient) { }

  addCarForSale(carMake: CarMake): Observable<any>{
    let myString: string = "mystring";
       return this.httpClient.post<CarMake>(this.carForSaleUrl, carMake);
       ;
  }

  getFunction(): String {
    this.httpClient.get<any>(this.carForSaleUrl);
    return "asa";
  }
}
