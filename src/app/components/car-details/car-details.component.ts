import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarMake } from 'src/app/common/car-make';
import { ImageUrl } from 'src/app/common/image-url';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
  providers: [NgbCarouselConfig] 
})
export class CarDetailsComponent implements OnInit {

  showNavigationArrows = true;
  showNavigationIndicators = false;


  carMake : CarMake = new CarMake();
  
  URLs: ImageUrl[] = [];
  

  
  constructor(private carService: CarService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleCarDetails();
    })
  }
  handleCarDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theCarId: number = +Number(this.route.snapshot.paramMap.get('id'));

    this.carService.getCar(theCarId).subscribe(
      data=>{
        this.carMake = data;
      }
    )

    this.carService.getUrls(theCarId).subscribe(
      data=>{
        this.URLs = data;

      }
    )

  }

}
