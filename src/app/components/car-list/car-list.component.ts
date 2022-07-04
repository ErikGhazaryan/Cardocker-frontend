import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { CarMake } from 'src/app/common/car-make';
import { ThisReceiver } from '@angular/compiler';
import { CarForSale } from 'src/app/common/car-for-sale';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  carPost: CarForSale;
  carMake: CarMake;
  carMakes: CarMake[] = [];
 
  carMakePrice: number = 0;
  carMakeMakeId: number = 0;

  pageNumber: number;
  totalElements: number;
  totalPages: number;
  pageSize: number; 
  pageNumberTrial: number =5;

  constructor( private carService: CarService, private route: ActivatedRoute) {

   }

  ngOnInit(): void {
   ("car_list component initialized");
    
    if(this.carService.searchCriteria===false){
      this.carService.getCarMakes().subscribe(
        
        this.processResult())
    } else {
      this.carService.getCarsByFilterCriteria().subscribe(
      this.processResult())
    }

  
    
  }

  processResult() {
    return (data:any)=>{
        this.carMakes = data.content;
        this.pageNumber = data.pageable.pageNumber+1;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
        this.totalPages  = data.totalPages;
    }  
  }

  listProducts(){
   
    this.carService.pageNumber = this.pageNumber;
    
    this.carService.getCarsByFilterCriteria().subscribe(
    this.processResult())
    
  }

  postCar(){
     this.carPost = new CarForSale();
     this.carPost.makeName = "make";
     this.carPost.price = 10;
 
     
     let carpost: CarForSale = new CarForSale();
     
     this.carService.placeOrder2(carpost).subscribe({
       next: response => {
         alert(`Your order has been received.\nOrder tracking number: `);
 
         // reset cart
     
       },
       error: err => {
         alert(`There was an error: ${err.message}`);
       }
     }
   );
   }

   postCar2(){

    this.carMake = new CarMake(); 
    
     this.carMake.makeName = "make";
     this.carMake.price = 10;
 
     
     let carMake: CarMake = new CarMake();
     
     this.carService.placeOrder3(carMake).subscribe({
       next: response => {
         alert(`Your order has been received.\nOrder tracking number: `);
 
         // reset cart
     
       },
       error: err => {
         alert(`There was an error: ${err.message}`);
       }
     }
   );
   }

  
  
  

}
