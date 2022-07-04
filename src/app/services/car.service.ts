import { BodyStyle } from './../common/body-style';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

import { CarMake } from '../common/car-make';
import { ImageUrl } from '../common/image-url';
import { GlobalVariables } from '../common/global-variables';
import { CarForSale } from '../common/car-for-sale';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  carMakeId: CarMake;
  carMakeIdMin: number;
  carMakeIdMax: number;

  carBodyStyle: BodyStyle;
  carBodyStyleMin: number;
  carBodyStyleMax: number;


  carPriceMin: number;
  carPriceMax: number;

  carYearOfProductionFrom: number;
  carYearOfProductionTill: number;
  carSeats: number;
  pageNumber: number = 1;
  pageSize: number = 5;

  searchCriteria: boolean = false;

  private carmakesUrl = `${GlobalVariables.baseUrlConst}/carsmakes`;
  private pageableUrl = `${this.carmakesUrl}?pageNumber=${this.pageNumber - 1}&pageSize=${this.pageSize}`;

  constructor(private httpClient: HttpClient) { }

  getUrls(thisCarId: number): Observable<ImageUrl[]> {
    const imageUrlPath = `${GlobalVariables.baseUrlConst}/imageUrls/search/findByCarId?id=${thisCarId}`;
    return this.httpClient.get<GetResponseImageUrls>(imageUrlPath).pipe(
      map(response => response._embedded.imageUrls));
  }

  getCar(theCarId: number): Observable<CarMake> {
    //need to build URL based on product Id
    const carUrl = `${GlobalVariables.baseUrlConst}/carsmakes/${theCarId}`;
    return this.httpClient.get<CarMake>(carUrl);
  }


  getCarsByFilterCriteria(): Observable<CarMakeResponseObject> {

    if (this.carMakeId?.id == undefined) {

      this.carMakeIdMin = 0;
      this.carMakeIdMax = 1000;
    } else {
      this.carMakeIdMin = Number(this.carMakeId?.id);
      this.carMakeIdMax = Number(this.carMakeId?.id);
    }


    if (this.carBodyStyle?.id == undefined) {
      this.carBodyStyleMin = 0;
      this.carBodyStyleMax = 1000;
    } else {
      this.carBodyStyleMin = Number(this.carBodyStyle?.id);
      this.carBodyStyleMax = Number(this.carBodyStyle?.id);
    }

    if (this.carPriceMin?.toString() == "" || this.carPriceMin?.toString() == undefined) {
      this.carPriceMin = 0;
    };

    if (this.carPriceMax?.toString() == "" || this.carPriceMax?.toString() == undefined) {
      this.carPriceMax = 1000000;
    };

    if (this.carYearOfProductionFrom?.toString() == "" || this.carYearOfProductionFrom == undefined) {
      this.carYearOfProductionFrom = 1880;

    };
    if (this.carYearOfProductionTill?.toString() == "" || this.carYearOfProductionTill == undefined) {
      this.carYearOfProductionTill = new Date().getFullYear();
    };

    const searchUrl = `${GlobalVariables.baseUrlConst}/carsmakes/findByPriceAndMakeId?pageNumber=${this.pageNumber - 1}&pageSize=${this.pageSize}&carMakeIdMin=${this.carMakeIdMin}&carMakeIdMax=${this.carMakeIdMax}&carBodyStyleMin=${this.carBodyStyleMin}&carBodyStyleMax=${this.carBodyStyleMax}&carPriceMin=${this.carPriceMin}&carPriceMax=${this.carPriceMax}&carYearOfProductionFrom=${this.carYearOfProductionFrom}&carYearOfProductionTill=${this.carYearOfProductionTill}`;
    
    return this.httpClient.get<CarMakeResponseObject>(searchUrl);

  }




  getCarMakes(): Observable<CarMakeResponseObject> {
    return this.httpClient.get<CarMakeResponseObject>(this.pageableUrl);
  }

  placeOrder2(carPost: CarForSale): Observable<any>{
    let carForSale = `${GlobalVariables.baseUrlConst}/carforsale`;   
     let carPost2 = new CarForSale();
    carPost2.makeName ="Toyota new";
    carPost2.price =10;  
    carPost2.sellerDescription ="the seller description";
    carPost2.seats = 10;
    carPost2.yearOfProduction = new Date();
    carPost2.bodyStyle =  "sedan";
     return this.httpClient.post<CarForSale>(carForSale, carPost2);
    

    }

    
  placeOrder3(carMake: CarMake): Observable<any>{
    let carForSale = `${GlobalVariables.baseUrlConst}/carforsale`;   


     return this.httpClient.post<CarMake>(carForSale, carMake);
    

    }

}



interface GetResponseImageUrls {
  _embedded: {
    imageUrls: ImageUrl[];
  }
}

interface CarMakeResponseObject {
  content: CarMake[],
  pageable: {
    pageNumber: number;
    pageSize: number;
  }

 
}