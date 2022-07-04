import { BodyStyle } from './../../common/body-style';
import { SearchCriteriaService } from './../../services/search-criteria.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, SelectControlValueAccessor } from '@angular/forms';
import { Make } from 'src/app/common/make';
import { CarService } from 'src/app/services/car.service';
import { Seats } from 'src/app/common/seats';
import { CarMake } from 'src/app/common/car-make';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {

 searchCriteriaForm: FormGroup;
 makes : Make[] = [];
 carPriceOptions: number[] =  [0, 500, 1000,1200,1500, 2000,2500,3000,
                               4000,5000,6000,7000,8000,9000,10000, 12500,
                              15000,17500,20000,22500,25000,27500,30000,
                              35000,40000,45000,50000,75000,100000];
  seats: Seats[] = createSeats();
  tempSeatsMin: string = "1";
  tempSeatsMax: number = 9;
  bodyStyles: BodyStyle[] = [];
  yearsOfProduction: number[] = fillIntheYears();

  constructor(private formBuilder: FormBuilder, 
              private carService: CarService,
              private searchCriteriaService: SearchCriteriaService,
              private router: Router
             ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.searchCriteriaForm = this.formBuilder.group({
          carMakeGroupName: this.formBuilder.group({
            carMakeName: [''],
            carBodyStyle: [''],
            carPriceMin: [''],
            carSeats: [''],
            carPriceMax: [''],
            carSeatsMin: [''],
            carSeatsMax: [''],
            carYearOfProductionFrom: [''],
            carYearOfProductionTill: ['']
          }
          )
        });
        this.searchCriteriaService.getMakes().subscribe(
          data=>{
            this.makes = data;
          });
        this.searchCriteriaService.getBodyStyles().subscribe(
            data=>{
              this.bodyStyles = data;
            });
          
    };

    onSumbit(){

     
    
      const carMakeId: CarMake = this.searchCriteriaForm.get('carMakeGroupName.carMakeName').value;
      const carBodyStyle: BodyStyle = this.searchCriteriaForm.get('carMakeGroupName.carBodyStyle').value;
      const carPriceMin = this.searchCriteriaForm.get('carMakeGroupName.carPriceMin').value;
      const carPriceMax = this.searchCriteriaForm.get('carMakeGroupName.carPriceMax').value;
      const carYearOfProductionFrom = this.searchCriteriaForm.get('carMakeGroupName.carYearOfProductionFrom').value;
      const carYearOfProductionTill = this.searchCriteriaForm.get('carMakeGroupName.carYearOfProductionTill').value;
      const carSeats = this.searchCriteriaForm.get('carMakeGroupName.carSeats').value;


     
     
        this.carService.carMakeId= carMakeId;
        this.carService.carBodyStyle = carBodyStyle;
        this.carService.carPriceMin = carPriceMin;
        this.carService.carPriceMax = carPriceMax;
        this.carService.carYearOfProductionFrom = carYearOfProductionFrom;
        this.carService.carYearOfProductionTill = carYearOfProductionTill;
        this.carService.carSeats = carSeats;

        this.carService.searchCriteria = true;
        this.carService.getCarsByFilterCriteria();
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl(`/searchcriteria`,{ skipLocationChange: true }).then(() => {
    
        });;
      

    }
  
  
    restoreToDefaults(){
      const carBodyStyle = this.searchCriteriaForm.get('carMakeGroupName.carBodyStyle').setValue("");
      this.searchCriteriaForm.get('carMakeGroupName.carMakeName').setValue("")
      this.searchCriteriaForm.get('carMakeGroupName.carPriceMin').setValue("");
      this.searchCriteriaForm.get('carMakeGroupName.carPriceMax').setValue("");
      this.searchCriteriaForm.get('carMakeGroupName.carYearOfProductionFrom').setValue("");
      this.searchCriteriaForm.get('carMakeGroupName.carYearOfProductionTill').setValue("");
      this.searchCriteriaForm.get('carMakeGroupName.carSeats').setValue("");

      window. location. reload();
    }

  
    callPageableCars(){
      this.router.navigateByUrl(`/pageablecars`,{ skipLocationChange: true }).then(() => {
    
      });;
    }
   
  }
function fillIntheYears(): number[] {
  const currentYear: number = new Date(). getFullYear()
 const yearsList: number[] = [];
  for(let i= currentYear; i>=1990;i--){
    yearsList.push(i);
  };
  for(let i= 1985; i>=1960;i-=5){
    yearsList.push(i);
  };
  for(let i= 1950; i>=1900;i-=10){
    yearsList.push(i);
  };
  return yearsList;
  
}

function ispositive(element, index, array){
  return element ==-1;
}



function createSeats(): Seats[] {
  const seats: Seats[] = [];
  for(let i: number= 1; i<8;i++){
    var seat: Seats = new Seats(i, i.toString());
    seats.push(seat);
  };
  seats.push(new Seats(9, "more than 8 seats"));
  
  return seats;
}



