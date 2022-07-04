import { BodyStyle } from './../../common/body-style';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarMake } from 'src/app/common/car-make';
import { Make } from 'src/app/common/make';
import { SearchCriteriaService } from 'src/app/services/search-criteria.service';
import { CarForSaleService } from 'src/app/services/car-for-sale.service';
import { CarService } from 'src/app/services/car.service';
import { compileDeclareInjectableFromMetadata } from '@angular/compiler';


@Component({
  selector: 'app-car-for-sale',
  templateUrl: './car-for-sale.component.html',
  styleUrls: ['./car-for-sale.component.css']
})
export class CarForSaleComponent implements OnInit {

  carForSaleForm: FormGroup;
  model;
  makes: Make[] = [];
  bodyStyles: BodyStyle[] = [];

  constructor(private formBuilder: FormBuilder,
    private searchCriteriaService: SearchCriteriaService,
    private carService: CarService,
    private router: Router) { }

  ngOnInit(): void {

    this.searchCriteriaService.getMakes().subscribe(
      data => {
        this.makes = data;
      });
    this.searchCriteriaService.getBodyStyles().subscribe(
      data => {
        this.bodyStyles = data;
      });
    this.carForSaleForm = this.formBuilder.group({
      makeName: new FormControl('', [Validators.required]),
      bodyStyle: new FormControl('', [Validators.required]),
      modelName: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      sellerDescription: new FormControl(),
      seats: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      yearOfProduction: new FormControl('', [Validators.required])
    }

    );
  }
  get makeName() { return this.carForSaleForm.get('makeName'); };
  get bodyStyle() { return this.carForSaleForm.get('bodyStyle'); };
  get modelName() { return this.carForSaleForm.get('modelName'); };
  get price() { return this.carForSaleForm.get('price'); };
  get sellerDescription() { return this.carForSaleForm.get('sellerDescription'); };
  get yearOfProduction() { return this.carForSaleForm.get('yearOfProduction'); };
  get seats() { return this.carForSaleForm.get('seats'); };

  onSubmit() {

    if (this.carForSaleForm.invalid) {
      this.carForSaleForm.markAllAsTouched();
      return;
    }

    let carMake: CarMake = new CarMake();
    carMake.modelName = this.carForSaleForm.controls['modelName'].value;
    carMake.makeName = this.carForSaleForm.controls['makeName'].value.makeName;
    carMake.bodyStyle = this.carForSaleForm.controls['bodyStyle'].value.bodyStyleName;
    carMake.price = this.carForSaleForm.controls['price'].value;
    carMake.seats = this.carForSaleForm.controls['seats'].value;
    carMake.sellerDescription = this.carForSaleForm.controls['sellerDescription'].value
    carMake.yearOfProduction = new Date(this.carForSaleForm.controls['yearOfProduction'].value.year,
      this.carForSaleForm.controls['yearOfProduction'].value.month,
      this.carForSaleForm.controls['yearOfProduction'].value.day)
    carMake.imageUrl = "assets/images/defaultcar.jpg";
   
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


